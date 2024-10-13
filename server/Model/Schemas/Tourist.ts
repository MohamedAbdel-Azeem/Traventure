import mongoose from "mongoose";
import Booking from "./itineraryBooking";
const Schema = mongoose.Schema;


const touristSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber:  { type: String, required: true , unique: true },
  dateOfBirth: { type: Date, required: true , immuatable: true },
  nationality: { type: String, required: true },
  Occupation: { type: String, required: true},
  wallet: { type: Number, required: true, default: 0 },
  bookings: [{type: mongoose.Types.ObjectId, ref: "Booking"}],
});

export default mongoose.model('Tourist', touristSchema);