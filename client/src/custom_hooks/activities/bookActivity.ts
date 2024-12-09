import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookActivity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTouristWallet = async (username:string|undefined) => {
    try {
        const response = await axios.get(`/traventure/api/tourist/${username}`);
        return response.data;
    } catch (error: any) {
        throw new Error('Failed to fetch tourist wallet');
    }
};

  const bookActivity = async (activity_id: string | undefined, tourist_username: string | undefined,price:Number,discount:Number,promoCode:string,paymentMethod:string) => {
    const url1 = `/traventure/api/tourist/${tourist_username}`;
    const url = `/traventure/api/bookings/add`;
    setLoading(true); // Set loading to true when the request starts
    try {
        const response1 = await axios.get(url1);
        const tourist_id = response1.data._id;
        const validPrice = typeof price === 'number' ? price : 0;
        const validDiscount = typeof discount === 'number' ? discount : 0;
      const response = await axios.post(url, {
        type:"activity",
        activity:activity_id,
        tourist:tourist_id,
        price:validPrice-validDiscount,
        promoCode:promoCode,
        paymentMethod:paymentMethod
      });
      setData(response.data);
      Swal.fire({
        title: "Booking Successful",
        text: "Your booking has been added successfully",
        icon: "success",
      }).then(async () => {
        if (paymentMethod === "wallet") {
          try{
          const walletData= await fetchTouristWallet(tourist_username);
          Swal.fire({
            title: "Payment Successful",
            html: `<p><strong>Booking Value :</strong> ${response.data.price}$</p><p>Your current wallet balance is ${walletData.wallet}</p>`,
            icon: "info",
          });
        }
        catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to fetch tourist wallet",
            icon: "error",
          });
        }
      }
      });
    
    } catch (error: any) {
      setError(error.message);
      Swal.fire({
        title: "Booking Failed",
        text: error.response?.data?.message || "An error occurred",
        icon: "error",
    });
    } finally {
      setLoading(false);
    }
  };

  return { bookActivity, data, loading, error };
};

export default useBookActivity;