import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: { type: String, required: true },
  profilepic: { type: String, default: null },
  wallet: { type: Number, required: true, default: 0 },
  name: String,
  description: String,
  isAccepted: { type: Boolean, default: false },
  notifications: [
    {
      message: { type: String, required: true },
      sent_by_mail: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  timeStamp: { type: Date, required: true, default: Date.now },

});

export default mongoose.model("Seller", SellerSchema);
