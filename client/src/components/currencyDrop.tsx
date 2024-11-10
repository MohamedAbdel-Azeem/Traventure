import React, { useState } from "react";
import { useGetCurrencies } from "../custom_hooks/useGetCurrencies";
import { useGetExchangeRate } from "../custom_hooks/useGetExchangeRate";
import { useDispatch } from "react-redux";
import { setExchangeRate } from "../redux/exchangeRateSlice"; // Adjust the import path as necessary
import { useSelector } from "react-redux";

// Define the CurrencyDropdown component
const CurrencyDropdown: React.FC = () => {
  const initialCurrency = useSelector(
    (state) => state.exchangeRate.currentCurrency
  );

  const [selectedCurrency, setSelectedCurrency] =
    useState<string>(initialCurrency); // Default selected currency
  const dispatch = useDispatch();

  const {
    currencies,
    loading: currencyLoading,
    error: currencyError,
  } = useGetCurrencies(); // Fetch currencies

  const { exchangeRate, error: rateError } =
    useGetExchangeRate(selectedCurrency); // Fetch exchange rate

  dispatch(
    setExchangeRate({
      rate: exchangeRate,
      currency: selectedCurrency,
    })
  ); // Set exchange rate in redux store

  // Handle currency selection change
  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };

  if (currencyError || rateError) {
    return <p>Error fetching currencies: ${currencyError}</p>;
  }

  if (currencyLoading) {
    return <p>Loading currencies...</p>;
  }

  return (
    <div className="flex flex-col w-52">
      <label htmlFor="currency">Select Currency: </label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
      >
        {currencies.length > 0 &&
          currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
