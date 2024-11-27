import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useBookActivity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookActivity = async (activity_id: string | undefined, tourist_username: string | undefined,price:Number,discount:Number) => {
    const url1 = `/traventure/api/tourist/${tourist_username}`;
    const url = `/traventure/api/bookings/add`;
    setLoading(true); // Set loading to true when the request starts
    try {
        const response1 = await axios.get(url1);
        const tourist_id = response1.data._id;
        const validPrice = typeof price === 'number' ? price : 0;
        const validDiscount = typeof discount === 'number' ? discount : 0;
      const response = await axios.post(url, {
        type:"activity",
        activity:activity_id,
        tourist:tourist_id,
        price:validPrice-validDiscount
      });
      setData(response.data);
      Swal.fire({
        title: "Booking Successful",
        text: "Your booking has been added successfully",
        icon: "success",
      })
    
    } catch (error: any) {
      setError(error.message);
      Swal.fire({
        title: "Booking Failed",
        text: error.response?.data?.message || "An error occurred",
        icon: "error",
    });
    } finally {
      setLoading(false);
    }
  };

  return { bookActivity, data, loading, error };
};

export default useBookActivity;