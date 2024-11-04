import { Request, Response, Router } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  toggleProductArchive,
  addFeedback,
} from "../Model/Queries/product_queries";
import { addPurchase } from "../Model/Queries/purchase_queries";
import {
  productAddValidator,
  productUpdateValidator,
} from "../utils/express-validator/productValidator";
import { IFeedback } from "../Model/Schemas/Product";
import Tourist from "../Model/Schemas/Tourist";

const router = Router();

router.post(
  "/add",
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
      res.status(500).send(error);
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch(
  "/update/:id",
  productUpdateValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newProduct = matchedData(req);
    try {
      const productId = req.params.id;
      const newnewProduct = await updateProduct(productId, newProduct);
      res.status(200).send(newnewProduct);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.patch("/archive/:id", async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const newProduct = await toggleProductArchive(productId);
    if (newProduct) {
      res.status(200).send(newProduct);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/feedback/:productId", async (req: Request, res: Response) => {
  const { rating, review, touristUsername } = req.body;
  console.log(touristUsername);
  try {
    const tourist= await Tourist.findOne({ username: touristUsername }); 
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const touristId = tourist._id;
  const productId = req.params.productId;
  const feedback = {
    rating,
    review,
    touristId,
  } as IFeedback;
    const product = await addFeedback(productId, feedback);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
