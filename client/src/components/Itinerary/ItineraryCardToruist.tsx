import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import StarIcon from "@mui/icons-material/Star";
import { format } from "date-fns";
import { TouristProfileData } from "../../routes/_app/Tourist/tourist_profile/tourist_profile_data";
import { IActivity } from "../../custom_hooks/activities/activity_interface";
import Place from "../../custom_hooks/places/place_interface";
import useBookItinerary from "../../custom_hooks/itineraries/bookItinerary";
import useBookmarkItinerary from "../../custom_hooks/itineraries/bookmarkItinerary";
import { useParams, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ShareButton from "../Buttons/ShareButton";
import BookmarkIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ClipLoader from 'react-spinners/ClipLoader';

interface TagStructure {
  _id: string;
  name: string;
  __v: number;
}

interface ItineraryCardCRUDProps {
  _id: string;
  main_Picture?: string;
  title: string;
  description: string;
  added_By: string;
  price: number;
  starting_Date: string;
  ending_Date: string;
  rating: number;
  total: number;
  language: string;
  selectedTags?: TagStructure[];
  pickup_location: { longitude: number; latitude: number };
  dropoff_location: { longitude: number; latitude: number };
  plan: {
    place?: Place;
    activities: {
      activity_id?: IActivity;
      activity_duration: number;
      time_unit: string;
    }[];
  }[];
  booked_By: {
    user_id?: TouristProfileData;
  }[];
  accesibility: boolean;
  bookingActivated: boolean;
  inappropriate: boolean;
  bookmarked?: boolean;
}

const ItineraryCardCRUDTourist: React.FC<ItineraryCardCRUDProps> = ({
  _id,
  title,
  description,
  price,
  starting_Date,
  ending_Date,
  rating,
  main_Picture,
  language,
  accesibility,
  pickup_location,
  dropoff_location,
  selectedTags = [],
  plan,
  bookingActivated,
  inappropriate,
  bookmarked
}) => {

  const { bookItinerary, data, loading, error } = useBookItinerary();
  const { bookmarkItinerary,loading:loadingBookmark} = useBookmarkItinerary();
  const { username } = useParams<{ username: string }>();
  const currenttype = useLocation().pathname.split("/")[1];
  const currpath = useLocation().pathname.split("/")[3];
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MM/dd/yyyy");
    } catch (error) {
      return "Invalid Date";
    }
  };

  const handleBooking = async (id: string) => {
    try {
      await bookItinerary(id, username,price);
    } catch (error) {
      console.error("Error booking itinerary  :", error);
    }
  };

  const handleBookmark = async (id: string) => {
    try{
      const response = await bookmarkItinerary(username, id);
      setIsBookmarked(true);
    }
    catch (error) {
      console.error("Error bookmarking itinerary  :", error);
    }
  }

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  const currentType = useLocation().pathname.split("/")[1];
  const handleInappropriate = async () => {
    try {
      const response = await axios.patch(
        `/traventure/api/itinerary/toggleInappropriate/${_id}`
      );
      if (response.status === 200) {
        setActive(!inappropriateV);
        if (!inappropriateV)
          Swal.fire({
            title: "Success",
            text: "Itinerary Bookings have been deemed Inappropriate",
            icon: "success",
          });
        else {
          Swal.fire({
            title: "Success",
            text: "Itinerary Bookings have been undeemed Inappropriate",
            icon: "success",
          });
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Error",
          text: "Can not change inappropriate of item",
          icon: "error",
        });
      }
    }
  };
  const [inappropriateV, setActive] = useState(inappropriate);

  const getRatingStatus = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    if (rating >= 3.0) return "Average";
    return "Below Average";
  };

  return (
    <div
      className="m-4 transition transform hover:scale-105 w-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg"
      style={{ boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)" }} 
    >
      <div className="relative w-full h-[200px]">
        <img
          src={main_Picture}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h2 className="text-2xl font-semibold text-gray-800 text-center truncate">
            {title}
          </h2>
        </div>


        {/* Rating */}

        <div className="mb-2 flex justify-between items-center">
  <p className="text-s font-bold text-gray-800 flex items-center">
    <StarIcon className="mr-1 text-yellow-500" /> {rating.toFixed(1)} · {getRatingStatus(rating)}
  </p>

       {/* Price */}
  <p className="text-s font-bold text-gray-800 flex items-center">
    <ConfirmationNumberIcon className="mr-1" /> {currentCurrency}{" "}
    {(price * exchangeRate).toFixed(2)}
  </p>
</div>
  
        {/* Date */}
        
          <div className="mb-4 text-left">
            <p className="text-gray-600 text-sm font-semibold">
              {`${format(new Date(starting_Date), "MMM dd")} - ${format(
                new Date(ending_Date),
                "MMM dd"
              )}`}
            </p>
          </div>
      
              {/* Description */}

        <div className="mb-4">
          <p className="text-gray-600 text-center text-sm truncate">
            {description}
          </p>
        </div>


        {/* Tags */}
  
        {Array.isArray(selectedTags) && selectedTags.length > 0 && (
  <div className="mb-2">
    <div className="flex flex-wrap justify-center items-center">
      {selectedTags.slice(0, 3).map((tag) => (
        <span
          key={tag._id}
          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
        >
          {tag.name}
        </span>
      ))}
      {selectedTags.length > 3 && (
        <span className="text-blue-800 px-2 py-1 text-sm">...</span>
      )}
    </div>
  </div>
)}


        {/* Buttons */}
  
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/${
              currenttype + "/" + username
            }/itineraries/tourist-itinerary/${_id}`}
            state={{
              title,
              description,
              price,
              starting_Date,
              ending_Date,
              rating,
              main_Picture,
              language,
              pickup_location,
              accesibility,
              dropoff_location,
              plan,
              selectedTags,
            }}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center"
          >
            View Details
          </Link>
          {currentType === "tourist" && (
            <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleBooking(_id)}
              >
                {loading ? (
                  <ClipLoader size={30} color="#ffffff"></ClipLoader>
                ) : (
                  "Book"
                )}
              </button>
              {!isBookmarked && (
                <button
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                  title="Bookmark"
                  onClick={() => handleBookmark(_id)}
                >
                  {loadingBookmark ? (
                    <ClipLoader size={30} color="#ffffff"></ClipLoader>
                  ) : (
                    <BookmarkIcon />
                  )}
                </button>
              )}
              {isBookmarked && currpath !== "bookmarks" && (
                <button className="bg-green-600 text-white p-2 rounded-lg" disabled>
                  <BookmarkAddedIcon />
                </button>
              )}
            </>
          )}
  
          {currentType === "admin" && (
            <div className="bg-yellow-500 text-white p-2 rounded-lg flex flex-col items-center w-1/2">
              <p className="text-sm flex items-center">
                {bookingActivated ? "Booking Activated" : "Booking Deactivated"}
              </p>
            </div>
          )}
        </div>
  
        {currentType === "tourist" && (
          <div className="mt-2">
            <ShareButton type={"itinerary"} ID={_id} />
          </div>
        )}
  
        {currentType === "admin" && (
          <Button onClick={handleInappropriate}>
            {inappropriateV ? "Declare Appropriate" : "Declare Inappropriate"}
          </Button>
        )}
      </div>
    </div>
  );
   
};

export default ItineraryCardCRUDTourist;
