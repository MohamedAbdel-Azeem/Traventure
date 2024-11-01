import { Request, Response, Router } from "express";
import { changePassword } from "../Model/Queries/user_queries";

const router = Router();

router.patch("/", async (req: Request, res: Response) => {
  try {
    const user = await changePassword(req.body.username, req.body.oldPassword, req.body.newPassword);
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