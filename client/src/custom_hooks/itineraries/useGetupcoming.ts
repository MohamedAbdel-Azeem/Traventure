import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { upcoming } from "./upcomingSchema";
import axios from "axios";
import { getBookings } from "../getTouristBookings";
import Itineraries from "../../components/Itineraries";
import { set } from "date-fns";

const useGetUpcoming = () => {
    const [upcoming, setItinerary] = useState<upcoming | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const currenttype = useLocation().pathname.split('/')[1];
    const currentuser = useLocation().pathname.split('/')[2];

    useEffect(() => {
        async function fetchItinerary() {
            setLoading(true);
            try{
            let response;
            if(currenttype!=="tourist"){
             response = await axios.get(`/traventure/api/tourist/upcoming`)}
            else{
             response = await axios.get(`/traventure/api/tourist/upcoming/${currentuser}`)
            }
            if (response && response.status === 200) {
                let newdata = response.data;
                setItinerary(newdata);
                
            }}

            catch(err){
                setError("Error fetching upcoming");
            }
            finally{
                setLoading(false);

            }
                
        }
            
        
       fetchItinerary();
        
 }, []); 

    return { upcoming, loading, error };
};

export default useGetUpcoming;