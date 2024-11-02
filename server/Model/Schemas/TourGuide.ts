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
      stillWorkHere: Boolean,
      role: String,
      location: String,
      description: String,
    },
  ],
  isAccepted: { type: Boolean, default: false },
  feedback: [
    {
      username: { type: mongoose.Types.ObjectId, required: true ,ref: "Tourist" },
      review: String,
      rating: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<ITourGuide>("TourGuide", tourGuideSchema);
