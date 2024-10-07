import { Request, Response, Router } from "express";
import {validationResult , matchedData} from "express-validator"
import { addActivityValidator,updateActivityValidator } from "../utils/express-validator/activityValidator";
import { addActivity, getActivities, deleteActivity,updateActivity } from "../Model/Queries/activity_queries";
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
       console.log(err);
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


export default router;