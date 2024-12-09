import axios, { AxiosError } from "axios";
import React from "react";

interface DataStructure {
    _id?: string;
    name: string;
  }

export const createHtag = async (newTag) => {
    try {
        const response = await axios.post("/traventure/api/historicalTags/add", newTag);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Error creating place");
        }
    } catch (error) {
        throw new Error(error.message || "Error creating place");
    }
};

export const useGetHTags = () => {
    const [data, setData] = React.useState<DataStructure[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("/traventure/api/historicalTags");
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          const axiosError = error as AxiosError;
          setError(axiosError.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { data, loading, error };
  };
  