import governerModel from "../Schemas/Governer";
import mongoose from "mongoose";
import touristModel from "../Schemas/Tourist";
import tourGuideModel from "../Schemas/TourGuide";
import sellerModel from "../Schemas/Seller";
import advertiserModel from "../Schemas/Advertiser";
import adminModel from "../Schemas/Admin"
import { hashPassword } from '../../utils/functions/bcrypt_functions';




export async function addGoverner(governer: any, username: string) {

    try {
        
        const governerUsername = await governerModel.findOne({username});
        if (governerUsername) {
           return null;
          
        }
        governer.password = await hashPassword(governer.password);
        const newGoverner = await governerModel.create(governer);
            return newGoverner
      
    } catch (error) {
      throw error;
    }
  }



  export async function deleteUser(username: string, type: string) {
    
  try { 
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
        case"tourist":
        model = touristModel;
        break;
        case"admin":
        model = adminModel;
        break;
        case"governer":
        model = governerModel;
        break;
        default: 
        model = touristModel;}
        const user = await model.findOne({ username: username });
        if (user==null) {
          return null; 
        }
    
        await model.deleteOne({ username: username});        
        return user; 

}
catch (error) {
  throw error;}
}

export async function getAllPendingUsers() {
  try{
  const advertisers = await advertiserModel.find({isAccepted: false});

  const sellers = await sellerModel.find({isAccepted: false});

  const tourGuides = await tourGuideModel.find({isAccepted: false});

  return {advertisers, sellers, tourGuides};
  }catch(err){
    throw err;
  }
}

export async function acceptUser(username: string, type: string, isaccepted: boolean) {
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
    if(isaccepted){
    const user = await model.findOneAndUpdate(
      { username: username },
      { isAccepted: isaccepted },
      { new: true }
    ); 
    return user;
  }
  else {
    const user = await model.findOneAndDelete({ username: username });
    return user;
  }
  } catch (err) {
    throw err;
  }  
}

  module.exports = {addGoverner, deleteUser, getAllPendingUsers, acceptUser};