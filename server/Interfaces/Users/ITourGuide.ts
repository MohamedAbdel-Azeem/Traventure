import { Document } from "mongoose";

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
    username: string;
    review?: string;
    rating?: string;
    createdAt?: Date;
  }[];
}

export default ITourGuide;
