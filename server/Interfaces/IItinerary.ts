import { Document } from "mongoose";

export interface IItinerary extends Document {
  main_Picture: string;
  title: string;
  description: string;
  added_By: string;
  price: Number;
  starting_Date: Date;
  ending_Date: Date;
  rating: Number;
    total: Number;
    language: string;
    pickup_location: string;
    dropoff_location: string;
    selectedTags: string[];
    plan: {
        place: string;
        activities: {
            activity_id: string;
            activity_duration: number;
            time_unit: string;
        }[];
    }[];
    booked_By: {
        user_id: string;
    }[];
    accesibility: boolean;

  feedback: {
    username: string;
    review?: string;
    rating?: string;
    createdAt?: Date;
  }[];
}

export default IItinerary;
