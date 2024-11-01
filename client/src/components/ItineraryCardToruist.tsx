import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StarIcon from '@mui/icons-material/Star';
import { format } from 'date-fns';
import { TouristProfileData } from "../routes/_app/tourist_profile/tourist_profile_data";
import IActivity from "../custom_hooks/activities/activity_interface";
import Place from "../custom_hooks/places/place_interface";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
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
  pickup_location: string;
  dropoff_location: string;
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
  inappropriate
}) => {

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MM/dd/yyyy');
    } catch (error) {
      return "Invalid Date";
    }
  };
  const currentType = useLocation().pathname.split('/')[1];
const handleInappropriate = async() => {
  try{
  const response=await axios.patch(`/traventure/api/itinerary/toggleInappropriate/${_id}`);
  if(response.status === 200){
    setActive(!inappropriateV);
    if(!inappropriateV)
    Swal.fire({title:"Success",text:"Itinerary Bookings have been deemed Inappropriate",icon:"success"});
  else{
    Swal.fire({title:"Success",text:"Itinerary Bookings have been undeemed Inappropriate",icon:"success"});
  }
  }}
  catch(error: any){ if(error.response && error.response.status === 400){
    Swal.fire({title:"Error",text:"Can not change inappropriate of item",icon:"error"});
  }}
 
};
const [inappropriateV, setActive] = useState(inappropriate);
  return (
<div className="m-4 transition transform hover:scale-105 w-96 bg-gray-200 rounded-lg"> 
  <div className="relative w-full h-[200px]">
        <img src={main_Picture} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h2 className="text-2xl font-semibold text-gray-800 text-center truncate">{title}</h2>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 text-center text-sm truncate">{description}</p>
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
              <ConfirmationNumberIcon className="mr-1" /> {price.toFixed(2)}
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
            to={`/tourist-itinerary/${_id}`}
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
          {currentType==="admin"&&<div className="bg-yellow-500 text-white p-2 rounded-lg flex flex-col items-center w-1/2">
            <p className="text-sm flex items-center">
               {bookingActivated?"Booking Activated":"Booking Deactivated"}
            </p>
          </div>}
            </div>
          {currentType==="admin"&&<Button onClick={handleInappropriate}>
               {inappropriateV?"Declare appropriate":" Declare InAppropriate"}
            </Button>
          
          }
        </div>
      </div>
    
  );
};

export default ItineraryCardCRUDTourist;
