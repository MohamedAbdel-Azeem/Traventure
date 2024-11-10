import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import {IFlightBooking} from '../components/Bookings';


export const getFlights = (touristusername: string | undefined) => {
    const [flightsdata, setFlightsData] = useState<IFlightBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Define the fetch function, which can be reused
    const fetchFlights = useCallback(async () => {
        setLoading(true);
        setError(null);  // Clear previous errors
        try {
            const response = await axios.get(`/traventure/api/bookings/getFlights/${touristusername}`);
            setFlightsData(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [touristusername]);

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchFlights();
    }, [fetchFlights]);

    // Return the fetched data, loading state, error state, and the refetch function
    return { flightsdata, loading, error, flightsget: fetchFlights };
};

export default getFlights;