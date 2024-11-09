import {getcurrentuser} from '../Model/Queries/user_queries';

import { Request, Response, Router } from "express";

const router = Router();

router.get("/me/:username", async (req: Request, res: Response) => {
    try {
        const {username} = req.params;
        const user = await getcurrentuser(username);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
