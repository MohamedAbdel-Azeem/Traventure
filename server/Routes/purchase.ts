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
    const { externalSeller, sellerId } = req.query;

    if ((!externalSeller && !sellerId) || (externalSeller && sellerId)) {
      return res.status(404).send("Invalid query parameters");
    }

  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
