import { useCallback, useEffect, useState } from "react";
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
        } else {
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
        } else {
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

export const useGetAllActivitiesS = () => {
  const [sactivities, setActivities] = useState<Activity[] | null>(null);
  const [aloading, setgLoading] = useState(false);
  const [aerror, setgError] = useState<string | null>(null);
  const fetchActivities = useCallback(async () => {
    setgLoading(true);
    try {
      const response = await axios.get("/traventure/api/activity/");
      if (response.status === 200) {
        setActivities(response.data);
      } else {
        setgError("Error fetching data");
      }
    } catch (err) {
      setgError(err.message);
    } finally {
      setgLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchActivities();
  }, []);
  return { sactivities, aloading, aerror, fetchActivities };
};

export const useGetAllActivitiesID = (username: string) => {
  const [sactivities, setActivities] = useState<Activity[] | null>(null);
  const [aloading, setgLoading] = useState(false);
  const [aerror, setgError] = useState<string | null>(null);
  const fetchActivities = useCallback(async () => {
    setgLoading(true);
    try {
      const response = await axios.get(`/traventure/api/activity/${username}`);
      if (response.status === 200) {
        setActivities(response.data);
      } else {
        setgError("Error fetching data");
      }
    } catch (err) {
      setgError(err.message);
    } finally {
      setgLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchActivities();
  }, []);
  return { sactivities, aloading, aerror, fetchActivities };
};
