import { Request, Response } from "express";
import AdminSchema from "../Model/Schemas/Admin";
import Router from "express";
import { matchedData, validationResult, body } from "express-validator";
import { getAllUsers } from "../Model/Queries/user_queries";
import {
  createUser,
  handleRegisterErrors,
} from "../Model/Queries/guest_queries";
import { governerValidator } from "../utils/express-validator/governerValidator";
import GovernerSchema from "../Model/Schemas/Governer";

import { addGoverner, deleteUser } from "../Model/Queries/admin_queries";
import { hashPassword } from "../utils/functions/bcrypt_functions";

const router = Router();

router.post(
  "/add",
  [
    body("username")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .isString()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = matchedData(req);
    try {
      await createUser(newUser, "admin");
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      const err = error as any;
      handleRegisterErrors(err, res);
    }
  }
);

// return all users including admins except the current user (current Admin)
router.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers(req.body.username);
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("error getting users");
  }
});

router.post(
  "/add/governer",
  governerValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const governerData = matchedData(req);
    governerData.password = await hashPassword(governerData.password);

    try {
      const governer = await addGoverner(governerData, governerData.username);
      if (!governer) res.status(401).send("Usernme already exists");
      else res.status(201).json(governer);
    } catch (error) {
      res.status(500).send("Error adding governer");
    }
  }
);

router.delete(
  "/delete/user/:username/:type",
  async (req: Request, res: Response) => {
    // const type=req.body.type;
    // const us=req.params.username;
    const { username, type } = req.params;

    try {
      const user = await deleteUser(username, type);

      if (user == null) res.status(404).send("User not found");
      else res.status(200).send("User deleted successfully");
    } catch (error) {
      res.status(500).send("Error deleting user");
    }
  }
);

export default router;
