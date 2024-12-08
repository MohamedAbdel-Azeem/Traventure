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

export enum PaymentMethod {
  wallet = "wallet",
  card = "card",
  cod = "cod",
}

export interface IPurchase {
  touristUsername: mongoose.Types.ObjectId;
  cart: IPurchasedProduct[];
  timeStamp: Date;
  status?: PurchaseStatus;
  totalAmount?: number;
  promoCode?: string;
  paymentMethod: PaymentMethod;
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
  paymentMethod: { type: String, required: true },
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
  totalAmount: { type: Number, default: 0 },
  promoCode: { type: String, default: "" },
});

export default mongoose.model<IPurchase>("Purchase", purchaseSchema);
