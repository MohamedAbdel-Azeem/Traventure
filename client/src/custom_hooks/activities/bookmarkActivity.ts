import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookmarkActivity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookmarkActivity= async (currentuser:string|undefined , activity_id:string) => {
    setLoading(true); // Set loading to true when the request starts
    try {
        const response = await axios.patch(`/traventure/api/tourist/bookmark_activity/${currentuser}`, {
            activity_id: activity_id,
          });
        setData(response.data);
    } catch (error: any) {
      setError(error.message);
      
    } finally {
      setLoading(false);
    }
  };

  return { bookmarkActivity, data, loading, error };
};

export default useBookmarkActivity;