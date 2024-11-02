import { hashPassword } from "../../utils/functions/bcrypt_functions";
import touristModel from "../Schemas/Tourist";
import tourGuideModel from "../Schemas/TourGuide";
import ItineraryModel from '../Schemas/Itinerary';

import mongoose from "mongoose";
import complaint from "../Schemas/complaint";

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
    username: string;
    review?: string;
    rating?: string;
    createdAt?: Date;
}

export async function isUserBookedInItineraryOFtourGuide(username: string, tourGuideUsername: string) {
    try {
        const itinerary = await ItineraryModel.findOne({
          added_By: tourGuideUsername,
          booked_By: { $elemMatch: { user_id: username } },
        });
    
        return !!itinerary; // Returns true if itinerary is found, otherwise false
      } catch (error) {
        throw error;
      }
}


export async function rateTourGuide(username: string , feedback: IFeedback) {
    const tourGuide  = await tourGuideModel.findOne({ username: username });
    if (!tourGuide) {
        throw new Error("TourGuide not found");
    }
    //check that i had at least one itinary with this tour guide
    if(await isUserBookedInItineraryOFtourGuide(feedback.username, username)){
        throw new Error("You have not booked with this tour guide");
    }

    


    for(let i = 0; i < tourGuide.feedback.length; i++){
        if(tourGuide.feedback[i].username === feedback.username){
            tourGuide.feedback.splice(i, 1);
            break;
        }
    }
    
    tourGuide.feedback.push({ username: feedback.username, review: feedback.review , rating: feedback.rating });    
    await tourGuide.save();
  }

  export async function rateItinerary(itineraryid: string , feedback: IFeedback) {
    const itinerary  = await ItineraryModel.findOne({ _id: itineraryid });
    if (!itinerary) {
        throw new Error("Itinerary not found");
    }

    for(let i = 0; i < itinerary.feedback.length; i++){
        if(itinerary.feedback[i].username === feedback.username){
            itinerary.feedback.splice(i, 1);
            break;
        }
    }
    itinerary.feedback.push({ username: feedback.username, review: feedback.review , rating: feedback.rating });    
    await itinerary.save();
  }


export async function getTouristBookings(username: string) {
    try {
 
        const tourist = await touristModel.findOne({ username: username })
    .populate([
        {
            path: "bookings",
            populate: [
                {
                    path: "itinerary",
                    select: "title _id" // specify the fields you want to populate
                },
                {
                    path: "activity",
                    select: "name _id" // specify the fields you want to populate
                }
            ]
        }
    ]);
    if (!tourist) {
        throw new Error("Tourist not found");
    }
    const {bookings} = tourist as unknown as Tourist;
     return bookings;
    } catch (error) {
        throw error;
    }
}

export async function gettouristComplaints(username: string) {
    try {
        const Complaints = await complaint.find({ username: username });
    return Complaints;}
        catch (error) {
            throw error;
        }
    }

module.exports = {}; 

