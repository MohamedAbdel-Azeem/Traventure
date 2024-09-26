import mongoose from "mongoose";

const Schema = mongoose.Schema;


const AdvertiserSchema = new Schema({
  username: { type: String, required: true , unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Website_Link:  String,
  Hotline:  String,
  Company_Profile: String,
  isAccepted: { type: Boolean, default: false }
});

export default mongoose.model('Advertiser', AdvertiserSchema);