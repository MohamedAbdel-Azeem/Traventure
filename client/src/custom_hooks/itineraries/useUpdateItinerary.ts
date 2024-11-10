import { useEffect, useState } from "react";
import axios from "axios";
import Itinerary from "./itinerarySchema";

const cleanData = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj
      .map(cleanData)
      .filter((item) => item !== null && item !== undefined && item !== "");
  } else if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        acc[key] = cleanData(value);
      }
      return acc;
    }, {} as any);
  }
  return obj;
};
export const useUpdateItinerary = (
  itineraryData: any,
  id: string | undefined
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateItinerary = async () => {
      setLoading(true);
      //
      try {
        if (id == undefined) {
          throw new Error("id is undefined");
        }
        //
        const cleanItineraryData = cleanData(itineraryData);
        const { _id, ...data } = cleanItineraryData;

        const res = await axios.patch(
          `/traventure/api/itinerary/update/${_id}`,
          data
        );
        setResponse(res.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (itineraryData) {
      updateItinerary();
    }
  }, [itineraryData]);

  return { response, error, loading };
};
