import { useEffect, useState } from "react";
import { upcoming } from "./upcomingSchema";
import axios from "axios";

const useGetUpcoming = () => {
    const [upcoming, setItinerary] = useState<upcoming | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchItinerary() {
            setLoading(true);
            const response = await axios.get(`traventure/api/tourist/getAll`)
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
    });

    return { upcoming, loading, error };
};

export default useGetUpcoming;