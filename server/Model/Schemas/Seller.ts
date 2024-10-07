import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  description: String,
  isAccepted: { type: Boolean, default: false },
});

export default mongoose.model("Seller", SellerSchema);
