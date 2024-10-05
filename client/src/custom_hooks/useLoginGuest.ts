import { useState, useEffect } from "react";
import axios from "axios";


function useLoginGuest(body: object | null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (body === null) return;
    const url = `traventure/api/login`;
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await axios.post(url,body);
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
        } else if (response.status >= 400 && response.status < 500) {
          throw new Error(response.data);
        } else {
          throw new Error("Server can't be reached!");
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.data) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [body]);
  return { data, loading, err:error };
}

export default useLoginGuest;

