import { Request, Response, Router } from "express";
import {
  changePassword,
  markNotificationAsRead,
  markAllNotificationAsRead,
  getcurrentuser,
  auth,
} from "../Model/Queries/user_queries";
import jwt from "jsonwebtoken";
import { updatePassword } from "../Model/Queries/user_queries";

const router = Router();

router.get("/me/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await getcurrentuser(username);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/auth", async (req, res) => {
  try {
    const token = req.cookies["access_token"];
    const decoded = jwt.verify(token, "supersecret") as { id: string };
    const userId = decoded.id;
    const module2 = req.body.module;
    const name = await auth(userId, module2);
    res.status(200).send(name);
  } catch (error) {
    if ((error as any).message === "unauthorized") {
      res.status(403).send("unauthorized access to this page");
    } else {
      res.status(500).send("error occured");
    }
  }
});
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
    const user = await markNotificationAsRead(
      req.body.username,
      req.body.userType,
      req.body.notificationId
    );
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

router.patch(
  "/markAllNotificationAsRead",
  async (req: Request, res: Response) => {
    try {
      const user = await markAllNotificationAsRead(
        req.body.username,
        req.body.userType
      );
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
  }
);

router.patch("/updatePassword", async (req: Request, res: Response) => {
  try {
    const user = await updatePassword(req.body.email, req.body.newpassword);
    if (!user) res.status(404).send("user not found");
    else {
      res.status(200).json(user);
    }
  } catch (err: any) {
    if (err.message === "Email not found in any table") {
      res.status(404).send("Email is incorrect");
    } else if (err.message === "Incorrect password") {
      res.status(401).send("Email is incorrect");
    } else {
      res.status(500).json(err);
    }
  }
});

export default router;
