import governerModel from "../Schemas/Governer";
import mongoose from "mongoose";
import touristModel from "../Schemas/Tourist";
import tourGuideModel from "../Schemas/TourGuide";
import sellerModel from "../Schemas/Seller";
import advertiserModel from "../Schemas/Advertiser";

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
        case"governer":
        model = governerModel;
        break;
        default: 
        model = touristModel;}
        const user = await model.findOne({ username: username });
        if (user==null) {
          return null; 
        }
    
        await model.deleteOne({ username: username });        
        return user; 

}
catch (error) {
  throw error;}
}

  module.exports = {addGoverner, deleteUser}