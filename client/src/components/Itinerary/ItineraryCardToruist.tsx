import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import StarIcon from "@mui/icons-material/Star";
import { format, set } from "date-fns";
import { TouristProfileData } from "../../routes/_app/Tourist/tourist_profile/tourist_profile_data";
import { IActivity } from "../../custom_hooks/activities/activity_interface";
import Place from "../../custom_hooks/places/place_interface";
import useBookItinerary from "../../custom_hooks/itineraries/bookItinerary";
import useBookmarkItinerary from "../../custom_hooks/itineraries/bookmarkItinerary";
import { useParams, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import axios, { all } from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ShareButton from "../Buttons/ShareButton";
import BookmarkIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ClipLoader from 'react-spinners/ClipLoader';
import { patchInterested } from "../../custom_hooks/itineraries/patchInterested";
import { getTouristUsername } from "../../custom_hooks/getTouristUsername";

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
  allowBooking: boolean,
  InterestedUsers: [
    {
      user_id?:TouristProfileData;
    },
  ],
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
  bookmarked,
  allowBooking,
  InterestedUsers,

}) => {


  const { bookItinerary, data, loading, error } = useBookItinerary();
  const { bookmarkItinerary,loading:loadingBookmark} = useBookmarkItinerary();
  const { username } = useParams<{ username: string }>();
  const currenttype = useLocation().pathname.split("/")[1];
  const currpath = useLocation().pathname.split("/")[3];
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  console.log("allowBooking:  ",allowBooking);
  console.log("InterestedUsers:  ",InterestedUsers);

  useEffect(() => {
    const checkInterestedUsers = async () => {
      const results = await Promise.all(
        InterestedUsers.map(async (user) => {
          const touristUsername = await getTouristUsername(user.user_id);
          return touristUsername === username;
        })
      );
      setInterested(!results.some((result) => result));
    };

    checkInterestedUsers();
  }, [InterestedUsers, username]);
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

  const handleInterested = async () => {
    

    setInterested(!Interested);
    await patchInterested({ username, itineraryId: _id, interested: Interested });

    if (Interested) {
      Swal.fire({
        title: "Success",
        text: "Itinerary marked as Interested",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: "Itinerary marked as Not Interested",
        icon: "success",
      });
    }

  };
  console.log("title:  ",title,"Interested:  ",(InterestedUsers.some((user) => user.user_id?.username === username)));  
  const [inappropriateV, setActive] = useState(inappropriate);
  const [Interested, setInterested] = useState(!(InterestedUsers.some((user) => user.user_id?.username === username)));

  return (
    <div className="m-4 transition transform hover:scale-105 w-96 bg-gray-200 rounded-lg">
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
        <div className="mb-4">
          <p className="text-gray-600 text-center text-sm truncate">
            {description}
          </p>
        </div>

        {Array.isArray(selectedTags) && selectedTags.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap justify-center items-center">
              {selectedTags.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center items-center mb-4">
          <div className="flex flex-col items-center mx-2">
            <div className="bg-green-500 text-white p-2 rounded-lg">
              <p className="text-sm flex items-center">
                <AccessTimeIcon className="mr-1" /> {formatDate(starting_Date)}
              </p>
            </div>
          </div>
          <span className="text-gray-500 mx-4">-</span>
          <div className="flex flex-col items-center mx-2">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <p className="text-sm flex items-center">
                <AccessTimeIcon className="mr-1" /> {formatDate(ending_Date)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mb-4 space-x-4">
          <div className="bg-red-500 text-white p-2 rounded-lg flex fle x-col items-center w-1/2">
            <p className="text-sm flex items-center">
              <ConfirmationNumberIcon className="mr-1" /> {currentCurrency}{" "}
              {(price * exchangeRate).toFixed(2)}
            </p>
          </div>
          <div className="bg-yellow-500 text-white p-2 rounded-lg flex flex-col items-center w-1/2">
            <p className="text-sm flex items-center">
              <StarIcon className="mr-1" /> {rating}
            </p>
          </div>
        </div>

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
              {" "}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleBooking(_id)}
              >
                {loading?<ClipLoader size={30} color="#ffffff"></ClipLoader>: "Book"}
              </button>
              {!isBookmarked && <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" title="Bookmark"
                onClick={() => handleBookmark(_id)}>
                {loadingBookmark?<ClipLoader size={30} color="#ffffff"></ClipLoader>: <BookmarkIcon />}
                </button>}
                {isBookmarked && currpath!=="bookmarks" && <button className="bg-green-600 text-white p-2 rounded-lg" disabled>
                <BookmarkAddedIcon  />
                </button>}
              <ShareButton type={"itinerary"} ID={_id} />
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

        {currentType === "admin" && (
          <Button onClick={handleInappropriate}>
            {inappropriateV ? "Declare appropriate" : " Declare InAppropriate"}
          </Button>
        )}


        {currentType === "tourist"  && allowBooking===false &&(
          <Button onClick={handleInterested}>
            {Interested ? " Interested" : " Not Interested"}
          </Button>
        )}
      </div>
    
    </div>
  );
};

export default ItineraryCardCRUDTourist;
