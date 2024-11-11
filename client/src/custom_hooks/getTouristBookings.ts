import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import {IBooking} from '../routes/_app/Tourist/tourist_bookings/Bookings';


export const getBookings = (touristusername: string | undefined) => {
    const [data, setData] = useState<IBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Define the fetch function, which can be reused
    const fetchBookings = useCallback(async () => {
        setLoading(true);
        setError(null);  // Clear previous errors
        try {
            const response = await axios.get(`/traventure/api/bookings/${touristusername}`);
            setData(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [touristusername]);

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    // Return the fetched data, loading state, error state, and the refetch function
    return { data, loading, error, refetch: fetchBookings };
};

export default getBookings;
