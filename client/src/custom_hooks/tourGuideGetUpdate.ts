import { useState, useEffect } from "react";
import axios from "axios";
import { ITourGuide } from "../routes/_app/tourguide_profile/ITourGuide";
import { uploadFileToStorage } from "../firebase/firebase_storage";

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
  isUpdate: boolean,
  file: File | null
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [response, setresponse] = useState<ITourGuide | null>(null);
  const url = `/traventure/api/tourGuide/update/${username}`;
  useEffect(() => {
    const updateTourGuide = async () => {
      try {
        if(file) {
          const firebaseurl = await uploadFileToStorage(file);
          (body as any).profilepic = firebaseurl;
        }
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
