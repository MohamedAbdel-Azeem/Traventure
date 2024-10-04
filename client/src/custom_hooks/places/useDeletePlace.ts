import axios from "axios";
import { useEffect, useState } from "react";

const useDeletePlace = (id: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function deletePlace() {
            setLoading(true);
            const response = await axios.delete(`traventure/api/place/delete/${id}`)
                .catch((err) => {
                    setError(err);
                });
            if (response && response.status >= 200 && response.status < 300) {
                setData(response.data);
            } else {
                setError("Error deleting place");
            }
            setLoading(false);
        }
        deletePlace();
    }, [id]);
    return { data, loading, error };
};

export default useDeletePlace;