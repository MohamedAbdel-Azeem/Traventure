import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";
import HotelCard from "./hotelCard";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../custom_hooks/auth";

const cityOptions = [
  { city: "Atlanta", code: "ATL" },
  { city: "Beijing", code: "PEK" },
  { city: "Los Angeles", code: "LAX" },
  { city: "Tokyo", code: "HND" },
  { city: "Dubai", code: "DXB" },
  { city: "Chicago", code: "ORD" },
  { city: "London", code: "LHR" },
  { city: "Shanghai", code: "PVG" },
  { city: "Paris", code: "CDG" },
  { city: "Istanbul", code: "IST" },
  { city: "Hong Kong", code: "HKG" },
  { city: "Guangzhou", code: "CAN" },
  { city: "Frankfurt", code: "FRA" },
  { city: "Dallas", code: "DFW" },
  { city: "Seoul", code: "ICN" },
  { city: "Amsterdam", code: "AMS" },
  { city: "Singapore", code: "SIN" },
  { city: "New York City", code: "JFK" },
  { city: "Madrid", code: "MAD" },
  { city: "Bangkok", code: "BKK" },
  { city: "Barcelona", code: "BCN" },
  { city: "Miami", code: "MIA" },
  { city: "Moscow", code: "SVO" },
  { city: "Mumbai", code: "BOM" },
  { city: "Sydney", code: "SYD" },
  { city: "Toronto", code: "YYZ" },
  { city: "San Francisco", code: "SFO" },
  { city: "São Paulo", code: "GRU" },
  { city: "Mexico City", code: "MEX" },
  { city: "Orlando", code: "MCO" },
  { city: "Zurich", code: "ZRH" },
  { city: "Munich", code: "MUC" },
  { city: "Washington D.C.", code: "IAD" },
  { city: "Las Vegas", code: "LAS" },
  { city: "Boston", code: "BOS" },
  { city: "Rio de Janeiro", code: "GIG" },
  { city: "Vienna", code: "VIE" },
  { city: "Kuala Lumpur", code: "KUL" },
  { city: "Rome", code: "FCO" },
  { city: "Jakarta", code: "CGK" },
  { city: "Copenhagen", code: "CPH" },
  { city: "Delhi", code: "DEL" },
  { city: "Abu Dhabi", code: "AUH" },
  { city: "Buenos Aires", code: "EZE" },
  { city: "Taipei", code: "TPE" },
  { city: "Dublin", code: "DUB" },
  { city: "Denver", code: "DEN" },
  { city: "Cape Town", code: "CPT" },
  { city: "Doha", code: "DOH" },
  { city: "Brussels", code: "BRU" },
  { city: "Detroit", code: "DTW" },
  { city: "Houston", code: "IAH" },
  { city: "Athens", code: "ATH" },
  { city: "Stockholm", code: "ARN" },
  { city: "Bogotá", code: "BOG" },
  { city: "Lisbon", code: "LIS" },
  { city: "Lima", code: "LIM" },
  { city: "Manila", code: "MNL" },
  { city: "Vancouver", code: "YVR" },
  { city: "Santiago", code: "SCL" },
  { city: "Auckland", code: "AKL" },
  { city: "Oslo", code: "OSL" },
  { city: "Phoenix", code: "PHX" },
  { city: "Charlotte", code: "CLT" },
  { city: "Seattle", code: "SEA" },
  { city: "Birmingham", code: "BHX" },
  { city: "Minneapolis", code: "MSP" },
  { city: "Bucharest", code: "OTP" },
  { city: "Budapest", code: "BUD" },
  { city: "Nice", code: "NCE" },
  { city: "Prague", code: "PRG" },
  { city: "Warsaw", code: "WAW" },
  { city: "Helsinki", code: "HEL" },
  { city: "Bali", code: "DPS" },
  { city: "St. Petersburg", code: "LED" },
  { city: "Amman", code: "AMM" },
  { city: "Milan", code: "MXP" },
  { city: "Edinburgh", code: "EDI" },
  { city: "Cairo", code: "CAI" },
  { city: "Riyadh", code: "RUH" },
  { city: "Casablanca", code: "CMN" },
  { city: "Colombo", code: "CMB" },
  { city: "Venice", code: "VCE" },
  { city: "Nairobi", code: "NBO" },
  { city: "Bangalore", code: "BLR" },
  { city: "Kolkata", code: "CCU" },
  { city: "Tel Aviv", code: "TLV" },
  { city: "Islamabad", code: "ISB" },
  { city: "Kathmandu", code: "KTM" },
  { city: "Chennai", code: "MAA" },
  { city: "Shenzhen", code: "SZX" },
  { city: "Lagos", code: "LOS" },
  { city: "Bahrain", code: "BAH" },
  { city: "Hanoi", code: "HAN" },
  { city: "Ho Chi Minh City", code: "SGN" },
  { city: "Karachi", code: "KHI" },
  { city: "Sofia", code: "SOF" },
  { city: "Beirut", code: "BEY" },
  { city: "Doha", code: "DOH" },
  { city: "Porto", code: "OPO" },
  { city: "Muscat", code: "MCT" },
  { city: "Tehran", code: "IKA" },
  { city: "Yerevan", code: "EVN" },
];

const AvailableHotels = () => {
  const [city, setCity] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [maxPrice, setMaxPrice] = useState("");
  const [hotels, setHotels] = useState([]);
  const [isLoading2, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  const handleSearch = async () => {
    const hotelDetails = {
      cityCode: city?.code,
      checkInDate,
      checkOutDate,
      adults,
      // maxPrice,
    };

    setError(null); // Reset error state at the start of a new search
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/traventure/amadeus/getHotels",
        hotelDetails
      );

      if (maxPrice === "") return setHotels(response.data); // Return all hotels if no max price is specified

      const filteredHotels = response.data.filter((hotel: any) => {
        const minAverageBasePrice = hotel.offers
          .map((offer: { price: { total: any } }) => {
            const basePrice = offer?.price?.total;
            return basePrice ? parseFloat(basePrice) : Infinity; // Use Infinity if no price exists
          })
          .reduce(
            (min: number, current: number) => (current < min ? current : min),
            Infinity
          );
        //
        // console.log(parseFloat(maxPrice)/50);
        return minAverageBasePrice <= parseFloat(maxPrice) / 50;
      });

      setHotels(filteredHotels);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const { isAuthenticated, isLoading, isError } = useAuth(4);
  const { username } = useParams<{ username: string }>();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#f86c6b" loading={true} size={150} />
      </div>
    );
  }
  if (isError || isAuthenticated !== username) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Error 403 Unauthorized access</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 py-16 text-center rounded-b-3xl shadow-lg">
        <h1
          className="text-5xl font-extrabold text-white relative drop-shadow-xl"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}
        >
          Available Hotels
        </h1>
        <p className="mt-4 text-lg text-white opacity-90">
          Explore luxury hotels accommodated to your every need.
        </p>
  
        {/* Search and Filter Section */}
        <section className="p-8">
          <div className="mb-4 flex justify-center gap-6 items-center flex-wrap">
            {/* City Dropdown */}
            <Autocomplete
              options={cityOptions}
              getOptionLabel={(option) => `${option.city} (${option.code})`}
              value={city}
              onChange={(event, newValue) => setCity(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  variant="outlined"
                  className="min-w-[200px] bg-white rounded-full shadow-md"
                />
              )}
            />
  
            {/* Check-in Date Picker */}
            <TextField
              label="Check-in Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="min-w-[200px] bg-white rounded-full shadow-md"
            />
  
            {/* Check-out Date Picker */}
            <TextField
              label="Check-out Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="min-w-[200px] bg-white rounded-full shadow-md"
            />
  
            {/* Adults Number Picker */}
            <TextField
              label="Adults"
              type="number"
              inputProps={{ min: 1, max: 10 }}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="min-w-[120px] bg-white rounded-full shadow-md"
            />
  
            {/* Max Price Field */}
            <TextField
              label="Max Price"
              type="number"
              inputProps={{ min: 0 }}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="bg-white shadow-lg rounded-full px-4 py-2"
            />
  
            {/* Search Button */}
            <Button
              variant="contained"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-110"
              onClick={handleSearch}
            >
              Search Hotels
            </Button>
          </div>
        </section>
      </header>
  
      {/* Display Hotels */}
      <main className="flex-grow px-6 py-8">
        {isLoading2 ? (
          <Typography variant="body1">Loading hotels...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            Error fetching hotels. Please try again later.
          </Typography>
        ) : hotels.length === 0 ? (
          <Typography variant="body1">
            No hotels available for the selected criteria.
          </Typography>
        ) : (
          <Grid container spacing={6}>
            {hotels.map((hotel, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <HotelCard
                  hotel={hotel}
                  exchangeRate={exchangeRate}
                  currentCurrency={currentCurrency}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </main>
    </div>
  );
}
  export default AvailableHotels;
  