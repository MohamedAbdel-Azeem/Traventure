import { Router } from "express";
import { loginUser } from "../Model/Queries/user_queries";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const user = await loginUser(req.body.username, req.body.password);
    if (!user) res.status(404).send("user not found");
    else {
      res.status(200).json(user);
    }
  } catch (err: any) {
    if (err.message === "Username not found in any table") {
      res.status(404).send("Username or Password is incorrect");
    } else if (err.message === "Incorrect password") {
      res.status(401).send("Username or Password is incorrect");
    } else {
      res.status(500).json(err);
    }
  }
});

export default router;
