import { Request, Response, Router } from "express";
import {
  addPurchase,
  getTouristPurchases,
  getSellerSales,
} from "../Model/Queries/purchase_queries";
import {
  getProduct,
  decrementProductQuantity,
} from "../Model/Queries/product_queries";

const router = Router();

router.post("/buy", async (req: Request, res: Response) => {
  try {
    const { touristId, cart } = req.body;

    for (const singleProduct of cart) {
      const product = await getProduct(singleProduct.productId);
      if (!product) {
        return res.status(400).send("Product not found");
      }
      if (product.quantity - singleProduct.quantity < 0) {
        return res
          .status(400)
          .send("Product out of stock or not enough quantity");
      }
    }

    for (const singleProduct of cart) {
      await decrementProductQuantity(
        singleProduct.productId,
        singleProduct.quantity
      );
    }

    const purchase = await addPurchase({ touristId, cart });
    return res.status(200).send(purchase);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/tourist/:touristId", async (req: Request, res: Response) => {
  try {
    const touristId = req.params.touristId;
    const purchases = await getTouristPurchases(touristId);
    res.status(200).send(purchases);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/seller", async (req: Request, res: Response) => {
  try {
    // externalSeller and sellerId are mutually exclusive
    // compactView is optional & makes the response more compact removing timestamps and getting all the similar products are in a single object with total quantity
    const { externalSeller, sellerId, compactView } = req.query;
    const compactViewBoolean = compactView === "true";

    if ((!externalSeller && !sellerId) || (externalSeller && sellerId)) {
      return res.status(404).send("Invalid query parameters");
    }

    if (sellerId) {
      console.log(sellerId);
      const sales = await getSellerSales(
        sellerId as string,
        compactViewBoolean
      );
      return res.status(200).send(sales);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
