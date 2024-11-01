import { useEffect, useState } from "react";
import axios from "axios";

export function useUpdateComplain(id: string, body: any, trigger: boolean) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!trigger) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.patch(`/traventure/api/complaint/update/${id}`, body);
                if (response.status >= 200 && response.status < 300) {
                    setData(response.data);
                    console.log("updated",response.data);
                } else {
                    throw new Error("Server can't be reached!");
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [trigger]);

    return { data, loading, error };
}
