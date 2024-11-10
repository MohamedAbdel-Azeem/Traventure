import { useState, useEffect } from "react";
import axios from "axios";
import { IAdvertiser } from "../routes/_app/advertiser_profile/IAdvertiser";

export const useGetAdvertiser = (username: string | undefined) => {
  const [user, setUser] = useState<IAdvertiser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    const url = `/traventure/api/advertiser/${username}`;
    const fetchAdvertiser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setUser(data);
      } catch (err) {
        setError("erro getting advertiser");
      } finally {
        setLoading(false);
      }
    };
    fetchAdvertiser();
  }, [username]);
  return { user, loading, error };
};


  
        export const updateAdvertiser = async (body: object, username: string) => {
          const url = `/traventure/api/advertiser/update/${username}`;
        try {
            const { data } = await axios.patch(url, body);
            return data;
        } catch (err) {
            return "error updating advertiser";
        } 
        };
     
