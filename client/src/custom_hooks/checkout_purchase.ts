import axios from "axios";

interface IcheckoutPurchase {
  touristUsername: string;
  cart: { product_id: string; quantity: number }[];
  promoCode?: string;
  paymentMethod: string;
  address: string;
}

// returns boolean success
export const checkoutPurchase = async (body: IcheckoutPurchase) => {
  try {
    const response = await axios.post("/traventure/api/purchase/buy", body);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
