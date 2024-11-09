import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField, MenuItem, Autocomplete, Grid } from '@mui/material';
import ImprovedSidebar from './ImprovedSidebar';
import HotelCard from './hotelCard';

const cityOptions = [
    { city: 'Atlanta', code: 'ATL' },
    { city: 'Beijing', code: 'PEK' },
    { city: 'Los Angeles', code: 'LAX' },
    { city: 'Tokyo', code: 'HND' },
    { city: 'Dubai', code: 'DXB' },
    { city: 'Chicago', code: 'ORD' },
    { city: 'London', code: 'LHR' },
    { city: 'Shanghai', code: 'PVG' },
    { city: 'Paris', code: 'CDG' },
    { city: 'Istanbul', code: 'IST' },
    { city: 'Hong Kong', code: 'HKG' },
    { city: 'Guangzhou', code: 'CAN' },
    { city: 'Frankfurt', code: 'FRA' },
    { city: 'Dallas', code: 'DFW' },
    { city: 'Seoul', code: 'ICN' },
    { city: 'Amsterdam', code: 'AMS' },
    { city: 'Singapore', code: 'SIN' },
    { city: 'New York City', code: 'JFK' },
    { city: 'Madrid', code: 'MAD' },
    { city: 'Bangkok', code: 'BKK' },
    { city: 'Barcelona', code: 'BCN' },
    { city: 'Miami', code: 'MIA' },
    { city: 'Moscow', code: 'SVO' },
    { city: 'Mumbai', code: 'BOM' },
    { city: 'Sydney', code: 'SYD' },
    { city: 'Toronto', code: 'YYZ' },
    { city: 'San Francisco', code: 'SFO' },
    { city: 'São Paulo', code: 'GRU' },
    { city: 'Mexico City', code: 'MEX' },
    { city: 'Orlando', code: 'MCO' },
    { city: 'Zurich', code: 'ZRH' },
    { city: 'Munich', code: 'MUC' },
    { city: 'Washington D.C.', code: 'IAD' },
    { city: 'Las Vegas', code: 'LAS' },
    { city: 'Boston', code: 'BOS' },
    { city: 'Rio de Janeiro', code: 'GIG' },
    { city: 'Vienna', code: 'VIE' },
    { city: 'Kuala Lumpur', code: 'KUL' },
    { city: 'Rome', code: 'FCO' },
    { city: 'Jakarta', code: 'CGK' },
    { city: 'Copenhagen', code: 'CPH' },
    { city: 'Delhi', code: 'DEL' },
    { city: 'Abu Dhabi', code: 'AUH' },
    { city: 'Buenos Aires', code: 'EZE' },
    { city: 'Taipei', code: 'TPE' },
    { city: 'Dublin', code: 'DUB' },
    { city: 'Denver', code: 'DEN' },
    { city: 'Cape Town', code: 'CPT' },
    { city: 'Doha', code: 'DOH' },
    { city: 'Brussels', code: 'BRU' },
    { city: 'Detroit', code: 'DTW' },
    { city: 'Houston', code: 'IAH' },
    { city: 'Athens', code: 'ATH' },
    { city: 'Stockholm', code: 'ARN' },
    { city: 'Bogotá', code: 'BOG' },
    { city: 'Lisbon', code: 'LIS' },
    { city: 'Lima', code: 'LIM' },
    { city: 'Manila', code: 'MNL' },
    { city: 'Vancouver', code: 'YVR' },
    { city: 'Santiago', code: 'SCL' },
    { city: 'Auckland', code: 'AKL' },
    { city: 'Oslo', code: 'OSL' },
    { city: 'Phoenix', code: 'PHX' },
    { city: 'Charlotte', code: 'CLT' },
    { city: 'Seattle', code: 'SEA' },
    { city: 'Birmingham', code: 'BHX' },
    { city: 'Minneapolis', code: 'MSP' },
    { city: 'Bucharest', code: 'OTP' },
    { city: 'Budapest', code: 'BUD' },
    { city: 'Nice', code: 'NCE' },
    { city: 'Prague', code: 'PRG' },
    { city: 'Warsaw', code: 'WAW' },
    { city: 'Helsinki', code: 'HEL' },
    { city: 'Bali', code: 'DPS' },
    { city: 'St. Petersburg', code: 'LED' },
    { city: 'Amman', code: 'AMM' },
    { city: 'Milan', code: 'MXP' },
    { city: 'Edinburgh', code: 'EDI' },
    { city: 'Cairo', code: 'CAI' },
    { city: 'Riyadh', code: 'RUH' },
    { city: 'Casablanca', code: 'CMN' },
    { city: 'Colombo', code: 'CMB' },
    { city: 'Venice', code: 'VCE' },
    { city: 'Nairobi', code: 'NBO' },
    { city: 'Bangalore', code: 'BLR' },
    { city: 'Kolkata', code: 'CCU' },
    { city: 'Tel Aviv', code: 'TLV' },
    { city: 'Islamabad', code: 'ISB' },
    { city: 'Kathmandu', code: 'KTM' },
    { city: 'Chennai', code: 'MAA' },
    { city: 'Shenzhen', code: 'SZX' },
    { city: 'Lagos', code: 'LOS' },
    { city: 'Bahrain', code: 'BAH' },
    { city: 'Hanoi', code: 'HAN' },
    { city: 'Ho Chi Minh City', code: 'SGN' },
    { city: 'Karachi', code: 'KHI' },
    { city: 'Sofia', code: 'SOF' },
    { city: 'Beirut', code: 'BEY' },
    { city: 'Doha', code: 'DOH' },
    { city: 'Porto', code: 'OPO' },
    { city: 'Muscat', code: 'MCT' },
    { city: 'Tehran', code: 'IKA' },
    { city: 'Yerevan', code: 'EVN' },
  ];
  

const AvailableHotels = () => {
  const [city, setCity] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [maxPrice, setMaxPrice] = useState('');
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const hotelDetails = {
      cityCode: city?.code,
      checkInDate,
      checkOutDate,
      adults,
     // maxPrice,
    };

    console.log(hotelDetails);
    setError(null); // Reset error state at the start of a new search
    setIsLoading(true);
    
    try {
      const response = await axios.post('/traventure/amadeus/getHotels', hotelDetails);
      
      const filteredHotels = response.data.filter((hotel: any) => {
        const minAverageBasePrice = hotel.offers
          .map((offer: { price: { variations: { average: { base: any; }; }; }; }) => {
            const basePrice = offer?.price?.variations?.average?.base;
            return basePrice ? parseFloat(basePrice) : Infinity; // Use Infinity if no price exists
          })
          .reduce((min: number, current: number) => (current < min ? current : min), Infinity);
  
        return minAverageBasePrice <= maxPrice;
      });
  
      setHotels(filteredHotels);
      console.log(filteredHotels);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <ImprovedSidebar />
      <Box p={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Hotels
        </Typography>
        <hr />
        <Box my={3}>
          <Grid container spacing={3} alignItems="center">
            {/* City Dropdown */}
            <Grid item>
              <Autocomplete
                options={cityOptions}
                getOptionLabel={(option) => `${option.city} (${option.code})`}
                value={city}
                onChange={(event, newValue) => setCity(newValue)}
                renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                className="min-w-[200px]"
              />
            </Grid>

            {/* Check-in Date Picker */}
            <Grid item>
              <TextField
                label="Check-in Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="min-w-[200px]"
              />
            </Grid>

            {/* Check-out Date Picker */}
            <Grid item>
              <TextField
                label="Check-out Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
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

            {/* Max Price Field */}
            <Grid item>
              <TextField
                label="Max Price"
                type="number"
                inputProps={{ min: 0 }}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="min-w-[120px]"
              />
            </Grid>

            {/* Search Button */}
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSearch}>
                Search Hotels
              </Button>
            </Grid>
          </Grid>
        </Box>
        <hr />

        {/* Display Hotels */}
        <Box mt={3}>
          {isLoading ? (
            <Typography variant="body1">Loading hotels...</Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              Error fetching hotels. Please try again later.
            </Typography>
          ) : hotels.length === 0 ? (
            <Typography variant="body1">No hotels available for the selected criteria.</Typography>
          ) : (
            <Grid container spacing={3}>
              {hotels.map((hotel, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <HotelCard
                    hotel={hotel}
                    exchangeRate={1}  // Adjust according to your requirements (e.g., currency conversion)
                    currentCurrency="USD"  // Example currency
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

export default AvailableHotels;
