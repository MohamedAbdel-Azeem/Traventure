import mongoose from "mongoose";
import Category from "./Category";
import PreferenceTags from "./preferenceTags";

const schema = mongoose.Schema;

const ActivitySchema = new schema({
Title : {type: String, required: true},   
DateAndTime: {type: Date, required: true},
Location: {
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
},
Price: {type: Number, required: true},
SpecialDiscount: {type: Number, required: true},
Category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
Tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "PreferenceTags", required: true }],
BookingIsOpen: {type: Boolean, required: true},
});

//tags misssing

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
