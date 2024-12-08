import { useEffect, useState } from "react";
import axios from "axios";
import { TouristProfileData } from "../../routes/_app/Tourist/tourist_profile/tourist_profile_data";
import Place from "../places/place_interface";


interface TagStructure {
  _id: string;
  name: string;
  __v: number;
}

interface Itinerary {
  _id: string;
  main_Picture?: string;
  title: string;
  description: string;
  added_By: {
    profilepic: string;
    username: string;
  };
  price: number;
  starting_Date: Date;
  ending_Date: Date;
  rating: number;
  total: number;
  language: string;
  selectedTags?: TagStructure[];
  pickup_location: { longitude: number; latitude: number };
  dropoff_location: { longitude: number; latitude: number };
  plan: {
    place: Place;
    activities: {
      _id: string;
      activity_id?: SActivity;
      activity_duration: number;
      time_unit: string;
    }[];
  }[];
  booked_By: {
    user_id?: TouristProfileData;
  }[];
  accessibility: boolean;
}

interface SActivity {
  activity_id?: string;
  time_unit?: string;
  activity_duration?: number;
  _id?: string;
  Title?: string;
  DateAndTime: Date;
  Location: {
    latitude: number;
    longitude: number;
  };
  Price: number;
  SpecialDiscount: number;
  Category: string;
  Tags: TagStructure[];
  BookingIsOpen: boolean;
  added_By?: string;
}


const useGetItinerary = (username: string | undefined) => {
  const [itinerary, setItinerary] = useState<Itinerary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchItinerary() {
      if (!username) return;
      setLoading(true);
      const response = await axios
        .get(`/traventure/api/itinerary/${username}`)
        .catch((err) => {
          setError(err.message);
        });
      if (response && response.status === 200) {
        setItinerary(response.data);
      } else {
        setError("Error fetching data");
      }
      setLoading(false);
    }
    fetchItinerary();
  }, [username]);
  return { itinerary, loading, error };
};

export default useGetItinerary;

export const useGetItineraryID = (id: string | undefined) => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItinerary() {
      if (!id) return;
      setLoading(true);
      try {
        const response = await axios.get(`/traventure/api/itinerary/get/${id}`);
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data, "LIFE IS PAIN");
          setItinerary(response.data);
        } else {
          setError("Error fetching data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchItinerary();
  }, [id]);

  return { itinerary, loading, error };
};
