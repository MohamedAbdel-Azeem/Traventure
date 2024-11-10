import { Router } from "express";
import {rateItinerary,rateTourGuide,isUserBookedInItineraryOFtourGuide,rateActivity, IFeedbackk,getAllTourGuideReviews,getAllActivityReviews,getAllItineraryReviews} from "../Model/Queries/feedback_queries";
import Tourist from "../Model/Schemas/Tourist";
import { IFeedback } from "../Model/Schemas/Product";
const router = Router();

router.post("/rateItinerary/:itineraryId", async (req, res) => { 
    const { itineraryId } = req.params;
    const { rating, review, touristUsername} = req.body;
    
        try{
            const tourist= await Tourist.findOne({ username: touristUsername }); 
            if (!tourist) {
              throw new Error("Tourist not found");
            }
        
        const touristId = tourist._id.toString();
        const feedback = {
            touristId,
            review,
            rating  ,
            touristUsername
        } as IFeedbackk;
    

        await rateItinerary(itineraryId, feedback);
        res.status(201).send("Feedback added successfully");
    } catch (error) {
        res.status(500).send("error adding feedback: "+error);
    }
});
router.post("/rateTourGuide/:tourGuideUserId", async (req, res) => {
    const { tourGuideUserId } = req.params;
    const { rating, review, touristUsername} = req.body;
    
        try{
            const tourist= await Tourist.findOne({ username: touristUsername }); 
            if (!tourist) {
              throw new Error("Tourist not found");
            }
        
        const touristId = tourist._id.toString();
        const feedback = {
            touristId,
            review,
            rating ,
            touristUsername 
        } as IFeedbackk;
    


        await rateTourGuide(tourGuideUserId, feedback);
        res.status(201).send("Feedback added successfully");
    } catch (error) {
        console.log("aaaaaaaaaaaa",error);
        res.status(500).send("error adding feedback: "+error);
        
    }
});

router.post("/rateActivity/:ActivityId", async (req, res) => {
    const { ActivityId } = req.params;
    const { rating, review, touristUsername} = req.body;
    
    try{
        const tourist= await Tourist.findOne({ username: touristUsername }); 
        if (!tourist) {
          throw new Error("Tourist not found");
        }
    
    const touristId = tourist._id.toString();
    const feedback = {
        touristId,
        review,
        rating ,
        touristUsername 
    } as IFeedbackk;


        await rateActivity(ActivityId, feedback);
        res.status(201).send("Feedback added successfully");
    } catch (error) {
        console.log("khaldoon with me : error "+error);
        res.status(500).send("error adding feedback: "+error);
    }
});

router.get("/canfeedback", async (req, res) => {
    // const { touristUsername,tourGuideUserId } = req.body;
    const { touristUsername, tourGuideUserId } = req.query;
    try{
        const tourist= await Tourist.findOne({ username: touristUsername }); 
        if (!tourist) {
          throw new Error("Tourist not found");
        }
    
        const touristId = tourist._id.toString();
        if (typeof tourGuideUserId !== 'string') {
            throw new Error("Invalid tourGuideUserId");
        }
        const canProvideFeedback = await isUserBookedInItineraryOFtourGuide(touristId, tourGuideUserId);
        res.status(201).json({ canProvideFeedback });
    } catch (error) {
        console.log("aaaaaaaaaaaaaaaaaaaa",error);
        res.status(500).send(" getting feedback: "+error);
    }
});

router.get("/showTourGuideReviews/:tourGuideUserId", async (req, res) => {
    const { tourGuideUserId } = req.params;
    try{
        
        
        const reviews = await getAllTourGuideReviews(tourGuideUserId);
        res.status(201).json({ reviews });

    } catch (error) {
        res.status(500).send(" getting feedback: "+error);
    }


});

router.get("/showActivityReviews/:ActivityId", async (req, res) => {
    const { ActivityId } = req.params;
    try{
        
        
        const reviews = await getAllActivityReviews(ActivityId);
        res.status(201).json({ reviews });

    } catch (error) {
        res.status(500).send(" getting feedback: "+error);
    }
});

router.get("/showItineraryReviews/:itineraryId", async (req, res) => {
    const { itineraryId } = req.params;
    try{
        
        
        const reviews = await getAllItineraryReviews(itineraryId);
        res.status(201).json({ reviews });

    } catch (error) {
        res.status(500).send(" getting feedback: "+error);
    }
});




export default router;