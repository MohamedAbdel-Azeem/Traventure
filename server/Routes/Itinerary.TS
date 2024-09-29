import { Request, Response, Router } from "express";
import { matchedData, validationResult } from "express-validator";
import {
    addItinerary,getItinerary,getUpcomingItinerary,updateItinerary,deleteItinerary
} from "..//Model//Queries//itinerary_queries"


const router = Router();

router.get("/upcoming", async (req: Request, res: Response) => {
    try {
      const products = await getUpcomingItinerary();
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  })