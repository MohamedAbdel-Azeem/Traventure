import e, { Request, Response, Router } from "express";
import { validationResult, matchedData, body } from "express-validator";
import {
  getHistoricalTag,
  addHistoricalTag,
} from "../Model/Queries/historicalTags_queries";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const historicalTags = await getHistoricalTag();
    res.status(200).send(historicalTags);
  } catch (err) {
    res.status(500).send("error getting preference tags");
  }
});

router.post(
  "/add",
  [body("name").exists().isString()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const historicalTagData = matchedData(req);
    try {
      const newHistoricalTag = await addHistoricalTag(historicalTagData);
      res.status(201).send(newHistoricalTag);
    } catch (err) {
      res.status(500).send("error creating historical tag");
    }
  }
);

export default router;