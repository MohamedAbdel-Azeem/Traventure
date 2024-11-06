import { useCallback, useEffect, useState } from 'react';
import axios from "axios";


export const UseGetItineraryReviews = (touristUsername: string,tourGuideUserId:string) => {
    const [CanFeedback, setCanFeedback] = useState(null);
    const [cloading, setcLoading] = useState(false);
    const [cerror, setcError] = useState<string | null>(null);
    const fetchCanFeedback = useCallback(async () => {
        setcLoading(true);
      try {
        const body= {touristUsername,tourGuideUserId};
  
        const response = await axios.get(`/traventure/api/feedBack/canfeedback`, {data:body});
        if (response.status === 200) {
            setCanFeedback(response.data);
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
        fetchCanFeedback();
    }, []);
    return { CanFeedback, cloading, cerror, fetchCanFeedback };
  };
