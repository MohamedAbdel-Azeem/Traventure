import mongoose from "mongoose";
import { ITourGuide } from "../../Interfaces/Users/ITourGuide";

const Schema = mongoose.Schema;

const tourGuideSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: String,
  yearsOfExperience: Number,
  previousWork: [
    {
      company: String,
      startDate: Date,
      endDate: Date,
      role: String,
      location: String,
      description: String,
    },
  ],
  isAccepted: { type: Boolean, default: false },
});

export default mongoose.model<ITourGuide>("TourGuide", tourGuideSchema);
