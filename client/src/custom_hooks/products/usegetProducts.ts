import axios, { AxiosError } from "axios";
import React from "react";
import { ACTUALProduct } from "../../components/data/ProductData";

export const useGetAllProducts = (type: string, Username: string | null) => {
  const [data, setData] = React.useState<ACTUALProduct[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const url =
    type == "tourist"
      ? `/traventure/api/product?touristUsername=${Username}`
      : "/traventure/api/product/";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
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

export const useGetSomeProducts = (id: string) => {
  const [data, setData] = React.useState<ACTUALProduct[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/traventure/api/product/${id}`);
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

export const useGetAllProductsUnArchived = () => {
  const [data, setData] = React.useState<ACTUALProduct[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/traventure/api/product/");
        const unarchivedProducts = response.data.filter(
          (product: ACTUALProduct) => !product.isArchived
        );
        setData(unarchivedProducts);
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
