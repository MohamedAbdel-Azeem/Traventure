import { useEffect, useState } from "react";
import axios from "axios";
import Itinerary from "./itinerarySchema";

const useGetItinerary = (id: string) => {
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchItinerary() {
            setLoading(true);
            const response = await axios.get(`traventure/api/itinerary/${id}`)
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
    }, [id]);

    return { itinerary, loading, error };
};

export default useGetItinerary;