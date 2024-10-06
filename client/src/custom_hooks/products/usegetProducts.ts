import axios, { AxiosError } from "axios";
import React from "react";
import { ACTUALProduct } from "../../components/data/ProductData";


export const useGetAllProducts = () => {
    const [data, setData] = React.useState<ACTUALProduct[]|null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("/traventure/api/product/");
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