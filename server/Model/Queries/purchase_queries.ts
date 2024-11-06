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
  sellerId: string | mongoose.Types.ObjectId,
  compactView: boolean
) {
  try {
    const purchases: Array<{
      cart: Array<{
        productId: {
          _id: mongoose.Types.ObjectId;
          name?: string;
          quantity?: number;
        };
        quantity: number;
      }>;
      timeStamp: Date;
    }> = await purchase
      .find()
      .populate({
        path: "cart.productId",
        match: { seller: sellerId },
        select: "name quantity",
      })
      .lean();

    const sellerSales = purchases
      .map((purchase) => {
        return purchase.cart
          .filter((item) => item.productId)
          .map((item) => ({
            productId: item.productId._id,
            productName: item.productId.name,
            soldQuantity: item.quantity,
            timestamp: purchase.timeStamp,
            remainingQuantity: item.productId.quantity,
          }));
      })
      .flat();

    if (compactView) {
      const compactSellerSales: { [key: string]: any } = {};
      sellerSales.forEach((sale) => {
        const index = sale.productId.toString();
        if (compactSellerSales[index]) {
          compactSellerSales[index].soldQuantity += sale.soldQuantity;
        } else {
          compactSellerSales[index] = {
            productId: sale.productId,
            soldQuantity: sale.soldQuantity,
            productName: sale.productName,
            remainingQuantity: sale.remainingQuantity,
          };
        }
      });
      return Object.values(compactSellerSales);
    }
    return sellerSales;
  } catch (error) {
    throw error;
  }
}

export async function getExternalSellerSales(
  externalSeller: string,
  compactView: boolean
) {
  try {
    const purchases: Array<{
      cart: Array<{
        productId: {
          _id: mongoose.Types.ObjectId;
          name?: string;
          quantity?: number;
        };
        quantity: number;
      }>;
      timeStamp: Date;
    }> = await purchase
      .find()
      .populate({
        path: "cart.productId",
        match: { externalseller: externalSeller },
        select: "name quantity",
      })
      .lean();

    const sellerSales = purchases
      .map((purchase) => {
        return purchase.cart
          .filter((item) => item.productId)
          .map((item) => ({
            productId: item.productId._id,
            productName: item.productId.name,
            soldQuantity: item.quantity,
            timestamp: purchase.timeStamp,
            remainingQuantity: item.productId.quantity,
          }));
      })
      .flat();

    if (compactView) {
      const compactSellerSales: { [key: string]: any } = {};
      sellerSales.forEach((sale) => {
        const index = sale.productId.toString();
        if (compactSellerSales[index]) {
          compactSellerSales[index].soldQuantity += sale.soldQuantity;
        } else {
          compactSellerSales[index] = {
            productId: sale.productId,
            soldQuantity: sale.soldQuantity,
            productName: sale.productName,
            remainingQuantity: sale.remainingQuantity,
          };
        }
      });
      return Object.values(compactSellerSales);
    }

    return sellerSales;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addPurchase,
  getTouristPurchases,
  getSellerSales,
  getExternalSellerSales,
};
