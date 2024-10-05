import mongoose, { models } from "mongoose";
import advertiserModel from "../Schemas/Advertiser";
import sellerModel from "../Schemas/Seller";
import tourGuideModel from "../Schemas/TourGuide";
import touristModel from "../Schemas/Tourist";
import adminModel from "../Schemas/Admin";
import governerModel from "../Schemas/Governer";
import { get } from "http";
import { comparePassword } from "../../utils/functions/bcrypt_functions";
import { compare } from "bcryptjs";

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
    case "tourist":
      model = touristModel;
      break;
    default:
      throw new Error("Invalid user type");
  }
  try {
    let user = await model.findOne({ username: username });
    if (type === "advertiser" && user) {
      user = await user.populate("company");
    }
    return user;
  } catch (err) {
    throw err;
  }
}

export async function updateProfileInfo(
  username: string,
  type: string,
  updatedInfo: any
) {
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
    case "tourist":
      model = touristModel;
      break;
    default:
      throw new Error("Invalid user type");
  }
  try {
    const user = await model.findOneAndUpdate(
      { username: username },
      updatedInfo,
      { new: true }
    );
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
    const governors = await governerModel.find();
    const admins = await adminModel.find({ username: { $ne: username } });
    return { advertisers, sellers, tourGuides, tourists, admins, governors };
  } catch (err) {
    throw err;
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const results = await Promise.all([
      sellerModel.findOne({ username }),
      advertiserModel.findOne({ username }),
      tourGuideModel.findOne({ username }),
      adminModel.findOne({ username }),
      touristModel.findOne({ username }),
      governerModel.findOne({ username }),
    ]);

    const models = [
      "seller",
      "advertiser",
      "tourGuide",
      "admin",
      "tourist",
      "Governer",
    ];

    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        const user = results[i];
        const passwordMatch = await comparePassword(
          password,
          (user as any).password
        );
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return { type: models[i], user: results[i] };
      }
    }

    throw new Error("Username not found in any table");
  } catch (err) {
    throw err;
  }
}

module.exports = { getprofileInfo, getAllUsers, updateProfileInfo, loginUser };
