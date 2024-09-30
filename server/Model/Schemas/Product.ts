import mongoose from "mongoose";

const schema = mongoose.Schema;

const ProductSchema = new schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
  feedback: [
    {
      name: String,
      rating: String,
      review: String,
    },
  ],
});

export default mongoose.model("Product", ProductSchema);