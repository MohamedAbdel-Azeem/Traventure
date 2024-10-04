import axios from "axios";
import { useEffect, useState } from "react";
import  Place  from "./place_interface";

const useGetPlace = () => {
    const [places, setPlaces] = useState<Place | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        async function fetchPlaces() {
            setLoading(true);
            const response = await axios.get("traventure/api/place")
            .catch((err) => {
                setError(err);
            });
            if (response && response.status === 200) {
                setPlaces(response.data);
            } else {
                setError("Error fetching data");
            }
            setLoading(false);
        }
        fetchPlaces();
    }, []);
    return { places, loading, error };
};

export default useGetPlace;