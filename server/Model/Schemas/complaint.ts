import mongoose from "mongoose";
const schema = mongoose.Schema;
const complainSchema = new schema({
    type: { type: Boolean, required: true },//true for general and false for specific
    booking_Id:{type:mongoose.Types.ObjectId,ref:"Booking"},
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    reply: { type: String},
});

export default mongoose.model("Complaint", complainSchema);