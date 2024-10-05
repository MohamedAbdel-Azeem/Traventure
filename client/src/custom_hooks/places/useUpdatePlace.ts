import axios from "axios";
import { useState, useEffect } from "react";

const useUpdatePlace = (id: string, body: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function updatePlace() {
            if (!id) return;
            if (!body) return;
            setLoading(true);
            const response = await axios.patch(`traventure/api/place/update/${id}`, body)
                .catch((err) => {
                    setError(err);
                });
            if (response && response.status >= 200 && response.status < 300) {
                setData(response.data);
            } else {
                setError("Error updating place");
            }
            setLoading(false);
        }
        updatePlace();
    }, [id, body]);
    return { data, loading, error };
};

export default useUpdatePlace;