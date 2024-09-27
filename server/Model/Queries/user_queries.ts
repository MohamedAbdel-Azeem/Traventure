import mongoose, { models } from "mongoose";
import advertiserModel from '../Schemas/Advertiser';
import sellerModel from '../Schemas/Seller';
import tourGuideModel from '../Schemas/TourGuide';

export async function getprofileInfo(username:string, type:string){
    let model:any;
  switch(type){
    case "advertiser":
      model = advertiserModel;break;
    case "seller":
      model = sellerModel;break;
    case "tourGuide":
      model = tourGuideModel;break;
      
  }
    try{
        const tourGuide = await tourGuideModel.findOne({username:username}) ;
        return tourGuide;
    }
    catch(err){
        throw err;
    }

}


module.exports={getprofileInfo};