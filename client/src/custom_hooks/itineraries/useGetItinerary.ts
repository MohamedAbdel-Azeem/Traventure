import { useEffect, useState } from "react";
import axios from "axios";
import Itinerary from "./itinerarySchema";

const useGetItinerary = (username: string | undefined) => {
  const [itinerary, setItinerary] = useState<Itinerary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(username);
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
