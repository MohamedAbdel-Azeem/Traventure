import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
const tourGuideSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber:  String,
  yearsOfExperience:  Number,
  previousWork: [{
    companyName: String,
    startDate: Date,
    endDate: Date,
    role: String,
    location: String,
    description: String
}],
  isAccepted: { type: Boolean, default: false }
});

export default mongoose.model<ITourGuide>('TourGuide', tourGuideSchema);

