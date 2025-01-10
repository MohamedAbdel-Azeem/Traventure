import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import useGetUpcoming from "../../custom_hooks/itineraries/useGetupcoming";
import Place from "../../custom_hooks/places/place_interface";
import LocationCardTourist from "./LocationCardTourist";
import { useGetHTags } from "../../custom_hooks/useCreateHistoricalTag";
import ClipLoader from "react-spinners/ClipLoader";

const MorePlaces: React.FC = () => {
  const {
    loading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useGetHTags();

  const { upcoming, loading, error } = useGetUpcoming();
  const [searchType, setSearchType] = useState<"name" | "tag">("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [sortType, setSortType] = useState<"price" | "rating">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const searchedPlaces = upcoming?.places
    .filter((place) => {
      const term = searchTerm.toLowerCase();
      if (searchType === "name") {
        return place.name.toLowerCase().includes(term);
      } else if (searchType === "tag") {
        return place.historicalTags?.some((tag) =>
          tag.name.toLowerCase().includes(term)
        );
      }
      return true;
    })
    .filter((place) => {
      if (filterType) {
        return place.historicalTags?.some((tag) => tag.name === filterType);
      }
      return true;
    });

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader size={20} color={"#ffffff"} />
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg font-semibold text-red-600">
            Error Fetching: {error}
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex-grow">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 py-16 min-h-[220px] text-center rounded-b-3xl shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/25 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-400/25 rounded-full blur-3xl opacity-50 animate-pulse"></div>
  
          {/* Title and Subtitle */}
          <h1
            className="text-5xl font-extrabold text-white relative drop-shadow-xl"
            style={{
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            Upcoming Places
          </h1>
          <p className="mt-4 text-xl text-white/90">
            Explore and discover new destinations with ease.
          </p>
          <hr className="border-t-2 border-white/40 w-2/3 mx-auto mt-6" />


          <Box my={3} className="flex justify-center gap-4">
            {/* Search Input */}
            <div className="flex items-center bg-white shadow-lg rounded-full px-4 py-2">
              <select
                className="bg-transparent outline-none text-gray-700 font-medium"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="tag">Tag</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${searchType === "name" ? "Name" : "Tag"}`}
                className="bg-transparent outline-none ml-2 w-full text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
  
  
            {/* Filter Dropdown for Tags */}
<FormControl
  variant="outlined"
  className="min-w-[150px] w-[200px] bg-white shadow-lg rounded-full px-4 py-2">

  <InputLabel id="filter-type-label" className="text-gray-700 font-medium">
    Filter By
  </InputLabel>
  <Select
    labelId="filter-type-label"
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
    label="Filter By"
    className="bg-transparent outline-none text-gray-700"
    MenuProps={{
      PaperProps: {
        className: 'bg-white shadow-lg rounded-xl',
      },
    }}
  >
    {tagsLoading ? (
      <MenuItem disabled>Loading...</MenuItem>
    ) : tagsError ? (
      <MenuItem disabled>Error loading tags</MenuItem>
    ) : (
      tagsData.map((tag: any) => (
        <MenuItem key={tag._id} value={tag.name}>
          {tag.name}
        </MenuItem>
      ))
    )}
  </Select>
</FormControl>

          </Box>

          
        </header>
  
        {/* Search and Filter Section */}
        <Box p={3} style={{ marginTop: '80px' }}>
          

          {/* Places Grid */}
          <Box mt={3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchedPlaces && searchedPlaces.length > 0 ? (
                searchedPlaces.map((location: Place) => (
                  <LocationCardTourist
                    key={location._id}
                    id={String(location._id)}
                    wholeLocation={location}
                  />
                ))
              ) : (
                <Typography>No upcoming places available.</Typography>
              )}
            </div>
          </Box>
        </Box>
      </div>
    );
  };
  
  export default MorePlaces;
