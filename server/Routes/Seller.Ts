import Router from "express";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { addProduct } from "../Model/Queries/product_queries";
import { productAddValidator } from "../utils/express-validator/productValidator";
import { createUser,handleRegisterErrors } from "../Model/Queries/guest_queries";
import { guestAddValidator } from "../utils/express-validator/GuestValidator";

const router = Router();

router.post("/add", guestAddValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newUser = matchedData(req);
  try {
    await createUser(newUser, "seller");
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    const err = error as any;
    handleRegisterErrors(err, res);
  }
});

export default router;
