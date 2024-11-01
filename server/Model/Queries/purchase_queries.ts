import purchase from "../../Model/Schemas/purchase";

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

export async function getProductPurchases(productId: string) {
  try {
    return await purchase.find({ productId }).populate("touristId");
  } catch (error) {
    throw error;
  }
}

module.exports = { addPurchase, getTouristPurchases, getProductPurchases };
