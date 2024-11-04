import path from "path";
import purchase from "../../Model/Schemas/purchase";
import mongoose, { model } from "mongoose";

export async function addPurchase(purchaseData: object) {
  try {
    return await purchase.create(purchaseData);
  } catch (error) {
    throw error;
  }
}

export async function getTouristPurchases(touristId: string) {
  try {
    return await purchase.find({ touristId }).populate("productId");
  } catch (error) {
    throw error;
  }
}

export async function getSellerSales(
  sellerId: string | mongoose.Types.ObjectId
) {
  try {
    return await purchase
      .find()
      .populate({
        path: "productId",
        match: { seller: sellerId }, // Match with the "seller" field in the Product schema
        populate: { path: "seller", model: "Seller" }, // Populate the "seller" field, not "Seller"
      })
      .exec();
  } catch (error) {
    throw error;
  }
}

module.exports = { addPurchase, getTouristPurchases, getSellerSales };
