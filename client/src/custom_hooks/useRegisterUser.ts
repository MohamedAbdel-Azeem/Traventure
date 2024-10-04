import { useState, useEffect } from "react";
import axios from "axios";

function useRegisterUser(body: object | null, role: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (role === null) return;
      if (body === null) return;
      const url = `traventure/api/${role}/add`;
      console.log(body);
      setLoading(true);
      setError(null);
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
  }, [body, role]);
  return { data, loading, error };
}

export default useRegisterUser;
