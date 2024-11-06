
import mongoose, { Document, Types } from "mongoose";
interface TagStructure {
  _id: string;
  name: string;
  __v: number;
}

export interface ItineraryDocument extends Document {
  main_Picture?: string;
  title: string;
  description: string;
  added_By: string;
  price: number;
  starting_Date: Date;
  ending_Date: Date;
  rating: number;
  total: number;
  language: string;
  pickup_location: {longitude: number, latitude: number};
  dropoff_location: {longitude: number, latitude: number};
  //change this ↓ back to string[] if it causes issues
  selectedTags: TagStructure[];
  plan: Array<{
    place?: Types.ObjectId;
    activities: Array<{
      activity_id?: Types.ObjectId;
      activity_duration: number;
      time_unit: string;
    }>;
  }>;
  booked_By: Array<{
    user_id: string;
  }>;
  accesibility: boolean;
  bookingActivated: boolean;
  inappropriate: boolean;
  feedback: {
    user_id: string;
    review?: string;
    rating?: Number;
    createdAt?: Date;
  }[];
}
