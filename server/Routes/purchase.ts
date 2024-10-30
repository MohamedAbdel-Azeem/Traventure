import e, { Router } from "express";
import {addPurchase} from "../Model/Queries/purchase_queries";
const router = Router();

router.post("/add", async (req, res) => { 
    try {
        await addPurchase(req.body);
        res.status(201).send("Purchase added successfully");
    } catch (error) {
        res.status(500).send("error creating purchase");
    }
});

export default router;