import mongoose from "mongoose";

const schema = mongoose.Schema;

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
    transportation:{type:Boolean,required:true}
})

export default mongoose.model("flightBooking", flightBookingSchema);