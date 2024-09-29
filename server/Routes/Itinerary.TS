import { Request, Response, Router } from "express";
import { matchedData, validationResult } from "express-validator";
import {
    addItinerary,getItinerary,getUpcomingItinerary,updateItinerary,deleteItinerary
} from "..//Model//Queries//itinerary_queries"
import {
 itineraryAddValidator, itineraryUpdateValidator
} from "..//utils//express-validator//itineraryValidator"

const router = Router();

router.post(
    "/add",
    itineraryAddValidator,
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const itinerary_Data = matchedData(req);
      try {
        const itinerary = await addItinerary(itinerary_Data);
        res.status(200).send("itinerary Added Successfully !!");
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const tour_guide_Id = req.params.id;
      const products = await getItinerary(tour_guide_Id);
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  })

router.get("/upcoming", async (req: Request, res: Response) => {
    try {
      const products = await getUpcomingItinerary();
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  })

  router.patch(
    "/update/:id",
    itineraryUpdateValidator,
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newItinerary = matchedData(req);
      try {
        const itineraryId = req.params.id;
        const updatedItinerary = await updateItinerary(itineraryId, newItinerary);
        res.status(200).send("itinerary Updated Successfully !!");
      } catch (error) {
        res.status(400).send(error);
      }
    }
  );