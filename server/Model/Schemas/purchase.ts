import mongoose, { mongo } from "mongoose";
import Tourist, { IAddress } from "./Tourist";

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
  touristId: mongoose.Types.ObjectId;
  cart: IPurchasedProduct[];
  timeStamp: Date;
  status?: PurchaseStatus;
  totalAmount?: number;
  promoCode?: string;
  paymentMethod: PaymentMethod;
  address: string;
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
    type: mongoose.Types.ObjectId,
    required: true,
    validate: {
      validator: async function (
        this: IPurchase,
        value: mongoose.Types.ObjectId
      ) {
        const tourist = await Tourist.findById(this.touristId);
        if (!tourist || !tourist.saved_addressess) return false;
        return tourist.saved_addressess.some((address) => {
          if (address._id) return address._id.equals(value);
        });
      },
      message: "Invalid address id",
    },
  },
  totalAmount: { type: Number, default: 0 },
  promoCode: { type: String, default: "" },
});

export default mongoose.model<IPurchase>("Purchase", purchaseSchema);
