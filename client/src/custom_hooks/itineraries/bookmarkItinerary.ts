import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookmarkItinerary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookmarkItinerary= async (currentuser:string|undefined , itinerary_id:string) => {
    setLoading(true); // Set loading to true when the request starts
    try {
        const response = await axios.patch(`/traventure/api/tourist/bookmark_itinerary/${currentuser}`, {
            itinerary_id: itinerary_id,
          });
        setData(response.data);
    } catch (error: any) {
      setError(error.message);
      
    } finally {
      setLoading(false);
    }
  };

  return { bookmarkItinerary, data, loading, error };
};

export default useBookmarkItinerary;