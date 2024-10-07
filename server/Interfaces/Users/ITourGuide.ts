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
}

export default ITourGuide;
