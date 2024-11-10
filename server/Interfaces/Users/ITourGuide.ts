import { Document, ObjectId } from "mongoose";
import mongoose from "mongoose";
export interface ITourGuide extends Document {
  username: string;
  email: string;
  password: string;
  mobileNumber?: string;
  yearsOfExperience?: number;
  previousWork: {
    companyName: string;
    startDate: Date;
    endDate: Date;
    role: string;
    location: string;
    description: string;
  }[];
  isAccepted: boolean;
  feedback: {
    user_id: string;
    review?: string;
    rating?: Number;
    username?: string;
    createdAt?: Date;
  }[];
}

export default ITourGuide;
