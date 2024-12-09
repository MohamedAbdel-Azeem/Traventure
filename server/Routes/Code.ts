import e, { Request, Response, Router } from "express";
import { validationResult, matchedData, body } from "express-validator";
import { useCode, addCode } from "../Model/Queries/code_queries";
import {
  sendCode,
  generateRandomCode,
} from "../utils/functions/recovery_code_email";
import advertiserModel from "../../server/Model/Schemas/Advertiser";
import sellerModel from "../../server/Model/Schemas/Seller";
import tourGuideModel from "../../server/Model/Schemas/TourGuide";
import touristModel from "../../server/Model/Schemas/Tourist";
import mongoose from "mongoose";
const router = Router();

router.post("/add", async (req: Request, res: Response) => {
  const email = req.body.email;
  console.log(email);

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const emailExists = await checkEmailExists(email); 
    if (!emailExists) {
      return res.status(404).send("Email not found");
    }

    const code = generateRandomCode();
    const data = await addCode(email, code);
    await sendCode(email, code);
    res.status(200).send("Code Added Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the code");
  }
});


const checkEmailExists = async (email: string) => {
 let model: mongoose.Model<any>;
 try {
   let auser = await advertiserModel.findOne({ email: email });
   let suser = await sellerModel.findOne({ email: email });
   let tuser = await tourGuideModel.findOne({ email: email });
   let ttuser = await touristModel.findOne({ email: email });
   return auser || suser || tuser || ttuser;
 } catch (err) {
   throw err;
 }
};

router.delete("/use", async (req: Request, res: Response) => {
  const email = req.body.email;
  const code = req.body.code;
  if (!email || !code) {
    return res.status(400).send("Email and code are required");
  }
  try {
    const used = await useCode(email, code);
    if (used) {
      res.status(200).send("Code used successfully");
    } else {
      res.status(400).send("Invalid code or email");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while using the code");
  }
});
export default router;
