import { useCallback, useEffect, useState } from 'react';
import axios from "axios";
export function usegetallComplaints() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get("/traventure/api/complaint/");
                if (response.status >= 200 && response.status < 300) {
                    setData(response.data);
                    console.log(response.data);
                }
                else {
                    throw new Error("Server can't be reached!");
                }
            }
            catch (error : any) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return {data, loading, error };
}