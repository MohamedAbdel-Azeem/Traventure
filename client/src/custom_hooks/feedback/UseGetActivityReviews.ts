import { useCallback, useEffect, useState } from 'react';
import axios from "axios";


export const UseGetActivityReviews = (ActivityId: string) => {
    const [ActivityReviews, setActivityReviews] = useState(null);
    const [cloading, setcLoading] = useState(false);
    const [cerror, setcError] = useState<string | null>(null);
    const fetchActivityReviews = useCallback(async () => {
        setcLoading(true);
      try {

  
        const response = await axios.get(`/traventure/api/feedBack/showActivityReviews/${ActivityId}`);
        if (response.status === 200) {
            setActivityReviews(response.data);
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
        fetchActivityReviews();
    }, []);
    return { ActivityReviews, cloading, cerror, fetchActivityReviews };
  };
