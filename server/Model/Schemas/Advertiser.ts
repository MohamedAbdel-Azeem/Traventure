import mongoose from "mongoose";
import { IAdvertiser } from "../../Interfaces/Users/IAdvertiser";

const Schema = mongoose.Schema;


const AdvertiserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: { type: String, required: true },
  company: { type: String },
  isAccepted: { type: Boolean, default: false },
  profilepic: {type: String, default: null},
  wallet: { type: Number, required: true, default: 0 },
  websiteLink: { type: String },
  hotline: { type: String},
  founded: { type: Number },
  description: { type: String },
  location: { type: String},
  Notifications: [
    {
      message: { type: String, required: true },
      sent_by_mail: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<IAdvertiser>("Advertiser", AdvertiserSchema);
