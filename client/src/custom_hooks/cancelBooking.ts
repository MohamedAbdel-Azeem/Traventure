import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';

  

    export const cancelBookings = () => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        
        const cancelBooking = async (booking_id: string|undefined) => {
            try {
                const response = await axios.delete(`/traventure/api/bookings/cancel/${booking_id}`); 
                setData(response.data);
                Swal.fire({
                    title: "Booking Cancelled",
                    text: "Your booking has been cancelled successfully",
                    icon: "success",
                  })
                }
               
            catch (error: any) {
                let errorMessage = "An error occurred";
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                setError(errorMessage);
                Swal.fire({
                    title: "Cancellation Failed",
                    text: errorMessage,
                    icon: "error",
                });
            }
              finally {
                setLoading(false);
              }
     
    } 
  

    return { cancelBooking,error};
}
    
    




export default cancelBookings ;