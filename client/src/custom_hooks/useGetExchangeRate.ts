import axios from "axios";
import { useState, useEffect } from "react";
import { setExchangeRate } from "../redux/exchangeRateSlice";

const apiKey = import.meta.env.VITE_API_URL;

export const useGetExchangeRate = (toCurrency: string) => {
  const [exchangeRate, setexchangeRate] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      const fromCurrency = "EGP";
      try {
        setLoading(true);

        const response = await axios.get(
          `https://marketdata.tradermade.com/api/v1/convert?api_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=1`
        );

        setexchangeRate(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setError(error);
      }
    };

    // Fetch conversion rate only if selectedCurrency or previousCurrency changes
    fetchConversionRate();
  }, [toCurrency]);

  return { exchangeRate, loading, error };
};
