import { Request, Response, Router } from "express";
import  {deleteRequestDelete} from "../Model/Queries/request_delete_queries";
import requestdeleteMiddleware from "../Middleware/DeleteRequestMIddleware";

const router = Router();



router.delete("/deleterequestdelete", async (req: Request, res: Response) => {
    try {
        const {user_id, username, type, wallet} = req.body;
        
        const isAccepted = await requestdeleteMiddleware(user_id, username, wallet, type);
        const requestDelete = await deleteRequestDelete(username, type, isAccepted);
        res.status(200).send(requestDelete);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;