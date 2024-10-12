import mongoose from "mongoose";

const schema = mongoose.Schema;


const bookingSchema = new schema({
    itinerary: { type: mongoose.Types.ObjectId, required: true, ref: "Itinerary" },
    tourist: { type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
});

export default mongoose.model("Booking", bookingSchema);