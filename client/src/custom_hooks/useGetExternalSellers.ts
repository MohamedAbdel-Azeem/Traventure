import { useState, useEffect } from "react";
import axios from "axios";

export const useGetExternalSellers = () => {
  const [externalSellers, setSellers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `/traventure/api/admin/externalSellers`;
    const fetchSellers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setSellers(data);
      } catch (err) {
        setError("error getting sellers");
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, []);
  return { externalSellers, loading, error };
};
