import path from "path";
import purchase, {
  IPurchase,
  PurchaseStatus,
} from "../../Model/Schemas/purchase";
import mongoose, { model } from "mongoose";
import ProductModel, { IProduct } from "../Schemas/Product";
import PromoCodes from "../Schemas/PromoCodes";

export async function addPurchase(purchaseData: IPurchase) {
  try {
    const totalAmount = await getPurchaseTotalAmount(purchaseData);
    purchaseData["totalAmount"] = totalAmount;

    const promoCode = await PromoCodes.findOne({
      name: purchaseData.promoCode,
    });

    if (promoCode && !promoCode.used) {
      purchaseData["totalAmount"] *= 0.9;
      promoCode.used = true;
    }
    const resultPurchase = await purchase.create(purchaseData);
    if (promoCode) await promoCode.save();
    return resultPurchase;
  } catch (error) {
    throw error;
  }
}

const getProduct = async (productId: string): Promise<IProduct | null> => {
  try {
    const product = await ProductModel.findById(productId).lean().exec();
    if (!product) {
      throw new Error("Product not found");
    }
    return product as IProduct;
  } catch (error) {
    throw error;
  }
};

export async function getPurchaseTotalAmount(purchaseData: IPurchase) {
  try {
    const cart = purchaseData.cart;
    var totalAmount = 0;
    for (const purchased_product of cart) {
      const product = await getProduct(purchased_product.productId.toString());
      if (product) {
        totalAmount += product.price * purchased_product.quantity;
      }
    }
    return totalAmount;
  } catch (error) {
    throw error;
  }
}

// export async function updateLoyaltyPoints(touristId:string, amount:number){
//   try {
//     const tourist = await touristModel.findById(touristId);
//     if (!tourist) return null;
//     var points=0;
//     switch(tourist.loyaltyLevel){
//       case 1: points=amount*0.5; break;
//       case 2: points=amount; break;
//       case 3: points=amount*1.5; break;
//     }
//     tourist.currentLoyaltyPoints += points;
//     tourist.totalLoyaltyPoints += points;

//     if(tourist.totalLoyaltyPoints>500000){
//       tourist.loyaltyLevel=3;
//     }
//     else if(tourist.totalLoyaltyPoints>100000){
//       tourist.loyaltyLevel=2;
//     }
//     else {
//       tourist.loyaltyLevel=1;
//     }
//     await tourist.save();
//   } catch (error) {
//     throw error;
//   }
// }

export async function getTouristPurchases(
  touristId: string | mongoose.Types.ObjectId
) {
  try {
    return await purchase
      .find({ touristId })
      .populate({
        path: "cart.productId",
        populate: {
          path: "feedback.touristId",
          select: "username",
        },
      })
      .lean();
  } catch (error) {
    throw error;
  }
}

export async function getSellerSales(
  sellerId: string | mongoose.Types.ObjectId,
  compactView: boolean,
  month?: number
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
    if (month)
      return sellerSales.filter(
        (sale) => sale.timestamp.getMonth() == month - 1
      );
    else return sellerSales;
  } catch (error) {
    throw error;
  }
}

export async function getSellerRevenue(
  sellerId: string | mongoose.Types.ObjectId,
  month: number,
  year: number,
  productName: string
) {
  try {
    const purchases: Array<{
      cart: Array<{
        productId: {
          _id: mongoose.Types.ObjectId;
          name?: string;
          price?: number;
        };
        quantity: number;
      }>;
      timeStamp: Date;
    }> = await purchase
      .find({ status: "delivered" })
      .populate({
        path: "cart.productId",
        match: { seller: sellerId },
        select: "name quantity price",
      })
      .lean();

    const sellerSales = purchases.map((purchase) => {
      return purchase.cart
        .filter((item) => item.productId)
        .map((item) => ({
          productName: item.productId.name,
          price: item.productId.price
            ? item.productId.price * item.quantity * 0.9
            : 0,
          soldQuantity: item.quantity,
          month: purchase.timeStamp.getMonth() + 1,
          year: purchase.timeStamp.getFullYear(),
          day: purchase.timeStamp.getDate(),
        }));
    });

    const sellerRevenue = sellerSales.flat().filter((sale) => {
      if (productName) return sale.productName == productName;
      if (!isNaN(month) && !isNaN(year))
        return sale.month == month && sale.year == year;
      else if (!isNaN(month)) return sale.month == month;
      else if (!isNaN(year)) return sale.year == year;
      else return true;
    });

    return sellerRevenue;
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
          price?: number;
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
export async function getExternalSellerRevenue(
  externalSeller: string | null,
  month: number,
  year: number,
  productName: string
) {
  try {
    const purchases: Array<{
      cart: Array<{
        productId: {
          _id: mongoose.Types.ObjectId;
          name?: string;
          quantity?: number;
          price?: number;
        };
        quantity: number;
      }>;

      timeStamp: Date;
    }> = await purchase
      .find({ status: "delivered" })
      .populate({
        path: "cart.productId",
        match: externalSeller
          ? { externalseller: externalSeller }
          : { externalseller: { $ne: null } },
        select: "name quantity price externalseller",
      })
      .lean();
    const sellerSales = purchases.map((purchase) => {
      return purchase.cart
        .filter((item) => item.productId)
        .map((item) => ({
          productName: item.productId.name,
          price: item.productId.price
            ? item.productId.price * item.quantity
            : 0,
          soldQuantity: item.quantity,
          month: purchase.timeStamp.getMonth() + 1,
          year: purchase.timeStamp.getFullYear(),
          day: purchase.timeStamp.getDate(),
        }));
    });

    const sellerRevenue = sellerSales.flat().filter((sale) => {
      if (productName) return sale.productName == productName;
      if (!isNaN(month) && !isNaN(year))
        return sale.month == month && sale.year == year;
      else if (!isNaN(month)) return sale.month == month;
      else if (!isNaN(year)) return sale.year == year;
      else return true;
    });
    return sellerRevenue;
  } catch (error) {
    throw error;
  }
}
export async function cancelPurchase(purchaseId: string) {
  try {
    const product = await purchase.findById(purchaseId);
    if (!product) return null;
    if (product.status == PurchaseStatus.delivered) return null;
    product.status = PurchaseStatus.cancelled;
    return await product.save();
  } catch (error) {
    throw error;
  }
}

export async function DeliverPurchase(purchaseId: string) {
  try {
    const product = await purchase.findByIdAndUpdate(purchaseId, {
      status: PurchaseStatus.delivered,
    });
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addPurchase,
  getTouristPurchases,
  getSellerSales,
  getExternalSellerSales,
  // updateLoyaltyPoints,
  getPurchaseTotalAmount,
  cancelPurchase,
  DeliverPurchase,
  getSellerRevenue,
  getExternalSellerRevenue,
};
