import { useCallback, useEffect, useState } from 'react';
import axios from "axios";


export const UseGetTourGuideReviews = (tourGuideId: string) => {
    const [TourGuideReviews, setTourGuideReviews] = useState(null);
    const [cloading, setcLoading] = useState(false);
    const [cerror, setcError] = useState<string | null>(null);
    const fetchTourGuideReviews = useCallback(async () => {
        setcLoading(true);
      try {

  
        const response = await axios.get(`/traventure/api/feedBack/showTourGuideReviews/${tourGuideId}`);
        if (response.status >= 200 && response.status < 300) {
            setTourGuideReviews(response.data);
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
        fetchTourGuideReviews();
    }, []);
    return { TourGuideReviews, cloading, cerror, fetchTourGuideReviews };
  };
