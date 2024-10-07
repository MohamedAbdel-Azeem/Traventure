import { useState } from "react";
import axios from "axios";

const useDeleteActivity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteActivity = async (id: string | undefined) => {
    const url = `/traventure/api/activity/delete/${id}`;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(url);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteActivity, data, loading, error };
};

export default useDeleteActivity;