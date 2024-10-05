import axios from "axios";
import {useState , useEffect} from "react";
import Place from "./place_interface.ts"

const useCreatePlace = (body : Place | null) => {
    const [data,setData] = useState<Place | null>(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);

    useEffect(() => {
        async function createPlace() {
            setLoading(true);
            const response = await axios.post("traventure/api/place/add",body)
            .catch((err) => {
                setError(err);
            });
            if (response && response.status >= 200 && response.status < 300) {
                setData(response.data);
            } else {
                setError("Error creating place");
            }
            setLoading(false);
        }
        createPlace();
    }, [body]);
    return { data, loading, error };
}

export default useCreatePlace;