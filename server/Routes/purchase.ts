import { Request, Response, Router } from "express";
import { addPurchase } from "../Model/Queries/purchase_queries";
import {
  getProduct,
  decrementProductQuantity,
} from "../Model/Queries/product_queries";

const router = Router();

router.post("/buy", async (req: Request, res: Response) => {
  try {
    const { productId, quantity, touristId } = req.body;
    const now = new Date();
    const purchaseData = {
      productId,
      quantity,
      touristId,
      timeStamp: now,
    };
    const product = await getProduct(productId);
    if (product && product?.quantity - quantity < 0) {
      res.status(400).send("Quantity not available");
    }
    const purchase = await addPurchase(purchaseData);
    await decrementProductQuantity(productId, quantity);
    res.status(200).send(purchase);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:touristId", async (req: Request, res: Response) => {
    
});

export default router;
