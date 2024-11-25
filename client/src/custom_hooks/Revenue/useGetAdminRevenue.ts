import { useState, useEffect } from "react";
import axios from "axios";
interface Revenue {
  activityRevenues: activityRevenue[];
  itineraryRevenues: itineraryRevenue[];
}
interface activityRevenue {
  year: number;
  month: number;
  day: number;
  revenue: number;
}
interface itineraryRevenue {
  year: number;
  month: number;
  day: number;
  revenue: number;
}
export const useGetAdminRevenue = () => {
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `/traventure/api/admin/revenues`;
    const fetchRevenue = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setRevenue(data);
      } catch (err) {
        setError("error getting admin revenue");
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);
  return { revenue, loading, error };
};
