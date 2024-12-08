import mongoose from "mongoose";
import Booking from "./Booking";
import { timeStamp } from "console";
const Schema = mongoose.Schema;

export interface IAddress {
  latitude: number;
  longitude: number;
  street: string;
  buildingNumber: string;
  floor?: string;
  apartmentNumber?: string;
  additionalDirections?: string;
}

export interface ITourist extends Document {
  username: string;
  email: string;
  password: string;
  profilepic: string;
  mobileNumber: string;
  dateOfBirth: Date;
  nationality: string;
  Occupation: string;
  wallet: number;
  bookings: mongoose.Types.ObjectId[];
  purchases: mongoose.Types.ObjectId[];
  currentLoyaltyPoints: number;
  totalLoyaltyPoints: number;
  loyaltyLevel: number;
  timeStamp: Date;
  bookmarkedActivities: mongoose.Types.ObjectId[];
  bookmarkedItineraries: mongoose.Types.ObjectId[];
  wishlisted_products: mongoose.Types.ObjectId[];
  skipWebsiteTutorial: boolean;
  promo_sent?: boolean;
  notifications: {
    message: string;
    sent_by_mail: boolean;
    read: boolean;
    createdAt: Date;
  }[];
  saved_addressess?: IAddress[];
}

const touristSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepic: { type: String, default: null },
  mobileNumber: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true, immuatable: true },
  nationality: { type: String, required: true },
  Occupation: { type: String, required: true },
  wallet: { type: Number, required: true, default: 0 },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  purchases: [{ type: mongoose.Types.ObjectId, ref: "Purchase" }],
  currentLoyaltyPoints: { type: Number, required: true, default: 0 },
  totalLoyaltyPoints: { type: Number, required: true, default: 0 },
  loyaltyLevel: { type: Number, default: 1 },
  timeStamp: { type: Date, required: true, default: Date.now },
  bookmarkedActivities: [{ type: mongoose.Types.ObjectId, ref: "Activity" }],
  bookmarkedItineraries: [{ type: mongoose.Types.ObjectId, ref: "Itinerary" }],
  wishlisted_products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  notifications: [
    {
      message: { type: String, required: true },
      sent_by_mail: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  skipWebsiteTutorial: { type: Boolean, default: false },
  promo_sent: { type: Boolean, default: false },
  saved_addressess: {
    type: [
      {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        street: { type: String, required: true },
        buildingNumber: { type: String, required: true },
        floor: { type: String, default: null },
        apartmentNumber: { type: String },
        additionalDirections: { type: String, default: "" },
      },
    ],
    default: [],
  },
});

export default mongoose.model<ITourist>("Tourist", touristSchema);
