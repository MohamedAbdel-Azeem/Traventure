import mongoose from "mongoose";
import Activity from "./Activity";
import exp from "constants";

const schema = mongoose.Schema;

export interface IBooking extends mongoose.Document {
  type: string;
  itinerary: mongoose.Types.ObjectId;
  activity: mongoose.Types.ObjectId;
  tourist: mongoose.Types.ObjectId;
  timeStamp: Date;
}
const bookingSchema = new schema({
  type: { type: String, required: true },
  itinerary: { type: mongoose.Types.ObjectId, ref: "Itinerary" },
  activity: { type: mongoose.Types.ObjectId, ref: "Activity" },
  tourist: { type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
  timeStamp: { type: Date, required: true, default: Date.now },
  price: { type: Number, required: true },

});

export default mongoose.model<IBooking>("Booking", bookingSchema);
