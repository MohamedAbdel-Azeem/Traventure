import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetUpcoming from "../custom_hooks/itineraries/useGetupcoming";
import Place from "../custom_hooks/places/place_interface";
import LocationCardTourist from "./LocationCardTourist";
import ImprovedSidebar from "./ImprovedSidebar";
import { useGetHTags } from "../custom_hooks/useCreateHistoricalTag";
import NewNavbar from "./NewNavbar";
import CurrencyDropdown from "./currencyDrop";

const MorePlaces: React.FC = () => {
  const {
    loading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useGetHTags();

  const { upcoming, loading, error } = useGetUpcoming();
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState<"name" | "tag">("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>(""); // Add state for filter type
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
  return (
    <div className="flex">
      <NewNavbar/>
      <Box p={3} style={{ marginTop: '80px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Places
        </Typography>
        <hr />
        <CurrencyDropdown />
        <Box my={3}>
          <FormControl
            variant="outlined"
            className="min-w-[120px]"
            margin="normal"
          >
            <InputLabel id="search-type-label">Search By</InputLabel>
            <Select
              labelId="search-type-label"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as "name" | "tag")}
              label="Search By"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="tag">Tag</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className="min-w-[120px]">
            <InputLabel id="filter-type-label">Filter By</InputLabel>
            <Select
              labelId="filter-type-label"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter By"
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

          <Box mt={2}>
            <input
              type="text"
              placeholder={`Search by ${
                searchType === "name" ? "Name" : "Tag"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </Box>
        </Box>
        <hr />
        <Box mt={3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchedPlaces && searchedPlaces.length > 0 ? (
              searchedPlaces.map((location: Place) => (
                <LocationCardTourist
                  key={location._id}
                  id={String(location._id)}
                  wholeLocation={location}
                  onDelete={function (id: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  className=""
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
