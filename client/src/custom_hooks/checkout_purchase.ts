import axios from "axios";

interface IcheckoutPurchase {
  touristUsername: string;
  cart: { productId: string; quantity: number }[];
  promoCode?: string;
  paymentMethod: string;
  address: string;
}

// returns boolean success
export const checkoutPurchase = async (body: IcheckoutPurchase) => {
  try {
    const response = await axios.post("/traventure/api/purchase/buy", body);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
