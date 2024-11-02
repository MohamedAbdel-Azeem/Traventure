import { Router } from "express";
import {rateItinerary,rateTourGuide} from "../Model/Queries/feedback_queries";
const router = Router();

router.post("/rateItinerary/:itineraryId", async (req, res) => { 
    const { itineraryId } = req.params;
    const feedback = req.body;
    try {
        await rateItinerary(itineraryId, feedback);
        res.status(201).send("Feedback added successfully");
    } catch (error) {
        res.status(500).send("error adding feedback");
    }
});
router.post("/rateTourGuide/:tourGuideUsername", async (req, res) => {
    const { tourGuideUsername } = req.params;
    const feedback = req.body;
    try {
        await rateTourGuide(tourGuideUsername, feedback);
        res.status(201).send("Feedback added successfully");
    } catch (error) {
        res.status(500).send("error updating complaint");
    }
});


export default router;