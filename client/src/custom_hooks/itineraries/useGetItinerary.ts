import { useEffect, useState } from "react";
import axios from "axios";
import Itinerary from "./itinerarySchema";

const useGetItinerary = (username: string | undefined) => {
  const [itinerary, setItinerary] = useState<Itinerary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchItinerary() {
      if (!username) return;
      setLoading(true);
      const response = await axios
        .get(`/traventure/api/itinerary/${username}`)
        .catch((err) => {
          setError(err.message);
        });
      if (response && response.status === 200) {
        setItinerary(response.data);
      } else {
        setError("Error fetching data");
      }
      setLoading(false);
    }
    fetchItinerary();
  }, [username]);
  return { itinerary, loading, error };
};

export default useGetItinerary;

export const useGetItineraryID = (id: string | undefined) => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItinerary() {
      if (!id) return;
      setLoading(true);
      try {
        const response = await axios.get(`/traventure/api/itinerary/get/${id}`);
        if (response.status === 200) {
          setItinerary(response.data);
        } else {
          setError("Error fetching data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchItinerary();
  }, [id]);

  return { itinerary, loading, error };
};
