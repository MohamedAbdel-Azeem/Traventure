import { useEffect, useState } from "react";
import axios from "axios";
import Activity from "./activity_interface";

export const useGetActivities = (id: string | undefined) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/traventure/api/activity/${id}`);
        setActivities(response.data);
        if (response.data.length === 0) {
          console.log("No activities found");
        } else {
          console.log("Activities found", response.data);
        }
        setError(null);
      } catch (error: any) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { activities, loading, error };
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
        if (response.data.length === 0) {
          console.log("No activities found");
        } else {
          console.log("Activities found", response.data);
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
