import { useCallback, useEffect, useState } from 'react';
import axios from "axios";


export const UseGetItineraryReviews = (ItineraryId: string) => {
    const [ItineraryReviews, setItineraryReviews] = useState(null);
    const [cloading, setcLoading] = useState(false);
    const [cerror, setcError] = useState<string | null>(null);
    const fetchItineraryReviews = useCallback(async () => {
        setcLoading(true);
        
      try {

  
        const response = await axios.get(`/traventure/api/feedBack/showItineraryReviews/${ItineraryId}`);
        
        if (response.status >= 200 && response.status < 300) {
            setItineraryReviews(response.data);
            
        } else {
            setcError("Error fetching data");
        }
      } catch (err) {
        setcError(err.message);
      } finally {
        setcLoading(false);
      }
    }, []);
    useEffect(() => {
        fetchItineraryReviews();
    }, []);
    return { ItineraryReviews, cloading, cerror, fetchItineraryReviews };
  };
