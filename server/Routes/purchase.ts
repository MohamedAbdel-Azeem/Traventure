import { Request, Response, Router } from "express";
import {
  addPurchase,
  getTouristPurchases,
  getSellerSales,
  getExternalSellerSales,
  // updateLoyaltyPoints,
  getPurchaseTotalAmount,
  DeliverPurchase,
  cancelPurchase,
} from "../Model/Queries/purchase_queries";
import {
  getProduct,
  decrementProductQuantity,
} from "../Model/Queries/product_queries";
import Tourist from "../Model/Schemas/Tourist";
import { IPurchase } from "../Model/Schemas/purchase";

const router = Router();

router.post("/buy", async (req: Request, res: Response) => {
  try {
    const { touristUsername, cart, promoCode } = req.body;
    const tourist = await Tourist.findOne({ username: touristUsername });
    if (!tourist) return res.status(404).send("Tourist not found");
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
    const body = { touristId, cart } as IPurchase;

    if (promoCode) {
      body.promoCode = promoCode;
    }

    const purchase = await addPurchase(body);
    const totalAmount = await getPurchaseTotalAmount(body);

    return res.status(200).send(purchase);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/tourist/:touristUsername", async (req: Request, res: Response) => {
  try {
    const { touristUsername } = req.params;
    const tourist = await Tourist.findOne({ username: touristUsername });
    if (!tourist) return res.status(404).send("Tourist not found");
    const touristId = tourist._id;
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
      const sales = await getSellerSales(
        sellerId as string,
        compactViewBoolean
      );
      return res.status(200).send(sales);
    }

    if (externalSeller) {
      const sales = await getExternalSellerSales(
        externalSeller as string,
        compactViewBoolean
      );
      return res.status(200).send(sales);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/deliver", async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.body;
    const purchase = await DeliverPurchase(purchaseId);
    if (!purchase) return res.status(404).send("Purchase not found");
    return res.status(200).send(purchase);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/cancel", async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.body;
    const purchase = await cancelPurchase(purchaseId);
    if (!purchase)
      return res.status(404).send("Purchase not found or already delivered");
    return res.status(200).send(purchase);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
