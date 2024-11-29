import mongoose from "mongoose";

const schema = mongoose.Schema;

const PromoCodesSchema = new schema({
  name: { type: String, required: true, unique: true },
  used: { type: Boolean, required: true, default: false },
});

export default mongoose.model("PromoCodes", PromoCodesSchema);
