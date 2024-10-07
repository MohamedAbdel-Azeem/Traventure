import { useEffect, useState } from "react";
import axios from "axios";
import Itinerary from "./itinerarySchema";

export const useUpdateItinerary = (itineraryData: any,id:string | undefined) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
   
    useEffect(() => {
        const updateItinerary = async () => {
            setLoading(true);
            // console.log("helllllllll",id);
            try {
                if(id==undefined){
                    throw new Error("id is undefined");
                }
                // console.log("id",id);
                const{_id,...data}=itineraryData;
                console.log("data",data);
                const res = await axios.patch(`/traventure/api/itinerary/update/${_id}`, data);
                setResponse(res.data);
            } catch (err:any) {
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