import { useState, useEffect } from "react";
import axios from "axios";
import { ISeller } from "../routes/_app/seller_profile/ISeller";

export const useGetSeller = (username: string | undefined) => {
  const [user, setUser] = useState<ISeller | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    const url = `/traventure/api/seller/${username}`;
    const fetchSeller = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setUser(data);
      } catch (err) {
        setError("error getting seller");
      } finally {
        setLoading(false);
      }
    };
    fetchSeller();
  }, [username]);
  return { user, loading, error };
};


    export const updateSeller = async (body: object, username: string) => {
      const url = `/traventure/api/seller/update/${username}`;
      try {
        const { data } = await axios.patch(url, body);
        return data;
      } catch (err) {
        return "error Updating seller";
      }
    };
   
