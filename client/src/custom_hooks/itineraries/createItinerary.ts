import { useState, useEffect } from 'react';
import axios from 'axios';

interface Itinerary {
    id: number;
    name: string;
    description: string;
    // Add other fields as necessary
}

const useCreateItinerary = (itineraryData: any) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const createItinerary = async () => {
            setLoading(true);
            try {
                const res = await axios.post('/traventure/api/itinerary/add', itineraryData);
                setResponse(res.data);
            } catch (err:any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (itineraryData) {
            createItinerary();
        }
    }, [itineraryData]);

    return { response, error, loading };
};

export default useCreateItinerary;