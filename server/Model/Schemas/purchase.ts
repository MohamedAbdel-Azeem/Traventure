import mongoose from "mongoose";
import { IAddress } from "./Tourist";

const schema = mongoose.Schema;

export interface IPurchasedProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export enum PurchaseStatus {
  processing = "processing",
  delivered = "delivered",
  cancelled = "cancelled",
}

export interface IPurchase {
  touristId: mongoose.Types.ObjectId;
  cart: IPurchasedProduct[];
  timeStamp: Date;
  status: PurchaseStatus;
}

const purchaseSchema = new schema({
  touristId: { type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
  cart: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  timeStamp: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, default: PurchaseStatus.processing },
  address: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    street: { type: String, required: true },
    buildingNumber: { type: String, required: true },
    floor: { type: String, required: false, default: "" },
    apartmentNumber: { type: String, required: true },
    additionalDirections: { type: String, required: false, default: "" },
  },
});

export default mongoose.model<IPurchase>("Purchase", purchaseSchema);
