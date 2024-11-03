import mongoose from "mongoose";

const schema = mongoose.Schema;

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  seller: string;
  externalseller: string;
  imageUrl: string;
  quantity: number;
  feedback: {
    name: mongoose.Types.ObjectId;
    rating: Number;
    review: string;
  }[];
  sales: mongoose.Types.ObjectId[];
  isArchived: boolean;
}

const ProductSchema = new schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  externalseller: { type: String },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
  sales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
    },
  ],
  feedback: [
    {
      name: { type: mongoose.Schema.Types.ObjectId, ref: "Tourist" },
      rating: { type: Number, min: 0, max: 5 },
      review: String,
    },
  ],
  isArchived: { type: Boolean, default: false },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
