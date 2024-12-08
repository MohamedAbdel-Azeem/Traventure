import mongoose from "mongoose";

const schema = mongoose.Schema;

export enum PaymentMethod {
    wallet = "wallet",
    card = "card",
    cod = "cod",
  }

export interface IFlightBooking extends mongoose.Document {
    departureCity: string;
    departureTime: Date;
    arrivalCity: string;
    carrierName: string;
    flightDuration: string;
    totalPrice: number;
    bagsWeight: number;
    flightClass: string;
    flightNumber: number;
    booked_by: mongoose.Types.ObjectId;
    transportation: boolean;
    promoCode: string;
    paymentMethod: PaymentMethod;
}

const flightBookingSchema = new schema({
    departureCity:{type:String , required:true},
    departureTime:{type:Date , required:true},
    arrivalCity:{type:String , required:true},
    carrierName:{type:String , required:true},
    flightDuration:{type:String,required:true},
    totalPrice:{type:Number,required:true},
    bagsWeight:{type:Number},
    flightClass:{type:String , required:true},
    flightNumber:{type:Number , required:true},
    booked_by:{ type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
    transportation:{type:Boolean,required:true},
    promoCode: { type: String, default: "" },
    paymentMethod: { type: String, required: true },
})

export default mongoose.model<IFlightBooking>("flightBooking", flightBookingSchema);