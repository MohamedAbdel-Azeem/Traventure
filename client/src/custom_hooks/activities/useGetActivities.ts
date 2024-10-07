import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Activity from './activity_interface';


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
export const useGetAllActivitiesID = (username:string ) => {
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
