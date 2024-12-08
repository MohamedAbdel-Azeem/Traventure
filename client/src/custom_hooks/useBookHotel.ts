import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookHotel = () => {
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

  const bookHotel = async (hotel: any, tourist_username: string,promoCode: string,paymentMethod: string) => {
    const url1 = `/traventure/api/tourist/${tourist_username}`;
    const url = `/traventure/api/bookings/addHotel/${tourist_username}`;
    setLoading(true); // Set loading to true when the request starts
    try {
      const response1 = await axios.get(url1);
      const tourist_id = response1.data._id;
      const response = await axios.post(url, {
        hotelName: hotel.hotel?.name,
        checkInDate: hotel.offers?.[0]?.checkInDate,
        checkOutDate: hotel.offers?.[0]?.checkOutDate,
        ...(hotel.offers?.[0]?.room?.typeEstimated?.bedType && {
          bedType: hotel.offers?.[0]?.room?.typeEstimated?.bedType,
        }),
        ...(hotel.offers?.[0]?.room?.typeEstimated?.category && {
          roomType: hotel.offers?.[0]?.room?.typeEstimated?.category,
        }),
        ...(hotel.offers?.[0]?.room?.typeEstimated?.beds && {
          numberOfBeds: hotel.offers?.[0]?.room?.typeEstimated?.beds,
        }),
        totalPrice: hotel.offers?.[0]?.price?.total
          ? (parseFloat(hotel.offers[0].price.total) * 50).toFixed(2)
          : null,
        booked_by: tourist_id,
        promoCode: promoCode,
        paymentMethod: paymentMethod,
      });

      setData(response.data);
      Swal.fire({
        icon: "success",
        title: "Hotel Booked Successfully!",
        text: "You have successfully booked the hotel.",
      }).then(async () => {
        if (paymentMethod === "wallet") {
          try{
          const walletData= await fetchTouristWallet(tourist_username);
          Swal.fire({
            title: "Payment Successful",
            html: `<p><strong>Booking Value :</strong> ${response.data.totalPrice}$</p><p>Your current wallet balance is ${walletData.wallet.toFixed(2)}</p>`,
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
    
    } 
    catch (error: any) {
      console.error(error);
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: "An error occurred while booking the hotel.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { bookHotel, data, loading, error };
};

export default useBookHotel;
