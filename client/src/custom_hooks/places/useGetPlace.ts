import { useState, useCallback, useEffect } from "react";
import Place from "./place_interface";
import axios from "axios";


export const useGetPlace = () => {
    const [places, setPlaces] = useState<Place[] | null>(null);
    const [gloading, setgLoading] = useState(false);
    const [gerror, setgError] = useState<string | null>(null);
    const fetchPlaces = useCallback(async () => {
        setgLoading(true);
        try {
            const response = await axios.get("/traventure/api/place/");
            if (response.status === 200) {
                setPlaces(response.data);
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
  
      fetchPlaces();
      
  }, []);
      return { places, gloading, gerror, fetchPlaces };
  };


  export const useGetPlaceID = (username:string) => {
    const [idplaces, setidPlaces] = useState<Place[] | null>(null);
    const [idgloading, setidgLoading] = useState(false);
    const [idgerror, setidgError] = useState<string | null>(null);
    const fetchPlacesID = useCallback(async () => {
        setidgLoading(true);
        try {
            const response = await axios.get(`/traventure/api/place/${username}`);
            if (response.status === 200) {
                setidPlaces(response.data);
            } else {
                setidgError("Error fetching data");
            }
        } catch (err) {
            setidgError(err.message);
        } finally {
            setidgLoading(false);
        }
    }, []);
      useEffect(() => {
  
      fetchPlacesID();
      
  }, []);
      return { idplaces, idgloading, idgerror, fetchPlacesID };
  };
    