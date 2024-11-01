import { timeStamp } from "console";
import mongoose from "mongoose";

const schema = mongoose.Schema;
const purchaseSchema = new schema({
  touristId: { type: mongoose.Types.ObjectId, required: true, ref: "Tourist" },
  productId: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
  timeStamp: { type: Date, required: true, default: Date.now },
  quantity: { type: Number, required: true },
});

export default mongoose.model("Purchase", purchaseSchema);
