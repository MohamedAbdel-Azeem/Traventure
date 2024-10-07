import axios from "axios";
import { useState, useEffect } from "react";
type CatStructure = {
    _id: string;
    name: string;
    __v: number;
  }
interface Activity {
    Title: string;
    DateAndTime: Date;
    Location: {
      latitude: number,
      longitude: number,
  },
    Price: number; 
    SpecialDiscount: number; 
    Category: CatStructure; 
    Tags: CatStructure[]; 
    BookingIsOpen: boolean; 
}

export const useGetAllActivities = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/traventure/api/activity/`);
          setActivities(response.data);
          if (response.data.length === 0) {
            console.log('No activities found');
          } else {
            console.log('Activities found', response.data);
          }
          setError(null);
        } catch (error: any) {
          setError(error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      };
  
        fetchData();
    }, []);
  
    return { activities, loading, error };
  };