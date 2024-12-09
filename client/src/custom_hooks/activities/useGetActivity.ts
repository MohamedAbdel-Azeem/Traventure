import axios from "axios";
import { useState, useEffect } from "react";
type CatStructure = {
  _id: string;
  name: string;
  __v: number;
};
interface Activity {
  Title: string;
  DateAndTime: Date;
  Location: {
    latitude: number;
    longitude: number;
  };
  Price: number;
  SpecialDiscount: number;
  Category: CatStructure;
  Tags: CatStructure[];
  BookingIsOpen: boolean;
}
export type Activityd = {
  _id: string;
  Title: string;
  DateAndTime: Date;
  Location: {
    latitude: number;
    longitude: number;
  };
  Price: number;
  SpecialDiscount: number;
  Category: CatStructure;
  Tags: CatStructure[];
  BookingIsOpen: boolean;
  added_By: string;
  feedback?: {
    name: string;
    rating: string;
    review: string;
  }[];
  inappropriate: boolean;
};

export const useGetActivityID = (id: string | undefined) => {
  const [activity, setActivity] = useState<Activityd | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      if (!id) return;
      setLoading(true);
      try {
        const response = await axios.get(`/traventure/api/activity/get/${id}`);
        if (response.status >= 200 && response.status < 300) {
          setActivity(response.data);
        } else {
          setError("Error fetching data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, [id]);

  return { activity, loading, error };
};

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
