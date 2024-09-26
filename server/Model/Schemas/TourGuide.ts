import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tourGuideSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber:  String,
  yearsOfExperience:  Number,
  previousWork: [String],
  isAccepted: { type: Boolean, default: false }
});

export default mongoose.model('TourGuide', tourGuideSchema);

