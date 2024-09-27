import mongoose, { models } from "mongoose";
import advertiserModel from '../Schemas/Advertiser';
import sellerModel from '../Schemas/Seller';
import tourGuideModel from '../Schemas/TourGuide';

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

  export async function updateProfileInfo(username: string, type: string, updatedInfo: any) {
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
      const user = await model.findOneAndUpdate({ username: username }, updatedInfo, { new: true });
      return user;
    } catch (err) {
      throw err;
    }
  }
  
  module.exports = { getprofileInfo,updateProfileInfo };