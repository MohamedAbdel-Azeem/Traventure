import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import {IHotelBooking} from '../routes/_app/Tourist/tourist_bookings/Bookings';


export const getHotels = (touristusername: string | undefined) => {
    const [hotelsdata, setHotelsData] = useState<IHotelBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Define the fetch function, which can be reused
    const fetchHotels = useCallback(async () => {
        setLoading(true);
        setError(null);  // Clear previous errors
        try {
            const response = await axios.get(`/traventure/api/bookings/getHotels/${touristusername}`);
            setHotelsData(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [touristusername]);

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchHotels();
    }, [fetchHotels]);

    // Return the fetched data, loading state, error state, and the refetch function
    return { hotelsdata, loading, error, hotelsget: fetchHotels };
};

export default getHotels;