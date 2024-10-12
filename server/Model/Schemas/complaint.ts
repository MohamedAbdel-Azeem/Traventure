import e from "express";
import mongoose from "mongoose";
import { title } from "process";

const schema = mongoose.Schema;

const complaintSchema = new schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    issued_By: { type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
    status: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true },
    type: { type: Boolean, required: true, default: false },
    booking_Id: { type: mongoose.Types.ObjectId, required: true, ref: "Booking" },

});

export default mongoose.model("Complaint", complaintSchema);