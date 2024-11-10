import { useState, useEffect } from "react";
import axios from "axios";
import { uploadFileToStorage } from "../../firebase/firebase_storage";

interface MyICCRUDP {
  main_Picture?: object;
  title: string;
  description: string;
  added_By: string;
  price: number;
  starting_Date: string;
  ending_Date: string;
  rating: number;
  total: number;
  language: string;
  selectedTags?: string[];
  pickup_location: {
    latitude: number;
    longitude: number;
  };
  dropoff_location: {
    latitude: number;
    longitude: number;
  };
  plan: {
    place?: string;
    activities: {
      activity_id?: string;
      activity_duration: number;
      time_unit: string;
    }[];
  }[];
  accesibility: boolean;
}

const useCreateItinerary = (itineraryData: any) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createItinerary = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          "/traventure/api/itinerary/add",
          itineraryData
        );
        setResponse(res.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (itineraryData) {
      createItinerary();
    }
  }, [itineraryData]);

  return { response, error, loading };
};

export default useCreateItinerary;

export const UseCreateItineraryforME = async (itineraryData: MyICCRUDP) => {
  try {
    itineraryData = {
      ...itineraryData,
      main_Picture: await uploadFileToStorage(itineraryData.main_Picture),
    };
  } catch (err) {
    return "error";
  }

  try {
    const res = await axios.post(
      "/traventure/api/itinerary/add",
      itineraryData
    );
    return "success";
  } catch (err) {
    return "error";
  }
};
