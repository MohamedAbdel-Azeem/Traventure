import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetUpcoming from "../../custom_hooks/itineraries/useGetupcoming";
import ItineraryCardToruist from "./ItineraryCardToruist";
import { useGetAllTags } from "../../custom_hooks/categoryandTagCRUD";
import { useLocation } from "react-router-dom";
import Itinerary from "../../custom_hooks/itineraries/itinerarySchema";
import axios from "axios";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { useGetStripe } from "../../custom_hooks/useGetStripe";
import { loadStripe } from "@stripe/stripe-js";
const MoreItineraries: React.FC = () => {
  const { upcoming, loading, error } = useGetUpcoming();
  const currenttype = useLocation().pathname.split("/")[1];
  const currentuser = useLocation().pathname.split("/")[2];
  const [bookmarkedItineraries, setBookmarkedItineraries] = useState<
    Itinerary[]
  >([]);
  const [searchType, setSearchType] = useState<"name" | "tag">("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<"price" | "rating">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<
    "budget" | "date" | "tag" | "language"
  >("budget");
  const [budgetRange, setBudgetRange] = useState<[number, number]>([
    0, 100000000000000000,
  ]);

  const { data: tagsData } = useGetAllTags();

  const currentDate = new Date();
  const previousYear = currentDate.getFullYear() - 1;
  const nextYear = currentDate.getFullYear() + 1;

  const [dateRange, setDateRange] = useState<[string, string]>([
    `${previousYear}-01-01`,
    `${nextYear}-12-31`,
  ]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          `/traventure/api/tourist/bookmarks/${currentuser}`
        ); // Adjust the API endpoint as needed
        setBookmarkedItineraries(response.data.bookmarkedItineraries);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchBookmarks();

    if (upcoming && upcoming.itineraries && upcoming.itineraries.length > 0) {
      const uniqueLanguages = [
        ...new Set(upcoming.itineraries.map((itinerary) => itinerary.language)),
      ];
      if (uniqueLanguages.length > 0) {
        setSelectedLanguage(uniqueLanguages[0]);
      }

      const uniqueTags = [
        ...new Set(
          upcoming.itineraries.flatMap(
            (itinerary) =>
              itinerary.selectedTags?.map((tag) => tag.name).filter(Boolean) ||
              []
          )
        ),
      ];
      if (uniqueTags.length > 0) {
        setSelectedTags([uniqueTags[0]]);
      }
    }
  }, [upcoming]);

  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedTags(event.target.value as string[]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-blue-600">Loading...</div>
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

  const uniqueTags = [...new Set(tagsData)];

  const filteredItineraries = upcoming?.itineraries
    .filter((itinerary) => {
      const term = searchTerm.toLowerCase();
      if (searchType === "name") {
        return itinerary.title.toLowerCase().includes(term);
      } else if (searchType === "tag") {
        return (
          itinerary.selectedTags?.some((tag) =>
            tag.name.toLowerCase().includes(term)
          ) ?? false
        );
      }
      return true;
    })
    .filter((itinerary) => {
      switch (filterType) {
        case "budget":
          return (
            itinerary.price >= budgetRange[0] &&
            itinerary.price <= budgetRange[1]
          );
        case "date":
          const startingDate = new Date(itinerary.starting_Date);
          const endingDate = new Date(itinerary.ending_Date);
          return (
            startingDate >= new Date(dateRange[0]) &&
            endingDate <= new Date(dateRange[1])
          );
        case "tag":
          return (
            selectedTags.length === 0 ||
            selectedTags.some((tag) =>
              itinerary.selectedTags?.map((t) => t.name).includes(tag)
            )
          );
        case "language":
          return itinerary.language === selectedLanguage;
        default:
          return true;
      }
    })
    .filter((itinerary) => {
      // Filter based on bookingActivated status depending on currentType
      if (currenttype === "admin") {
        // Example: check if user is an admin
        return true; // Admins see all itineraries
      } else {
        return itinerary.bookingActivated && !itinerary.inappropriate; // Non-admins see only activated itineraries
      }
    })
    .sort((a, b) => {
      const sortFactor = sortOrder === "asc" ? 1 : -1;
      if (sortType === "price") {
        const aPrice = a.price ?? 0;
        const bPrice = b.price ?? 0;
        return (aPrice - bPrice) * sortFactor;
      } else if (sortType === "rating") {
        const aRating = a.rating ?? 0;
        const bRating = b.rating ?? 0;
        return (aRating - bRating) * sortFactor;
      }
      return 0;
    });

  return (
    <div className="flex">
      <div className="w-full">
      <center>

      <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 py-16 min-h-[220px] text-center rounded-b-3xl shadow-2xl mb-8 relative overflow-hidden">
  <div className="absolute top-0 left-0 w-32 h-32 bg-white/25 rounded-full blur-3xl opacity-40 animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-400/25 rounded-full blur-3xl opacity-50 animate-pulse"></div>

  {/* Title and Subtitle */}
  <h1 
    className="text-5xl font-extrabold text-white relative drop-shadow-xl" 
    style={{
      textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)", 
      WebkitTextStroke: "1px black"
    }}
  >
    Upcoming Itineraries
  </h1>

  <p className="mt-4 text-xl text-white/90">
    Explore and plan your next adventure with these upcoming itineraries.
  </p>

  <hr className="border-t-2 border-white/40 w-2/3 mx-auto mt-6" />

  {/* Search and Filter Options */}
  <div className="mt-10 flex flex-wrap justify-center gap-4">
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

    {/* Filter Dropdowns */}
    <div className="flex items-center gap-4">
      <div className="bg-white shadow-lg rounded-full px-4 py-2">
        <select 
          className="bg-transparent outline-none text-gray-700 font-medium"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="budget">Budget</option>
          <option value="date">Date</option>
          <option value="tag">Tag</option>
          <option value="language">Language</option>
        </select>
      </div>

      {filterType === "budget" && (
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Min" 
            className="bg-white shadow-lg rounded-full px-4 py-2 outline-none w-20" 
            value={budgetRange[0]} 
            onChange={(e) => setBudgetRange([+e.target.value, budgetRange[1]])} 
          />
          <input 
            type="number" 
            placeholder="Max" 
            className="bg-white shadow-lg rounded-full px-4 py-2 outline-none w-20" 
            value={budgetRange[1]} 
            onChange={(e) => setBudgetRange([budgetRange[0], +e.target.value])} 
          />
        </div>
      )}

      {filterType === "date" && (
        <div className="flex items-center gap-2">
          <input 
            type="date" 
            className="bg-white shadow-lg rounded-full px-4 py-2 outline-none" 
            value={dateRange[0]} 
            onChange={(e) => setDateRange([e.target.value, dateRange[1]])} 
          />
          <input 
            type="date" 
            className="bg-white shadow-lg rounded-full px-4 py-2 outline-none" 
            value={dateRange[1]} 
            onChange={(e) => setDateRange([dateRange[0], e.target.value])} 
          />
        </div>
      )}

      {filterType === "tag" && (
        <div className="bg-white shadow-lg rounded-full px-4 py-2">
          <select 
            className="bg-transparent outline-none text-gray-700 font-medium"
            value={selectedTags}
            onChange={(e) => setSelectedTags([e.target.value])}
          >
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}

      {filterType === "language" && (
        <div className="bg-white shadow-lg rounded-full px-4 py-2">
          <select 
            className="bg-transparent outline-none text-gray-700 font-medium"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {[...new Set(upcoming?.itineraries.map((itinerary) => itinerary.language))].map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>

    {/* Sort and Order Options */}
    <div className="flex items-center gap-4">
      <div className="bg-white shadow-lg rounded-full px-4 py-2">
        <select 
          className="bg-transparent outline-none text-gray-700 font-medium"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="bg-white shadow-lg rounded-full px-4 py-2">
        <select 
          className="bg-transparent outline-none text-gray-700 font-medium"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  </div>
</header>




</center>
        <br />
        <div>
          <div className="mb-4 flex gap-2">
            <FormControl variant="outlined" className="min-w-[120px]">
              <InputLabel id="search-type-label">Search By</InputLabel>

              <Select
                labelId="search-type-label"
                value={searchType}
                onChange={(e) =>
                  setSearchType(e.target.value as "name" | "tag")
                }
                label="Search By"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="tag">Tag</MenuItem>
              </Select>
            </FormControl>
            <input
              type="text"
              placeholder={`Search by ${
                searchType === "name" ? "Name" : "Tag"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded"
            />
            <FormControl variant="outlined" className="min-w-[120px]">
              <InputLabel id="filter-type-label">Filter By</InputLabel>
              <Select
                labelId="filter-type-label"
                value={filterType}
                onChange={(e) =>
                  setFilterType(
                    e.target.value as "budget" | "date" | "tag" | "language"
                  )
                }
                label="Filter By"
              >
                <MenuItem value="budget">Budget</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="tag">Tag</MenuItem>
                <MenuItem value="language">Language</MenuItem>
              </Select>
            </FormControl>
            {filterType === "budget" && (
              <div>
                <input
                  type="number"
                  placeholder="Min Budget"
                  value={budgetRange[0]}
                  onChange={(e) =>
                    setBudgetRange([+e.target.value, budgetRange[1]])
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Max Budget"
                  value={budgetRange[1]}
                  onChange={(e) =>
                    setBudgetRange([budgetRange[0], +e.target.value])
                  }
                  className="border p-2 rounded"
                />
              </div>
            )}
            {filterType === "date" && (
              <div>
                <input
                  type="date"
                  placeholder="Start Date"
                  value={dateRange[0]}
                  onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={dateRange[1]}
                  onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                  className="border p-2 rounded"
                />
              </div>
            )}
            {filterType === "tag" && (
              <FormControl variant="outlined" className="min-w-[120px]">
                <InputLabel id="tag-label">Tag</InputLabel>
                <Select
                  labelId="tag-label"
                  multiple
                  value={selectedTags}
                  onChange={handleTagChange}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  label="Tag"
                >
                  {uniqueTags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                      <ListItemText primary={tag} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {filterType === "language" && (
              <FormControl variant="outlined" className="min-w-[120px]">
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  label="Language"
                >
                  {[
                    ...new Set(
                      upcoming?.itineraries.map(
                        (itinerary) => itinerary.language
                      )
                    ),
                  ].map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl variant="outlined" className="min-w-[120px]">
              <InputLabel id="sort-type-label">Sort By</InputLabel>
              <Select
                labelId="sort-type-label"
                value={sortType}
                onChange={(e) =>
                  setSortType(e.target.value as "price" | "rating")
                }
                label="Sort By"
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="min-w-[120px]">
              <InputLabel id="sort-order-label">Order</InputLabel>
              <Select
                labelId="sort-order-label"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                label="Order"
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
          <hr />

          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItineraries?.length ?? 0 > 0 ? (
                (filteredItineraries ?? []).map((itinerary) => (
                  <ItineraryCardToruist
                    key={itinerary._id}
                    _id={String(itinerary._id)}
                    title={itinerary.title}
                    description={itinerary.description}
                    price={itinerary.price}
                    starting_Date={itinerary.starting_Date}
                    ending_Date={itinerary.ending_Date}
                    rating={itinerary.rating}
                    total={itinerary.total}
                    language={itinerary.language}
                    pickup_location={itinerary.pickup_location}
                    dropoff_location={itinerary.dropoff_location}
                    plan={itinerary.plan}
                    selectedTags={itinerary.selectedTags}
                    main_Picture={itinerary.main_Picture}
                    accesibility={itinerary.accesibility}
                    bookingActivated={itinerary.bookingActivated}
                    inappropriate={itinerary.inappropriate}
                    bookmarked={bookmarkedItineraries.some(
                      (bookmarkedItinerary) =>
                        bookmarkedItinerary._id === itinerary._id
                    )}
                    allowBooking={itinerary.allowBooking}
                    InterestedUsers={itinerary.InterestedUsers}
                  />
                ))
              ) : (
                <div>No Itineraries Available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreItineraries;
