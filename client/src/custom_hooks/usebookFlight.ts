import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookFlight = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return 0;

    const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
    const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;

    return hours * 60 + minutes;
  }

  

  function removePTPrefix(duration: string): string {
    return duration.replace(/^PT/, "");
  }

  const fetchTouristWallet = async (username:string|undefined) => {
    try {
        const response = await axios.get(`/traventure/api/tourist/${username}`);
        return response.data;
    } catch (error: any) {
        throw new Error('Failed to fetch tourist wallet');
    }
};

  const bookFlight = async (
    flight: any,
    transportationNeeded: boolean,
    tourist_username: string,
    promoCode: string,
    paymentMethod: string
  ) => {
    const url1 = `/traventure/api/tourist/${tourist_username}`;
    const url = `/traventure/api/bookings/addFlight/${tourist_username}`;
    setLoading(true); // Set loading to true when the request starts
    try {
      const response1 = await axios.get(url1);
      const tourist_id = response1.data._id;
      const response = await axios.post(url, {
        departureCity: flight.itineraries[0].segments[0].departure.iataCode,
        departureTime: flight.itineraries[0].segments[0].arrival.at,
        arrivalCity: flight.itineraries[0].segments[0].arrival.iataCode,
        carrierName: flight.itineraries[0].segments[0].carrierCode,
        flightDuration: removePTPrefix(
          flight.itineraries[0].segments[0].duration
        ),
        totalPrice: parseFloat(flight.price.total) * 50,
        bagsWeight:
          flight.travelerPricings[0].fareDetailsBySegment[0]
            ?.includedCheckedBags?.weight || null,
        flightClass: flight.travelerPricings[0].fareDetailsBySegment[0].cabin,
        flightNumber: parseFloat(flight.itineraries[0].segments[0].number),
        booked_by: tourist_id,
        transportation: transportationNeeded,
        promoCode: promoCode,
        paymentMethod: paymentMethod,
      });

      setData(response.data);
      Swal.fire({
        icon: "success",
        title: "Flight Booked Successfully!",
        text: "You have successfully booked the flight.",
      }).then(async () => {
        if (paymentMethod === "wallet") {
          try{
          const walletData= await fetchTouristWallet(tourist_username);
          Swal.fire({
            title: "Payment Successful",
            html: `<p><strong>Booking Value :</strong> ${response.data.totalPrice}$</p><p>Your current wallet balance is ${walletData.wallet.toFixed(2)}</p>`,
            icon: "info",
          });
        }
        catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to fetch tourist wallet",
            icon: "error",
          });
        }
      }
      });
    
    } 
     catch (error: any) {
      console.log(error);
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: "An error occurred while booking the flight.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { bookFlight, data, loading, error };
};

export default useBookFlight;
