import { Request, response, Response, Router } from "express";
import { validationResult, matchedData } from "express-validator";
import {
  addActivityValidator,
  updateActivityValidator,
} from "../utils/express-validator/activityValidator";
import {
  addActivity,
  getActivities,
  deleteActivity,
  updateActivity,
  getActivitiesid,
  toggleInappropriate,
  getActivityid,
  sendMailAndNotificationToAdvertiser
} from "../Model/Queries/activity_queries";
import Advertiser from "../Model/Schemas/Advertiser";
import sendMail from "../utils/functions/email_sender";
import { Console } from "console";
const router = Router();

router.post(
  "/add",
  addActivityValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const activityData = matchedData(req);
    try {
      const newActivity = await addActivity(activityData);

      res.status(201).send("Activity added successfully");
    } catch (err) {
      res.status(500).send("error creating activity");
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const activities = await getActivities();
    res.status(200).send(activities);
  } catch (err) {
    res.status(500).send("error getting activities");
  }
});

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const advertiser = await Advertiser.findOne({
      username: req.params.username,
    });
    if (!advertiser) {
      return res.status(400).send("Advertiser not found");
    }
    const advertiser_Id = advertiser._id as string;
    const products = await getActivitiesid(advertiser_Id);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedActivity = await deleteActivity(id);
    res.status(200).send("Activity deleted successfully");
  } catch (err) {
    res.status(500).send("error deleting activity");
  }
});

router.get("/get/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const activity = await getActivityid(id);
    res.status(200).send(activity);
  } catch (err) {
    console.log(err);
    res.status(500).send("error getting activity");
  }
});

router.put(
  "/update/:id",
  updateActivityValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const activityData = matchedData(req);
    try {
      const id = req.params.id;
      const updatedActivity = await updateActivity(id, activityData);
      res.status(200).send("Activity updated successfully");
    } catch (err) {
      res.status(500).send("error updating activity");
    }
  }
);

router.patch(
  "/toggleInappropriate/:id",
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      console.log("activityid",id);
      const updatedActivity = await toggleInappropriate(id);
      res.status(200).send(updatedActivity);
      await sendMailAndNotificationToAdvertiser(id);
    } catch (err) {
      console.log("activity error",err);
      res.status(500).send("error updating activity");
    }
  }
);
export default router;
