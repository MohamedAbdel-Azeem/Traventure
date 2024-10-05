import { Request, Response, Router } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  getPlaces,
  getPlace,
  addPlace,
  updatePlace,
  deletePlace,
} from "../Model/Queries/places_queries";
import {
  placeAddValidator,
  placeUpdateValidator,
} from "../utils/express-validator/placeValidator";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const places = await getPlaces();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const place = await getPlace(req.params.id);
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/add", placeAddValidator, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const place = matchedData(req);
    const newPlace = await addPlace(place);
    res.status(201).send("Place added successfully");
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch(
  "/update/:id",
  placeUpdateValidator,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const place = matchedData(req);
      const updatedPlace = await updatePlace(req.params.id, place);
      res.status(200).send(updatedPlace);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const place = await deletePlace(req.params.id);
    res.status(200).send("Place deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
