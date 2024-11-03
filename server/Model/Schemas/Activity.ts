import mongoose from "mongoose";
import Category from "./Category";
import PreferenceTags from "./preferenceTags";

const schema = mongoose.Schema;
export interface INActivity extends mongoose.Document {
  Title: string;
  DateAndTime: Date;
  Location: {
    latitude: number;
    longitude: number;
  };
  Price: number;
  SpecialDiscount: number;
  Category: mongoose.Types.ObjectId;
  Tags: mongoose.Types.ObjectId[];
  BookingIsOpen: boolean;
  feedback: [
    {
      name: string;
      rating: string;
      review: string;
    }
  ];
  added_By: mongoose.Types.ObjectId;
  inappropriate: boolean;
}

const ActivitySchema = new schema({
  
  Title: { type: String, required: true },
  DateAndTime: { type: Date, required: true },
  Location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  Price: { type: Number, required: true },
  SpecialDiscount: { type: Number, required: true },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  Tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PreferenceTags",
      required: true,
    },
  ],
  BookingIsOpen: { type: Boolean, required: true },
  feedback: [
    {
      name: String,
      rating: String,
      review: String,
    },
  ],
  added_By: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Advertiser",
  },
  inappropriate: { type: Boolean, default: false },
  feedback: [
  {
    user_id: { type: mongoose.Types.ObjectId, required: true ,ref: "Tourist" },
    review: String,
    rating: String,
    createdAt: { type: Date, default: Date.now },
  },
],
});

const Activity = mongoose.model<INActivity>("Activity", ActivitySchema);
export default Activity;
