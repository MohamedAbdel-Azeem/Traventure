import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookHotel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookHotel = async (hotel: any, tourist_username: string) => {
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
      });

      setData(response.data);

      return response.data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { bookHotel, data, loading, error };
};

export default useBookHotel;
