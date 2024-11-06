import { Request, Response, Router } from "express";
import { createRequestDelete, getRequestDelete, deleteRequestDelete } from "../Model/Queries/request_delete_queries";

const router = Router();

router.post("/createrequestdelete", async (req: Request, res: Response) => {
    try {
        const { user_id, name, type, wallet } = req.body;

        const requestDelete = await createRequestDelete(user_id, name, type, wallet);
        return res.status(200).send(requestDelete);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/getrequestdelete", async (req: Request, res: Response) => {
    try {
        const requestDelete = await getRequestDelete();
        res.status(200).send(requestDelete);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/deleterequestdelete", async (req: Request, res: Response) => {
    try {
        const { username, isAccepted } = req.body;
        const requestDelete = await deleteRequestDelete(username, isAccepted);
        res.status(200).send(requestDelete);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;