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
import ClipLoader from "react-spinners/ClipLoader";

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
    <div className="flex">
      <div className="w-full">

        {/* Page Header */}
<header className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 py-16 text-center rounded-b-3xl shadow-lg">
<h1
            className="text-5xl font-extrabold text-white relative drop-shadow-xl"
            style={{
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
    Upcoming Activities
  </h1>
  <p className="mt-4 text-lg text-white opacity-90">
    Explore exciting activities for your next adventure.
  </p>

  {/* Search and Filter Section */}
  <section className="p-8">
    <div className="mb-4 flex justify-center gap-8 items-center">
      {/* Search Input */}
      <div className="flex items-center bg-white shadow-lg rounded-full px-4 py-2">
        <select 
          className="bg-transparent outline-none text-gray-700 font-medium"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="tag">Tag</option>
          <option value="category">Category</option>
        </select>
        <input 
          type="text" 
          placeholder={`Search by ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`} 
          className="bg-transparent outline-none ml-2 w-full text-gray-700" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex gap-4">
        <div className="flex items-center bg-white shadow-lg rounded-full px-4 py-2">
          <select 
            className="bg-transparent outline-none text-gray-700 font-medium"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="budget">Budget</option>
            <option value="date">Date</option>
            <option value="category">Category</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Budget Filter */}
        {filterType === "budget" && (
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min Price" 
              className="bg-white shadow-lg rounded-full px-4 py-2 outline-none w-20" 
              value={minPrice} 
              onChange={(e) => setMinPrice(Number(e.target.value))} 
            />
            <input 
              type="number" 
              placeholder="Max Price" 
              className="bg-white shadow-lg rounded-full px-4 py-2 outline-none w-20" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))} 
            />
          </div>
        )}

        {/* Date Filter */}
        {filterType === "date" && (
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              className="bg-white shadow-lg rounded-full px-4 py-2 outline-none" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
            <input 
              type="date" 
              className="bg-white shadow-lg rounded-full px-4 py-2 outline-none" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
        )}

        {/* Category Filter */}
        {filterType === "category" && (
          <div className="flex items-center gap-2">
            <div className="bg-white shadow-lg rounded-full px-4 py-2">
              <select 
                className="bg-transparent outline-none text-gray-700 font-medium"
                value={categoryTerms}
                onChange={(e) => setCategoryTerms(e.target.value)}
              >
                {catData.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Rating Filter */}
        {filterType === "rating" && (
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min Rating"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-white shadow-lg rounded-full px-4 py-2 outline-none w-20"
              min={0}
              max={5}
            />
            <input
              type="number"
              placeholder="Max Rating"
              value={maxRating}
              onChange={(e) => setMaxRating(Number(e.target.value))}
              className="bg-white shadow-lg rounded-full px-4 py-2 outline-none w-20"
              min={0}
              max={5}
            />
          </div>
        )}
      </div>
    </div>

    {/* Sorting Section */}
    <div className="mb-4 flex justify-center gap-8">
      {/* Sort Dropdown */}
      <div className="bg-white shadow-lg rounded-full px-4 py-2">
        <select 
          className="bg-transparent outline-none text-gray-700 font-medium"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Order Dropdown */}
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
  </section>
</header>

  
        
        
        


  
        {/* Activities Grid */}
           
      
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
        </div>
      </div>
  );
};

export default MoreActivities;
