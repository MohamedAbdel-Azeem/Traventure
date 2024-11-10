import React, { useState } from "react";
import { useGetCurrencies } from "../custom_hooks/useGetCurrencies";
import { useGetExchangeRate } from "../custom_hooks/useGetExchangeRate";
import { useDispatch } from "react-redux";
import { setExchangeRate } from "../redux/exchangeRateSlice"; // Adjust the import path as necessary
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

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

  const navigate = useLocation();

  if (currencyError || rateError) {
    return <p>Error fetching currencies: ${currencyError}</p>;
  }

  if (currencyLoading) {
    return <p>Loading currencies...</p>;
  }
  return (
    <div
      className={`flex flex-col w-52 
    ${
      navigate.pathname.split("/").length < 4 ||
      navigate.pathname.split("/")[3]?.includes("shop") ||
      navigate.pathname.split("/")[3]?.includes("locations") ||
      navigate.pathname.split("/")[3]?.includes("itineraries") ||
      navigate.pathname.split("/")[3]?.includes("activities") ||
      navigate.pathname.split("/")[3]?.includes("bookings") ||
      navigate.pathname.split("/")[3]?.includes("purchases") ||
      navigate.pathname.split("/")[3]?.includes("flights") ||
      navigate.pathname.split("/")[3]?.includes("hotels")
        ? ""
        : "hidden"
    }`}
    >
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
