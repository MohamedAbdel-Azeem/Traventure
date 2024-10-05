import { useState, useEffect } from "react";
import axios from "axios";
import { ITourGuide } from "../routes/_app/tourguide_profile/ITourGuide";

export const useGetTourGuide = (username: string | undefined) => {
  const [user, setUser] = useState<ITourGuide | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    const url = `/traventure/api/tourGuide/${username}`;
    const fetchTourGuide = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTourGuide();
  }, [username]);
  return { user, loading, error };
};

export function useUpdateTourGuide(
  body: object,
  username: string | undefined,
  isUpdate: boolean
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [response, setresponse] = useState<ITourGuide | null>(null);
  const url = `/traventure/api/tourGuide/update/${username}`;
  useEffect(() => {
    const updateTourGuide = async () => {
      try {
        const { data } = await axios.patch(url, body);
        setresponse(data);
      } catch (err) {
        setError("error Updating Tour Guide");
      } finally {
        setLoading(false);
      }
    };
    if (username && body && isUpdate) updateTourGuide();
  }, [body, username, isUpdate]);
  return { response, loading, error };
}
