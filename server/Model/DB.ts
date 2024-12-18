import mongoose from "mongoose";
require("dotenv").config();

const mongoDB = process.env.MONGODB_URI;

export default async function connectDB() {
  try {
    if (!mongoDB) {
      throw new Error("MongoDB URI is missing or Invalid");
    }
    await mongoose.connect(mongoDB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}
