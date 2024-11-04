import { useState } from "react";
import axios from "axios";

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
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { bookItinerary, data, loading, error };
};

export default useBookItinerary;