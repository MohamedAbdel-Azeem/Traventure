import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';

  

    export const cancelBookings = () => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        const fetchTouristWallet = async (username:string|undefined) => {
            try {
                const response = await axios.get(`/traventure/api/tourist/${username}`);
                return response.data;
            } catch (error: any) {
                throw new Error('Failed to fetch tourist wallet');
            }
        };
        
        const cancelBooking = async (booking_id: string|undefined,username:string|undefined) => {
            try {
                const response = await axios.delete(`/traventure/api/bookings/cancel/${booking_id}`); 
                setData(response.data);
                Swal.fire({
                    title: "Booking Cancelled",
                    text: "Your booking has been cancelled successfully",
                    icon: "success",
                  }).then(async () => {
                    try {
                        const walletData = await fetchTouristWallet(username);
                        Swal.fire({
                            title: "Wallet",
                            html: `<p><strong>Booking Value Refunded:</strong> ${response.data.price}$</p><p>Your current wallet balance is ${walletData.wallet.toFixed(2)}</p>`,
                            icon: "info",
                        });
                    } catch (error) {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to fetch tourist wallet",
                            icon: "error",
                        });
                    }
                });
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