import path from "path";
import purchase, { IPurchase } from "../../Model/Schemas/purchase";
import mongoose, { model } from "mongoose";
import touristModel from "../Schemas/Tourist";
import ProductModel, { IProduct } from "../Schemas/Product";
import { ObjectId } from "mongoose"; 


export async function addPurchase(purchaseData: object) {
  try {
    return await purchase.create(purchaseData);
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

//TODO : still not tested
export async function getPurchaseTotalAmount(purchaseData: IPurchase){
  
  try {

    const cart=purchaseData.cart;
    var totalAmount=0;
    for (const purchased_product of cart) {
      const product = await getProduct(purchased_product.productId.toString());
      if (product) {
        totalAmount += product.price * purchased_product.quantity;
      }
    }
    // cart.forEach(purchased_product => {
    //   const product= async () =>{
    //     try{
    //       await ProductModel.findById(purchased_product.productId);
    //     }catch(error){
    //       throw error;
    //     }
    //   }
      
    //   if(product){
    //     totalAmount+=product.price*purchased_product.quantity;

    //   }


    // });
    return totalAmount;
  } catch (error) {
    throw error;
  }
}


export async function updateLoyaltyPoints(touristId:string, amount:number){
  try {
    const tourist = await touristModel.findById(touristId);
    if (!tourist) return null;
    var points=0;
    switch(tourist.loyaltyLevel){
      case 1: points=amount*0.5; break;
      case 2: points=amount; break; 
      case 3: points=amount*1.5; break;
    }
    tourist.currentLoyaltyPoints += points;
    tourist.totalLoyaltyPoints += points;

    if(tourist.totalLoyaltyPoints>=500000){
      tourist.loyaltyLevel=3;
    }
    else if(tourist.totalLoyaltyPoints>=100000){
      tourist.loyaltyLevel=2;
    }
    else {
      tourist.loyaltyLevel=1;
    }
    await tourist.save();
  } catch (error) {
    throw error;
  }
}

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
  updateLoyaltyPoints,
  getPurchaseTotalAmount
};
