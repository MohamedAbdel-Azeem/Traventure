import { useState, useEffect } from "react";
import axios from "axios";

export function useGetTouristPurchases(username: string | undefined) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username === undefined) {
      return;
    }
    axios
      .get(`/traventure/api/purchase/tourist/${username}`)
      .then((res) => {
        setPurchases(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        console.log("purchases", purchases);
        setLoading(false);
      });
  }, [username]);

  return { purchases, loading, error };
}
