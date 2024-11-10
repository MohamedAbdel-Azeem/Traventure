import mongoose from "mongoose";

const schema = mongoose.Schema;

export interface IPurchasedProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IPurchase {
  touristId: mongoose.Types.ObjectId;
  cart: IPurchasedProduct[];
  timeStamp: Date;
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
});

export default mongoose.model<IPurchase>("Purchase", purchaseSchema);
