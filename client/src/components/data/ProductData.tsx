import mongoose from "mongoose";

export interface ACTUALProduct {
  _id:string,
  name: string;
  price: number;
  description: string;
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  externalseller:string;
  imageUrl: string;
  quantity: number;
  feedback: {
    name: string,
    rating: string,
    review: string,
  }[],
}
