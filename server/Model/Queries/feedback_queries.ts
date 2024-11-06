import { hashPassword } from "../../utils/functions/bcrypt_functions";
import touristModel from "../Schemas/Tourist";
import tourGuideModel from "../Schemas/TourGuide";
import ItineraryModel from '../Schemas/Itinerary';
import ActivityModel, { INActivity } from "../Schemas/Activity";

import mongoose from "mongoose";
import { ObjectId } from 'mongoose';
import { ItineraryDocument } from "../../Interfaces/IItinerary";

interface Tourist extends Document {
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  dateOfBirth: Date;
  nationality: string;
  Occupation: string;
  wallet: number;
  bookings: mongoose.Types.ObjectId[] | null;
}
interface IFeedback extends Document {
    user_id: string;
    review?: string;
    rating?: number;
    createdAt?: Date;
}

export async function isUserBookedInItineraryOFtourGuide(user_id: string, tourGuideUser_id: string): Promise<boolean> {
    try {
        const itinerary = await ItineraryModel.findOne({
          added_By: tourGuideUser_id,
          booked_By: { $elemMatch: { user_id: user_id } },
        });
    
        return !!itinerary; // Returns true if itinerary is found, otherwise false
      } catch (error) {
        throw error;
      }
}

export async function isUserAttendedActivity(user_id: string, activity_id: string): Promise<boolean> {
    try {
        const itinerary = await ItineraryModel.findOne({
         plan : {$elemMatch: {activities : { $elemMatch: { activity_id: activity_id } }}},
          booked_By: { $elemMatch: { user_id: user_id } },
        });
    
        return !!itinerary; // Returns true if itinerary is found, otherwise false
      } catch (error) {
        throw error;
      }
}


export async function rateTourGuide(user_id: string , feedback: IFeedback) {
    const tourGuide  = await tourGuideModel.findOne({_id: user_id});
    if (!tourGuide) {
        throw new Error("TourGuide not found");
    }
    //check that i had at least one itinary with this tour guide
    if(!(await isUserBookedInItineraryOFtourGuide(feedback.user_id, user_id))){
        throw new Error("You have not booked with this tour guide");
    }

    for(let i = 0; i < tourGuide.feedback.length; i++){
        if(tourGuide.feedback[i].user_id.toString() === feedback.user_id.toString()){
            tourGuide.feedback.splice(i, 1);
            break;
        }
    }


    tourGuide.feedback.push({ user_id: feedback.user_id, review: feedback.review , rating: feedback.rating });    
    await tourGuide.save();
  }



  export async function rateActivity(activity_id: string , feedback: IFeedback) {
    const Activity  = await ActivityModel.findOne<INActivity>({_id: activity_id});
    if (!Activity) {
        throw new Error("TourGuide not found");
    }
    //check that i had at least one itinary with this tour guide
    if(!(await isUserAttendedActivity(feedback.user_id, activity_id))){
        throw new Error("You have not attended this activity");
    }

    for(let i = 0; i < Activity.feedback.length; i++){
        if(Activity.feedback[i].user_id.toString() === feedback.user_id.toString()){
            Activity.feedback.splice(i, 1);
            break;
        }
    }

    Activity.feedback.push({ user_id: feedback.user_id, review: feedback.review , rating: feedback.rating });    
    await Activity.save();
  }

  export async function rateItinerary(itineraryid: string , feedback: IFeedback) {
    const itinerary  = await ItineraryModel.findById<ItineraryDocument>(itineraryid);

    if (!itinerary) {
        throw new Error("Itinerary not found");
    }
    //check that i went to this itinerary
    let valid=false;
    for(let i = 0; i < itinerary.booked_By.length; i++){
        if(itinerary.booked_By[i].user_id.toString() === feedback.user_id.toString()){
            valid=true;
            break;
        }
    }
    if(!valid){
        throw new Error("You have not booked this itinerary");
    }



    for(let i = 0; i < itinerary.feedback.length; i++){
        if(itinerary.feedback[i].user_id.toString() === feedback.user_id.toString()){
            itinerary.feedback.splice(i, 1);
            break;
        }
    }
    itinerary.feedback.push({ user_id: feedback.user_id, review: feedback.review , rating: feedback.rating });    
    await itinerary.save();
  }



module.exports = {isUserBookedInItineraryOFtourGuide,rateTourGuide,rateItinerary,rateActivity}; 
