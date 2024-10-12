import { hashPassword } from "../../utils/functions/bcrypt_functions";
import touristModel from "../Schemas/Tourist";
import Itinerary from '../Schemas/Itinerary';
import Activity from '../Schemas/Activity';
import Place from '../Schemas/Places';
import { getprofileInfo } from "./user_queries";
import mongoose from "mongoose";

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
export async function getAll() {
    try {
         // Fetch upcoming itineraries
         const itineraries = await Itinerary.find({ starting_Date: { $gte: new Date() } }).populate('added_By')
         .populate('added_By')
    .populate('plan.place')
    .populate('plan.activities.activity_id')
    .populate('selectedTags');

         // Fetch upcoming activities
         const activities = await Activity.find({ DateAndTime: { $gte: new Date() } }).populate("Tags").populate("Category");
 
         // Fetch historical places/museums
         const places = await Place.find().populate('historicalTags');

        return {itineraries, activities, places};

    } catch (err) {
      throw err;
    }
  }
export async function getTouristBookings(username: string) {
    try {
 
        const tourist = await touristModel.findOne({ username: username })
        .populate({
            path: "bookings",
            populate: {
                path: "itinerary",
                select: "title _id" // specify the fields you want to populate
            }
        });

    if (!tourist) {
        throw new Error("Tourist not found");
    }
    const {bookings} = tourist as unknown as Tourist;
     return bookings;
    } catch (error) {
        throw error;
    }
}
module.exports = {getAll, getTouristBookings}; 

