import { useState, useEffect } from "react";
import axios from "axios";
import { ITourGuide } from "../routes/_app/TourGuide/tourguide_profile/ITourGuide";
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


   export  const UpdateTourGuide = async (  body: object,
      username: string | undefined,
      file: File | null) => {
      const url = `/traventure/api/tourGuide/update/${username}`;
      try {
        if(file) {
          const firebaseurl = await uploadFileToStorage(file);
          (body as any).profilepic = firebaseurl;
        }
        const { data } = await axios.patch(url, body);
        return data;
      } catch (err) {
       return "error Updating Tour Guide" ;
      } 
    };

