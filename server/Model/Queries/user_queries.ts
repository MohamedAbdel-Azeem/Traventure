import mongoose, { models } from "mongoose";
import advertiserModel from "../Schemas/Advertiser";
import sellerModel from "../Schemas/Seller";
import tourGuideModel from "../Schemas/TourGuide";
import touristModel from "../Schemas/Tourist";
import adminModel from "../Schemas/Admin";
import governerModel from "../Schemas/Governer";
import { get } from "http";
import {
  comparePassword,
  hashPassword,
} from "../../utils/functions/bcrypt_functions";

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
      "tourguide",
      "admin",
      "tourist",
      "tourismgovernor",
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

export async function changePassword(
  username: string,
  oldpassword: string,
  newpassowrd: string
) {
  try {
    const results = await Promise.all([
      sellerModel.findOne({ username }),
      advertiserModel.findOne({ username }),
      tourGuideModel.findOne({ username }),
      adminModel.findOne({ username }),
      touristModel.findOne({ username }),
      governerModel.findOne({ username }),
    ]);

    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        const user = results[i];
        const passwordMatch = await comparePassword(
          oldpassword,
          (user as any).password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        const passwordMatch2 = await comparePassword(
          newpassowrd,
          (user as any).password
        );
        if (passwordMatch2) {
          throw new Error("New password is same as old password");
        }
        const newpass = await hashPassword(newpassowrd);
        if (i === 0) {
          return await sellerModel.findOneAndUpdate(
            { username },
            { password: newpass },
            { new: true }
          );
        } else if (i === 1) {
          return await advertiserModel.findOneAndUpdate(
            { username },
            { password: newpass },
            { new: true }
          );
        } else if (i === 2) {
          return await tourGuideModel.findOneAndUpdate(
            { username },
            { password: newpass },
            { new: true }
          );
        } else if (i === 3) {
          return await adminModel.findOneAndUpdate(
            { username },
            { password: newpass },
            { new: true }
          );
        } else if (i === 4) {
          return await touristModel.findOneAndUpdate(
            { username },
            { password: newpass },
            { new: true }
          );
        } else if (i === 5) {
          return await governerModel.findOneAndUpdate(
            { username },
            { password: newpass },
            { new: true }
          );
        }
      }
    }
  } catch (err) {
    throw err;
  }
}

export async function updatePassword(
  email: string,
  newpassword: string
) {
  try {
    const results = await Promise.all([
      sellerModel.findOne({ email }),
      advertiserModel.findOne({ email }),
      tourGuideModel.findOne({ email }),
      adminModel.findOne({ email }),
      touristModel.findOne({ email }),
      governerModel.findOne({ email }),
    ]);

    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        const newpass = await hashPassword(newpassword);
        if (i === 0) {
          return await sellerModel.findOneAndUpdate(
            { email },
            { password: newpass },
            { new: true }
          );
        } else if (i === 1) {
          return await advertiserModel.findOneAndUpdate(
            { email },
            { password: newpass },
            { new: true }
          );
        } else if (i === 2) {
          return await tourGuideModel.findOneAndUpdate(
            { email },
            { password: newpass },
            { new: true }
          );
        } else if (i === 3) {
          return await adminModel.findOneAndUpdate(
            { email },
            { password: newpass },
            { new: true }
          );
        } else if (i === 4) {
          return await touristModel.findOneAndUpdate(
            { email },
            { password: newpass },
            { new: true }
          );
        } else if (i === 5) {
          return await governerModel.findOneAndUpdate(
            { email },
            { password: newpass },
            { new: true }
          );
        }
      }
    }
  } catch (err) {
    throw err;
  }
}

export async function getcurrentuser(username: string) {
  try {
    const results = await Promise.all([
      sellerModel.findOne({ username }),
      advertiserModel.findOne({ username }),
      tourGuideModel.findOne({ username }),
      touristModel.findOne({ username }),
    ]);

    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        if (i === 0) {
          return await sellerModel.findOne({ username: username });
        } else if (i === 1) {
          return await advertiserModel.findOne({ username: username });
        } else if (i === 2) {
          return await tourGuideModel.findOne({ username: username });
        } else if (i === 3) {
          return await touristModel.findOne({ username: username });
        }
      }
    }
  } catch (err) {
    throw err;
  }
}

export async function getAllTourists() {
  try {
    return await touristModel.find();
  } catch {
    console.log("Error getting All Tourists");
  }
}

module.exports = {
  getprofileInfo,
  getAllUsers,
  updateProfileInfo,
  loginUser,
  changePassword,
  updatePassword,
  getcurrentuser,
  getAllTourists,
};
