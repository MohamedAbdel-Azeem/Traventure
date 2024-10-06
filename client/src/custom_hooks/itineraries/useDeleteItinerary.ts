import { useState } from "react";
import axios from "axios";

const useDeleteItinerary = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const deleteItinerary = async (id: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axios.delete(`/traventure/api/itinerary/delete/${id}`);
            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError("Failed to delete itinerary.");
            }
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    return { deleteItinerary, loading, error, success };
};

export default useDeleteItinerary;
