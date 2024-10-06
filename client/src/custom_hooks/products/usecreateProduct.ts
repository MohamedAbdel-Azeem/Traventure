import axios from "axios";
import { useEffect, useState } from "react";

export function useCreateProduct(body: object | null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        if (body === null) return;
        console.log(body);
        setLoading(true);
        setError(null);
        try {
          const response = await axios.post("/traventure/api/product/add", body);
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
  };