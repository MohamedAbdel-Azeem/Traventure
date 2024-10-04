import { useState, useEffect } from "react";
import axios from "axios";

function useLoginGuest(body: object | null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (body === null) return;
    const url = `traventure/api/login`;
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await axios.post(url, body);
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          console.log(response.data);
        } else {
          throw new Error("Server can't be reached!");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [body]);
  return { data, loading, error };
}

export default useLoginGuest;
