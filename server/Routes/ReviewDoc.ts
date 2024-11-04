import { Request, Response, Router } from "express";

import { getAllPendingUsers, acceptUser } from "../Model/Queries/admin_queries";

const router = Router();

router.get("/pendingusers", async (req: Request, res: Response) => {
  try {
    const users = await getAllPendingUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/acceptuser", async (req: Request, res: Response) => {
  try {
    const { username, type, isaccepted } = req.body;
    const user = await acceptUser(username, type, isaccepted);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;