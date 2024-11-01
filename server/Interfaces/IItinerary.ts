import mongoose, { Document, Types } from "mongoose";
export interface ItineraryDocument extends Document {
  main_Picture?: string;
  title: string;
  description: string;
  added_By: Types.ObjectId;
  price: number;
  starting_Date: Date;
  ending_Date: Date;
  rating: number;
  total: number;
  language: string;
  pickup_location: string;
  dropoff_location: string;
  selectedTags: Types.ObjectId[];
  plan: Array<{
    place?: Types.ObjectId;
    activities: Array<{
      activity_id?: Types.ObjectId;
      activity_duration: number;
      time_unit: string;
    }>;
  }>;
  booked_By: Array<{
    user_id: Types.ObjectId;
  }>;
  accesibility: boolean;
  bookingActivated: boolean;
  inappropriate: boolean;
}