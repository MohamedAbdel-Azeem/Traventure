import mongoose, { models } from "mongoose";
import advertiserModel from "../Schemas/Advertiser";
import sellerModel from "../Schemas/Seller";
import tourGuideModel from "../Schemas/TourGuide";
import touristModel from "../Schemas/Tourist";
import adminModel from "../Schemas/Admin";
import { get } from "http";

export async function getprofileInfo(username: string, type: string) {
  let model: mongoose.Model<any>;
  switch (type) {
    case "advertiser":
      model = advertiserModel;
      break;
    case "seller":
      model = sellerModel;
      break;
    case "tourGuide":
      model = tourGuideModel;
      break;
    default:
      throw new Error("Invalid user type");
  }
  try {
    const user = await model.findOne({ username: username });
    return user;
  } catch (err) {
    throw err;
  }
}

export async function getAllUsers(username: string | undefined) {
  try {
    const advertisers = await advertiserModel.find();
    const sellers = await sellerModel.find();
    const tourGuides = await tourGuideModel.find();
    const tourists = await touristModel.find();
    const admins = await adminModel.find({ username: { $ne: username } });
    return { advertisers, sellers, tourGuides, tourists, admins };
  } catch (err) {
    throw err;
  }
}

module.exports = { getprofileInfo, getAllUsers };
