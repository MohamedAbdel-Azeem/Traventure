import { useState } from "react";
import axios from "axios";

const useBookActivity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookActivity = async (activity_id: string | undefined, tourist_username: string | undefined) => {
    const url1 = `/traventure/api/tourist/${tourist_username}`;
    const url = `/traventure/api/bookings/add`;
    setLoading(true); // Set loading to true when the request starts
    try {
        const response1 = await axios.get(url1);
        const tourist_id = response1.data._id;
      const response = await axios.post(url, {
        type:"activity",
        activity:activity_id,
        tourist:tourist_id
      });
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { bookActivity, data, loading, error };
};

export default useBookActivity;