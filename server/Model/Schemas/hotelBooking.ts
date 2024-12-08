import mongoose from "mongoose";

const schema = mongoose.Schema;

export enum PaymentMethod {
    wallet = "wallet",
    card = "card",
    cod = "cod",
  }

export interface IHotelBooking extends mongoose.Document {
    hotelName: string;
    checkInDate: Date;
    checkOutDate: Date;
    roomType: string;
    bedType: string;
    numberOfBeds: number;
    totalPrice: number;
    booked_by: mongoose.Types.ObjectId;
    promoCode: string;
    paymentMethod: PaymentMethod;
}

const hotelBookingSchema = new schema({
    hotelName: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    roomType: { type: String},
    bedType: { type: String},
    numberOfBeds: { type: Number},
    totalPrice: { type: Number, required: true },
    booked_by:{ type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
    promoCode: { type: String, default: "" },
    paymentMethod: { type: String, required: true },
})

export default mongoose.model("hotelBooking", hotelBookingSchema);