import { Request, Response } from "express";
import HistoricalTagSchema from "../Model/Schemas/HistoricalTag";
import Router from "express";
import { addHistoricalTag } from "../Model/Queries/historicalTags_queries";
import { body , validationResult, matchedData } from "express-validator";

const router = Router();

router.post("/add/HistoricalTag",
    [
        body("name").isString(),
        body("type").isString()
    ],
     async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const HistoricalTag = matchedData(req);
    try {
        const newHistoricalTag = await addHistoricalTag(HistoricalTag);
        if(newHistoricalTag)
        res.status(201).send(newHistoricalTag);
        else
        res.status(409).send("Tag Already Exists");
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;