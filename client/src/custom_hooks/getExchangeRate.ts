import axios from "axios";
import { useState, useEffect } from "react";



const apiKey = import.meta.env.CURRENCY_API_KEY;

export const getExchangeRate = ( toCurrency: string, ) => {
    const [exchangeRate, setexchangeRate] = useState<Number>(1);
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
        console.log(exchangeRate);
        
  
       
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setError(error);
      }
    };
  
    // Fetch conversion rate only if selectedCurrency or previousCurrency changes
    fetchConversionRate();
  }, [toCurrency]);
  
  return { exchangeRate, loading, error };




}

  