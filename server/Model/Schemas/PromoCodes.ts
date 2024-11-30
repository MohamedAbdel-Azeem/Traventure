import mongoose from "mongoose";

const schema = mongoose.Schema;

interface IPromoCodes {
  name: string;
  used: boolean;
}

const PromoCodesSchema = new schema({
  name: { type: String, required: true, unique: true },
  used: { type: Boolean, required: true, default: false },
});

export default mongoose.model<IPromoCodes>("PromoCodes", PromoCodesSchema);
