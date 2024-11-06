import mongoose from "mongoose";
import { ITourGuide } from "../../Interfaces/Users/ITourGuide";

const Schema = mongoose.Schema;

const tourGuideSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: { type: String, required: true },
  profilepic: {type: String, default: null},
  wallet: { type: Number, required: true, default: 0 },
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

      user_id: { type: mongoose.Types.ObjectId, required: true ,ref: "Tourist" },
      review: String,
      rating: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<ITourGuide>("TourGuide", tourGuideSchema);
