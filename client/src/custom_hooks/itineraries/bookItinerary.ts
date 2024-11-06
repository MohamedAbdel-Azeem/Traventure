import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookItinerary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookItinerary= async (itinerary_id: string | undefined, tourist_username: string | undefined) => {
    const url1 = `/traventure/api/tourist/${tourist_username}`;
    const url = `/traventure/api/bookings/add`;
    setLoading(true); // Set loading to true when the request starts
    try {
        const response1 = await axios.get(url1);
        const tourist_id = response1.data._id;
        const response = await axios.post(url, {
            type:"itinerary",
            itinerary:itinerary_id,
            tourist:tourist_id
        });
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
      })
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