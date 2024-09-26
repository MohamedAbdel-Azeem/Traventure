import mongoose from "mongoose";

const schema = mongoose.Schema;

const placeSchema = new schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pictures: { type: [String], required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  opening_hrs: String,
  ticket_price: {
    native: { type: Number, required: true },
    foreign: { type: Number, required: true },
    student: { type: Number, required: true },
  },
});

export default mongoose.model("Place", placeSchema);
