import Router from "express";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { addProduct } from "../Model/Queries/product_queries";
import { productAddValidator } from "../utils/express-validator/productValidator";
import {
  createUser,
  handleRegisterErrors,
} from "../Model/Queries/guest_queries";
import { guestAddValidator } from "../utils/express-validator/GuestValidator";
import ISeller from "../Interfaces/Users/ISeller";
import {
  getprofileInfo,
  updateProfileInfo,
} from "../Model/Queries/user_queries";
import { sellerPatchValidator } from "../utils/express-validator/sellerValidator";

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

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = (await getprofileInfo(username, "seller")) as ISeller;
    if (!user) res.status(404).send("user not found");
    else {
      if (user.isAccepted) {
        return res.status(200).json(user);
      }
      res.status(403).json(user);
    }
  } catch (err) {
    res.status(500).send("error getting user profile");
  }
});

router.patch(
  "/update/:username",
  sellerPatchValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const username = req.params.username;
      const updatedInfo = matchedData(req);
      const user = await updateProfileInfo(username, "seller", updatedInfo);
      if (!user) return res.status(404).send("user not found");
      const updateduser = await updateProfileInfo(
        username,
        "seller",
        updatedInfo
      );
      res.status(200).json(updateduser);
    } catch (err) {
      res.status(500).send("error updating user profile");
    }
  }
);

export default router;
