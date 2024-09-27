import mongoose from "mongoose";
import { IAdvertiser } from "../../Interfaces/Users/IAdvertiser";

const Schema = mongoose.Schema;

const AdvertiserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  websiteLink: String,
  hotline: String,
  companyProfile: String,
  isAccepted: { type: Boolean, default: false },
});

export default mongoose.model<IAdvertiser>("Advertiser", AdvertiserSchema);
