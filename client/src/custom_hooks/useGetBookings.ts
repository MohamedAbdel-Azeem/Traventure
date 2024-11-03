import { useEffect, useState } from 'react';
import axios from "axios";
type Booking ={
    _id: string,
    type: string,
    itinerary?:string,
    activity?:string,
    tourist: string
}
export function useGetBookings(username:string) {
    const [bookingdata, setbookingData] = useState<Booking[]|null>(null);
    const [bookingloading, setbookingLoading] = useState(true);
    const [bookingerror, setbookingError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setbookingLoading(true);
            setbookingError(null);
            try {
                const response = await axios.get(`/traventure/api/tourist/bookings/${username}`);
                if (response.status >= 200 && response.status < 300) {
                    setbookingData(response.data);
                }
                else {
                    throw new Error("Server can't be reached!");
                }
            }
            catch (error : any) {
                setbookingError(error.message);
            }
            finally {
                setbookingLoading(false);
            }
        };
        fetchData();
    }, []);
    return {bookingdata, bookingloading, bookingerror };
}