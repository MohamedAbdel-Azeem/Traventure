import { useState, useEffect } from "react";
import axios from "axios";

export const useGetSellerSales = (
  id: string | undefined,
  compactView: boolean
) => {
  const [sales, setSales] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const url = `/traventure/api/purchase/seller`;
    const fetchSales = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url, {
          params: {
            sellerId: id,
            compactView: compactView,
          },
        });
        setSales(data);
      } catch (err) {
        setError("error getting seller sales");
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [id, compactView]);
  return { sales, loading, error };
};
