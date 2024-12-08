import { Request, Response, Router } from "express";
import { changePassword,markNotificationAsRead,markAllNotificationAsRead } from "../Model/Queries/user_queries";

const router = Router();

router.patch("/changePassword", async (req: Request, res: Response) => {
  try {
    const user = await changePassword(
      req.body.username,
      req.body.oldPassword,
      req.body.newPassword
    );
    if (!user) res.status(404).send("user not found");
    else {
      res.status(200).json(user);
    }
  } catch (err: any) {
    if (err.message === "Username not found in any table") {
      res.status(404).send("Username or Password is incorrect");
    } else if (err.message === "Incorrect password") {
      res.status(401).send("Username or Password is incorrect");
    } else if (err.message === "New password is same as old password") {
      res.status(403).send("can't change to same old password");
    } else {
      res.status(500).json(err);
    }
  }
});

router.patch("/markNotificationAsRead", async (req: Request, res: Response) => {
  try {
    const user = await markNotificationAsRead(req.body.username,req.body.userType, req.body.notificationId);
    if (!user) res.status(404).send("user not found");
    else {
      res.status(200).json(user);
    }
  } catch (err: any) {
    if (err.message === "Username not found in any table") {
      res.status(404).send("Username not found");
    } else {
      res.status(500).json(err);
    }
  }
});

router.patch("/markAllNotificationAsRead", async (req: Request, res: Response) => {
  try {
    const user = await markAllNotificationAsRead(req.body.username,req.body.userType);
    if (!user) res.status(404).send("user not found");
    else {
      res.status(200).json(user);
    }
  } catch (err: any) {
    if (err.message === "Username not found in any table") {
      res.status(404).send("Username not found");
    } else {
      res.status(500).json(err);
    }
  }
});

export default router;
