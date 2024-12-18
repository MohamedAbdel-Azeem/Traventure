import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { format, set } from "date-fns";
import { TouristProfileData } from "../../../../routes/_app/Tourist/tourist_profile/tourist_profile_data";
import { IActivity } from "../../../../custom_hooks/activities/activity_interface";
import Place from "../../../../custom_hooks/places/place_interface";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { toggleAllowBooking } from "../../../../custom_hooks/itineraries/toggleAllowBooking";
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
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  bookingActivated: boolean;
  inappropriate: boolean;
  allowBooking: boolean;
  InterestedUsers: [
    {
      user_id?:TouristProfileData;
    },
  ],
}

const ItineraryCardCRUD: React.FC<ItineraryCardCRUDProps> = ({
  _id,
  title,
  description,
  price,
  starting_Date,
  ending_Date,
  rating,
  main_Picture,
  language,
  pickup_location,
  dropoff_location,
  accesibility,
  selectedTags = [],
  plan,
  onDelete,
  isDeleting = false,
  bookingActivated,
  allowBooking,

  inappropriate,
}) => {
  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(_id);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MM/dd/yyyy");
    } catch (error) {
      return "Invalid Date";
    }
  };
  const [active, setActive] = useState(bookingActivated);
  const [allowBookingState, setAllowBookingState] = useState(!allowBooking);
  console.log("allowBooking ",allowBooking);
  console.log("allowBookingState ",allowBookingState);
  const handleActivation = async () => {
    try {
      const response = await axios.patch(
        `/traventure/api/itinerary/toggleActivation/${_id}`
      );
      if (response.status === 200) {
        setActive(!active);
        if (active)
          Swal.fire({
            title: "Success",
            text: "Itinerary Bookings have been deactivated",
            icon: "success",
          });
        else {
          Swal.fire({
            title: "Success",
            text: "Itinerary Bookings have been activated",
            icon: "success",
          });
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Error",
          text: "Can not deactivate bookings as no bookings exist",
          icon: "error",
        });
      }
    }
  };
  const handleAllowBooking = async () => {

    setAllowBookingState(!allowBookingState);
    const response = await toggleAllowBooking(_id);
    
    console.log("responee ",response);
    console.log("allowBookingState ",allowBookingState);
    if(response==='Error Toggling Allow Booking'){
      Swal.fire({
        title: "Error",
        text: "Error Toggling Allow Booking",
        icon: "error",
      });
    }
    else{
      if(allowBookingState){
      Swal.fire({
        title: "Success",
        text: "Booking Allowed",
        icon: "success",
      });
    }
    
    else{
      Swal.fire({
        title: "Success",
        text: "Booking Stopped",
        icon: "success",
      });
    }
  }
   
  };

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  const { username: currentuser } = useParams();

  return (
    <div className="m-4 transition transform hover:scale-105 w-96 bg-gray-100 rounded-lg">
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
          <div className="bg-red-500 text-white p-2 rounded-lg flex flex-col items-center w-1/2">
            <p className="text-sm flex items-center">
              <ConfirmationNumberIcon className="mr-1" />
              {currentCurrency} {(price * exchangeRate).toFixed(2)}
            </p>
          </div>
          <div className="bg-yellow-500 text-white p-2 rounded-lg flex flex-col items-center w-1/2">
            <p className="text-sm flex items-center">
              <StarIcon className="mr-1" /> {rating}
            </p>
          </div>
        </div>
        {inappropriate && (
          <div className="bg-red-500 text-white p-2 rounded-lg flex flex-col items-center w-full">
            <h1 className="text-sm flex items-center">Inappropriate</h1>
            <p className="text-sm flex items-center  text-white">
              please modify the itinerary
            </p>
          </div>
        )}
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/tourguide/${currentuser}/itineraries/itinerary/${_id}`}
            state={{
              _id,
              title,
              description,
              price,
              starting_Date,
              ending_Date,
              rating,
              main_Picture,
              language,
              pickup_location,
              dropoff_location,
              plan,
              selectedTags,
              accesibility,
            }}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center"
          >
            View Details
          </Link>
          <Button onClick={handleActivation}>
            {!active ? "Activate" : "Deactivate"}
          </Button>

          {(
          <Button onClick={handleAllowBooking}>
            {(allowBookingState) ? "Allow Booking" : " Stop Booking"}
          </Button>
        )}
          
          
          {onDelete &&
            (isDeleting ? (
              <CircularProgress size={24} className="text-red-500" />
            ) : (
              <button
                title="Delete Itinerary"
                onClick={handleDeleteClick}
                className="text-red-500 hover:text-red-700 transition"
              >
                <DeleteIcon />
              </button>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default ItineraryCardCRUD;
