import mongoose from "mongoose";
import Activity from "./Activity";

const schema = mongoose.Schema;

const bookingSchema = new schema({
  type: { type: String, required: true },
  itinerary: { type: mongoose.Types.ObjectId, ref: "Itinerary" },
  activity: { type: mongoose.Types.ObjectId, ref: "Activity" },
  tourist: { type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
});

export default mongoose.model("Booking", bookingSchema);
