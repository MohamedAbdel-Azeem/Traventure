import { Router } from "express";
import {rateItinerary,rateTourGuide,isUserBookedInItineraryOFtourGuide} from "../Model/Queries/feedback_queries";
const router = Router();

router.post("/rateItinerary/:itineraryId", async (req, res) => { 
    const { itineraryId } = req.params;
    const feedback = req.body;
    try {
        await rateItinerary(itineraryId, feedback);
        res.status(201).send("Feedback added successfully");
    } catch (error) {
        res.status(500).send("error adding feedback: "+error);
    }
});
router.post("/rateTourGuide/:tourGuideUserId", async (req, res) => {
    const { tourGuideUserId } = req.params;
    const feedback = req.body;
    try {
        await rateTourGuide(tourGuideUserId, feedback);
        res.status(201).send("Feedback added successfully");
    } catch (error) {
        res.status(500).send("error adding feedback: "+error);
    }
});

router.get("/canfeedback", async (req, res) => {
    const { user_id,tourGuideUser_id } = req.body;
    try {
        const canProvideFeedback = await isUserBookedInItineraryOFtourGuide(user_id,tourGuideUser_id);
        res.status(201).json({ canProvideFeedback });
    } catch (error) {
        res.status(500).send(" getting feedback: "+error);
    }


});



export default router;