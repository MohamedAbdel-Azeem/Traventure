import mongoose, { models } from "mongoose";
import advertiserModel from "../Schemas/Advertiser";
import sellerModel from "../Schemas/Seller";
import tourGuideModel from "../Schemas/TourGuide";
import IAdvertiser from "../../Interfaces/Users/IAdvertiser";
import ISeller from "../../Interfaces/Users/ISeller";
import ITourGuide from "../../Interfaces/Users/ITourGuide";

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

module.exports = { getprofileInfo };
