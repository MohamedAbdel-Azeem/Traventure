import Router from "express";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { addProduct } from "../Model/Queries/product_queries";
import { productAddValidator } from "../utils/express-validator/productValidator";

const router = Router();

router.post(
  "/add/product",
  productAddValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const productData = matchedData(req);
    try {
      const product = await addProduct(productData);
      res.status(200).send("Product Added Successfully !!");
    } catch (error) {
      res.status(500).send("Error Adding Product");
    }
  }
);

export default router;
