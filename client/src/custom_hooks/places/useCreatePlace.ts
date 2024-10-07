import axios from "axios";
import { useState, useEffect } from "react";
import Place from "./place_interface.ts";

export const useCreatePlace = (body: Place | null) => {
    const [data, setData] = useState<Place | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function createPlace() {
            setLoading(true);
            try {
                const response = await axios.post("/traventure/api/place/add", body);
                if (response.status >= 200 && response.status < 300) {
                    setData(response.data);
                } else {
                    setError("Error creating place");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (body) {
            createPlace();
        }
    }, [body]);

    return { data, loading, error };
};




