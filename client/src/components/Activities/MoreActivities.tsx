import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Activity, ActivityCardTourist } from "./ActivityCardTourist";
import {IActivity} from "../../custom_hooks/activities/activity_interface";
import { useGetAllCategories } from "../../custom_hooks/categoryandTagCRUD";
import useGetUpcoming from "../../custom_hooks/itineraries/useGetupcoming";
import axios from "axios";

const MoreActivities: React.FC = () => {
  const { upcoming, loading, error } = useGetUpcoming();
  const [bookmarkedActivities,setBookmarkedActivities] = useState<Activity[]>([]);
  const sactivities = upcoming?.activities || [];
  const { data: catData } = useGetAllCategories();
  const currenttype = useLocation().pathname.split("/")[1];
  const currentuser = useLocation().pathname.split("/")[2];
  const [categoryTerms, setCategoryTerms] = useState<string[]>([]);
  const [searchType, setSearchType] = useState<"name" | "tag" | "category">(
    "name"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [filterType, setFilterType] = useState<
    "budget" | "date" | "category" | "rating"
  >("budget");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString());
  const [endDate, setEndDate] = useState<string>(new Date().toISOString());
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(5);
  const [sortBy, setSortBy] = useState<"price" | "rating">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");


  useEffect(() => {

      const fetchBookmarks = async () => {
        try {
          const response = await axios.get(`/traventure/api/tourist/bookmarks/${currentuser}`); // Adjust the API endpoint as needed
          setBookmarkedActivities(response.data.bookmarkedActivities);
        } catch (err : any) {
          console.error(err.message);
        }
      };
  
      fetchBookmarks();

    if (filterType === "date") {
      const today = new Date();
      const start = new Date();
      const end = new Date();
      start.setFullYear(today.getFullYear() - 1);
      end.setFullYear(today.getFullYear() + 1);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    }
  }, [filterType]);

  const calculateAverageRating = (currentActivity: Activity): number => {
    const allRatings = currentActivity.feedback?.map((fb) =>
      parseFloat(fb.rating)
    );
    const totalRating = allRatings?.reduce((acc, rating) => acc + rating, 0);
    return allRatings?.length ? totalRating / allRatings?.length : 0;
  };

  const filteredActivities = sactivities
    ?.filter((activity: Activity) => {
      const term = searchTerm.toLowerCase();

      if (searchType === "name") {
        return activity.Title.toLowerCase().includes(term);
      } else if (searchType === "tag") {
        return activity.Tags.some((tag) =>
          tag.name.toLowerCase().includes(term)
        );
      } else if (searchType === "category") {
        return activity.Category.name.toLowerCase().includes(term);
      }

      return true;
    })
    .filter((activity: Activity) => {
      switch (filterType) {
        case "budget":
          return activity.Price >= minPrice && activity.Price <= maxPrice;
        case "date":
          const activityDate = new Date(activity.DateAndTime);
          return (
            activityDate >= new Date(startDate) &&
            activityDate <= new Date(endDate)
          );
        case "category":
          return (
            categoryTerms.length === 0 ||
            categoryTerms.includes(activity.Category.name)
          );
        case "rating":
          const avgRating = calculateAverageRating(activity);
          return avgRating >= minRating && avgRating <= maxRating;
        default:
          return true;
      }
    })
    .filter((activity: Activity) => {
      if (currenttype === "tourist" || currenttype === "guest")
        return !activity.inappropriate;
      return true;
    });

  const sortedActivities = [...(filteredActivities ?? [])].sort(
    (a: IActivity, b: IActivity) => {
      let comparison = 0;

      if (sortBy === "price") {
        comparison = a.Price - b.Price;
      } else if (sortBy === "rating") {
        comparison = calculateAverageRating(a) - calculateAverageRating(b);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    }
  );

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
  return (
    <div className="flex">
      <div className="w-full" style={{ marginTop: "80px" }}>
        {/* Page Header */}
        <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 py-16 text-center rounded-b-3xl shadow-lg">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
            All Activities
          </h1>
          <p className="mt-4 text-lg text-white opacity-90">
            Explore exciting activities for your next adventure.
          </p>
        </header>
  
        {/* Search and Filter Section */}
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-1 mx-4 lg:mx-20 rounded-lg shadow-md mt-5">
          <section className="p-8 bg-white rounded-lg">
            <div className="mb-4 flex gap-2">
              <FormControl variant="outlined" className="min-w-[120px]">
                <InputLabel id="search-type-label">Search By</InputLabel>
                <Select
                  labelId="search-type-label"
                  value={searchType}
                  onChange={(e) =>
                    setSearchType(e.target.value as "name" | "tag" | "category")
                  }
                  label="Search By"
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="tag">Tag</MenuItem>
                  <MenuItem value="category">Category</MenuItem>
                </Select>
              </FormControl>
              <input
                type="text"
                placeholder={`Search by ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
  
            <div className="mb-4 flex gap-2">
              <FormControl variant="outlined" className="min-w-[120px]">
                <InputLabel id="filter-type-label">Filter By</InputLabel>
                <Select
                  labelId="filter-type-label"
                  value={filterType}
                  onChange={(e) =>
                    setFilterType(
                      e.target.value as "budget" | "date" | "category" | "rating"
                    )
                  }
                  label="Filter By"
                >
                  <MenuItem value="budget">Budget</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="category">Category</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </FormControl>
  
              {/* Filter Inputs */}
              {filterType === "budget" && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="border p-2 rounded"
                  />
                </div>
              )}
  
              {filterType === "date" && (
                <div className="flex gap-2">
                  <input
                    title="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    title="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
              )}
  
              {filterType === "category" && (
                <div className="flex gap-2">
                  <FormControl variant="outlined" className="min-w-[120px]">
                    <InputLabel id="category-select-label">Categories</InputLabel>
                    <Select
                      labelId="category-select-label"
                      multiple
                      value={categoryTerms}
                      onChange={(e) =>
                        setCategoryTerms(e.target.value as string[])
                      }
                      label="Categories"
                    >
                      {catData.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
  
              {filterType === "rating" && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min Rating"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="border p-2 rounded"
                    min={0}
                    max={5}
                  />
                  <input
                    type="number"
                    placeholder="Max Rating"
                    value={maxRating}
                    onChange={(e) => setMaxRating(Number(e.target.value))}
                    className="border p-2 rounded"
                    min={0}
                    max={5}
                  />
                </div>
              )}
            </div>
  
            {/* Sorting Section */}
            <div className="mb-4 flex gap-2">
              <FormControl variant="outlined" className="min-w-[120px]">
                <InputLabel id="sort-type-label">Sort By</InputLabel>
                <Select
                  labelId="sort-type-label"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "price" | "rating")
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
          </section>
        </div>
  
        {/* Activities Grid */}
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-1 mx-4 lg:mx-20 rounded-lg shadow-md mt-5">
          <section className="p-8 bg-white rounded-lg">
            <h2 className="text-3xl font-bold mb-2 text-gray-800 relative inline-block">
              All Activities
              <span className="block h-1 mt-2 bg-gradient-to-r from-purple-500 to-pink-500"></span>
            </h2>
            <p className="mb-6 text-gray-600">
              Discover a range of exciting activities tailored to your interests.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedActivities && sortedActivities.length > 0 ? (
                sortedActivities.map((activity: Activity) => (
                  <ActivityCardTourist
                    key={activity._id}
                    activity={activity}
                    bookmarked={bookmarkedActivities.some((bookmarkedActivity) => bookmarkedActivity._id === activity._id)}
                    {...(currenttype === "tourist" && { type: "tourist" })}
                  />
                ))
              ) : (
                <div>No activities found.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MoreActivities;
