import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ImprovedSidebar from "./ImprovedSidebar";
import getFlights from "../custom_hooks/getFlights";
import FlightCard from "./flightCard";
import { useSelector } from "react-redux";
import NewNavbar from "./NewNavbar";

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

const AvailableFlights = () => {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [includeTransportation, setIncludeTransportation] = useState(false);

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  const handleSearch = async () => {
    const flightDetails = {
      originLocationCode: fromLocation?.code,
      destinationLocationCode: toLocation?.code,
      departureDate,
      adults,
      children,
      travelClass,
    };

    console.log(flightDetails);
    setIsLoading(true);
    await axios
      .post("/traventure/amadeus/getFlights", flightDetails)
      .then((response) => {
        // Parse flight data here before setting it
        setFlights(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex">
      <NewNavbar/>
      <Box p={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Flights
        </Typography>
        <hr />
        <Box my={3}>
          <Grid container spacing={3} alignItems="center">
            {/* From Location Dropdown */}
            <Grid item>
              <Autocomplete
                options={cityOptions}
                getOptionLabel={(option) => `${option.city} (${option.code})`}
                value={fromLocation}
                onChange={(event, newValue) => setFromLocation(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="From" variant="outlined" />
                )}
                className="min-w-[200px]"
              />
            </Grid>

            {/* To Location Dropdown */}
            <Grid item>
              <Autocomplete
                options={cityOptions}
                getOptionLabel={(option) => `${option.city} (${option.code})`}
                value={toLocation}
                onChange={(event, newValue) => setToLocation(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="To" variant="outlined" />
                )}
                className="min-w-[200px]"
              />
            </Grid>

            {/* Departure Date Picker */}
            <Grid item>
              <TextField
                label="Departure Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="min-w-[200px]"
              />
            </Grid>

            {/* Adults Number Picker */}
            <Grid item>
              <TextField
                label="Adults"
                type="number"
                inputProps={{ min: 1, max: 10 }}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="min-w-[120px]"
              />
            </Grid>

            {/* Children Number Picker */}
            <Grid item>
              <TextField
                label="Children"
                type="number"
                inputProps={{ min: 0, max: 10 }}
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="min-w-[120px]"
              />
            </Grid>

            {/* Travel Class Dropdown */}
            <Grid item>
              <TextField
                select
                label="Travel Class"
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="min-w-[200px]"
              >
                <MenuItem value="ECONOMY">Economy</MenuItem>
                <MenuItem value="PREMIUM_ECONOMY">Premium Economy</MenuItem>
                <MenuItem value="BUSINESS">Business</MenuItem>
                <MenuItem value="FIRST">First</MenuItem>
              </TextField>
            </Grid>

            {/* Search Button */}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Search Flights
              </Button>
            </Grid>
            {/* Include Transportation Toggle */}
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={includeTransportation}
                    onChange={(e) => setIncludeTransportation(e.target.checked)}
                    color="primary"
                  />
                }
                label="Include Transportation"
              />
            </Grid>
          </Grid>
        </Box>
        <hr />

        {/* Display Flights */}
        <Box mt={3}>
          {isLoading ? (
            <Typography variant="body1">Loading flights...</Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              Error fetching flights. Please try again later.
            </Typography>
          ) : flights.length === 0 ? (
            <Typography variant="body1">
              No flights available for the selected criteria.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {flights.map((flight, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <FlightCard
                    flight={flight}
                    exchangeRate={exchangeRate} // Adjust according to your requirements (e.g., currency conversion)
                    currentCurrency={currentCurrency} // Example currency
                    includeTransportation={includeTransportation}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AvailableFlights;
