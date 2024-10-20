import { Request, Response, Router } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  addItinerary,
  deleteItinerary,
  getItinerary,
  updateItinerary,
  getAllItinerary,
} from "..//Model//Queries//itinerary_queries";
import {
  itineraryAddValidator,
  itineraryUpdateValidator,
} from "..//utils//express-validator//itineraryValidator";
import TourGuide from "../Model/Schemas/TourGuide";
import ItineraryModel from "../Model/Schemas/Itinerary"

const router = Router();

router.post(
  "/add",
  itineraryAddValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
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
router.get("/:itinerary_id", async (req: Request, res: Response) => {
  try {
    const itinerary = await ItineraryModel.findById(req.params.itinerary_id);
    res.status(200).send(itinerary);
  } catch (error) {
    res.status(500).send(error);
  }
}
);

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const products = await getItinerary(req.params.username);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await getAllItinerary();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch(
  "/update/:id",
  itineraryUpdateValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      console.log(req.body.plan.activities);
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

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const place = await deleteItinerary(req.params.id);
    res.status(200).send("Itinerary deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
export default router;
