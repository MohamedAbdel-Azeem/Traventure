import axios from "axios";
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_URL;

interface Currency {
  code: string;
  name: string;
}

export const useGetCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);

        const response = await axios.get<{
          available_currencies: { [key: string]: string };
        }>(
          `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${apiKey}`
        );

        const currencyList: Currency[] = Object.entries(
          response.data.available_currencies
        ).map(([code, name]) => ({
          code,
          name,
        }));

        setCurrencies(currencyList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setError(error);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
};
