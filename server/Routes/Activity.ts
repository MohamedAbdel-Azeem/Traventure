import { Request, response, Response, Router } from "express";
import {validationResult , matchedData} from "express-validator"
import { addActivityValidator,updateActivityValidator } from "../utils/express-validator/activityValidator";
import { addActivity, getActivities, deleteActivity,updateActivity, getActivitiesid, toggleInappropriate } from "../Model/Queries/activity_queries";
import Advertiser from "../Model/Schemas/Advertiser";
const router = Router();

router.post("/add",addActivityValidator,async (req: Request, res: Response)=>{
    const errors = validationResult(req);
    if (! errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const activityData = matchedData(req);
    try{
        const newActivity = await addActivity(activityData);
        
        res.status(201).send("Activity added successfully");
    }
    catch(err){
        res.status(500).send("error creating activity");
    }
});

router.get("/",async (req: Request, res: Response)=>{
    try{
        const activities = await getActivities();
        res.status(200).send(activities);
    }
    catch(err){
       
        res.status(500).send("error getting activities");
    }
});

// router.get("/:id",async (req: Request, res: Response)=>{
//     const id = req.params.id;
//     try{
//         const activities = await getActivitiesid(id);
//         res.status(200).send(activities);
//     }
//     catch(err){
//         res.status(500).send("error getting activities");
//     }
// });


router.get("/:username", async (req: Request, res: Response) => {
    try {
      const advertiser = await Advertiser.findOne({ username: req.params.username });
      if (!advertiser) {
        return res.status(400).send("Advertiser not found");
      }
      const advertiser_Id  = (advertiser._id as string);
      const products = await getActivitiesid(advertiser_Id );
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  

router.delete("/delete/:id",async (req: Request, res: Response)=>{
    try{
        const id = req.params.id;
        const deletedActivity = await deleteActivity(id);
        res.status(200).send("Activity deleted successfully");
    }
    catch(err){
        res.status(500).send("error deleting activity");
    }
});
router.put("/update/:id",updateActivityValidator,async (req: Request, res: Response)=>{
    const errors = validationResult(req);
    if (! errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const activityData = matchedData(req);
    try{
        const id = req.params.id;
        const updatedActivity = await updateActivity(id,activityData);
        res.status(200).send("Activity updated successfully");
    }
    catch(err){
        res.status(500).send("error updating activity");
    }
});

router.patch("/toggleInappropriate/:id",async (req: Request, res: Response)=>{
    try{
        const id = req.params.id;
        const updatedActivity = await toggleInappropriate(id);
        res.status(200).send(updatedActivity);
    }
    catch(err){
        res.status(500).send("error updating activity");
    }
})
export default router;