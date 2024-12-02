import mongoose from "mongoose";

const schema = mongoose.Schema;

const hotelBookingSchema = new schema({
    hotelName: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    roomType: { type: String},
    bedType: { type: String},
    numberOfBeds: { type: Number},
    totalPrice: { type: Number, required: true },
    booked_by:{ type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
    promoCode: { type: String, default: "" }
})

export default mongoose.model("hotelBooking", hotelBookingSchema);