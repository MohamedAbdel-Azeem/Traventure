import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookItinerary = () => {
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

  const bookItinerary= async (itinerary_id: string | undefined, tourist_username: string | undefined,order_price:number,promoCode:string,paymentMethod:string) => {
    const url1 = `/traventure/api/tourist/${tourist_username}`;
    const url = `/traventure/api/bookings/add`;
    setLoading(true); // Set loading to true when the request starts
    try {
        const response1 = await axios.get(url1);
        const tourist_id = response1.data._id;
        const response = await axios.post(url, {
            type:"itinerary",
            itinerary:itinerary_id,
            tourist:tourist_id,
            price:order_price,
            promoCode:promoCode,
            paymentMethod:paymentMethod});
            
        if (response.status === 201 ){
            const getItinerary = await axios.get(`/traventure/api/itinerary/get/${itinerary_id}`);
            const Bookings= getItinerary.data.booked_By;
            Bookings.push({user_id:tourist_id});
            await axios.patch(`/traventure/api/itinerary/update/${itinerary_id}`,{
                booked_By:Bookings});}
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

  return { bookItinerary, data, loading, error };
};

export default useBookItinerary;