import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Currency {
  code: string;   // Currency code, e.g., "USD"
  name: string;   // Currency name, e.g., "United States Dollar"
}

// Example Product interface

// Define the CurrencyDropdown component
const CurrencyDropdown: React.FC<{ onChange: (currency: string) => void }> = ({ onChange }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EGP'); // Default selected currency
  const apiKey = import.meta.env.VITE_API_URL;


  // Fetch currencies when the component mounts
  useEffect(() => {
      const fetchCurrencies = async () => {
          try {
            const response = await axios.get<{ available_currencies: { [key: string]: string } }>(
                  `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${apiKey}`
              );

              const currencyList: Currency[] = Object.entries(response.data.available_currencies).map(([code, name]) => ({
                  code,
                  name,
              }));

              setCurrencies(currencyList);
          } catch (error) {
              console.error("Error fetching currencies:", error);
          }
      };

      fetchCurrencies();
  }, []);

  // Handle currency selection change
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCurrency(event.target.value);
      onChange(event.target.value); // Notify parent of currency change
  };

  return (
      <div>
          <label htmlFor="currency">Select Currency: </label>
          <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
              {currencies.length > 0 ? (
                  currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                          {currency.name} ({currency.code})
                      </option>
                  ))
              ) : (
                  <option value="">Loading...</option>
              )}
          </select>
          <p>Selected Currency: {selectedCurrency}</p>
      </div>
  );
};

export default CurrencyDropdown;