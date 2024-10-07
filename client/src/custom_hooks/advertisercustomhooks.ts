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

export function useUpdateAdvertiser(body: object, username: string) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [response, setresponse] = useState<IAdvertiser | null>(null);
    const url = `/traventure/api/advertiser/update/${username}`;
    useEffect(() => {
        const updateAdvertiser = async () => {
        try {
            const { data } = await axios.patch(url, body);
            setresponse(data);
        } catch (err) {
            setError("erro getting advertiser");
        } finally {
            setLoading(false);
        }
        };
        if (username && body) updateAdvertiser();
    }, [body, username]);
    return { response, loading, error };
}
