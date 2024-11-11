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

const MoreItineraries: React.FC = () => {
  const { upcoming, loading, error } = useGetUpcoming();
  const currenttype = useLocation().pathname.split("/")[1];
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
      <div className="w-full mt-[80px]">
        <h1 className="text-2xl font-bold mb-4 mx-auto">All Itineraries</h1>
        <hr />
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
                    added_By={itinerary.added_By}
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
                    booked_By={itinerary.booked_By}
                    accesibility={itinerary.accesibility}
                    bookingActivated={itinerary.bookingActivated}
                    inappropriate={itinerary.inappropriate}
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
