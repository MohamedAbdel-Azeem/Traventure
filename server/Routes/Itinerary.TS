import { Request, Response, Router } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  addItinerary,
  deleteItinerary,
  getItinerary,
  updateItinerary,
  getAllItinerary,
  toggleItineraryActivation,
  toggleItineraryInappropriate
} from "../Model/Queries/itinerary_queries";
import {
  itineraryAddValidator,
  itineraryUpdateValidator,
} from "../utils/express-validator/itineraryValidator";
import TourGuide from "../Model/Schemas/TourGuide";
import ItineraryModel from "../Model/Schemas/Itinerary"
import { ItineraryDocument } from "../Interfaces/IItinerary";

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
router.patch("/toggleActivation/:id", async (req: Request, res: Response) => {
  try {
    const itinerary = await toggleItineraryActivation(req.params.id) as ItineraryDocument | null;

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (itinerary.booked_By.length === 0) {
      return res.status(400).json({ message: "No bookings available to toggle activation" });
    }

    res.status(200).json({ message: "Itinerary activation toggled successfully" });
  } catch (error) {
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

router.patch("/toggleInappropriate/:id", async (req: Request, res: Response) => {
  try {
    const itinerary = await toggleItineraryInappropriate(req.params.id) as ItineraryDocument | null;

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json({ message: "Itinerary inappropriate status toggled successfully" });
  } catch (error) {
    res.status(500).json({ error: "An internal server error occurred" });
  }
});
export default router;
