import mongoose from "mongoose";
import Category from "./Category";

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
Category : {type: String , required: true},
Tags:{type: [String] , required: true},
BookingIsOpen: {type: Boolean, required: true},
});

//tags misssing

export default mongoose.model("Activity", ActivitySchema);

