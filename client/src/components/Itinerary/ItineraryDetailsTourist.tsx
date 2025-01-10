import React, { useEffect, useState } from "react";
import {
  Box,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Rating,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import {IActivity} from "../../custom_hooks/activities/activity_interface";
import { TouristProfileData } from "../../routes/_app/Tourist/tourist_profile/tourist_profile_data";
import Place from "../../custom_hooks/places/place_interface";
import { useGetItineraryID } from "../../custom_hooks/itineraries/useGetItinerary";
import TheBIGMAP from "../Maps/TheBIGMAP";

import { useSelector } from "react-redux";
import { Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaUserAlt, FaUserGraduate, FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaTags } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import { GiTicket } from 'react-icons/gi';

interface TagStructure {
  _id: string;
  name: string;
  __v: number;
}

interface Itinerary {
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
    place: Place;
    activities: IActivity[];
  }[];
  booked_By: {
    user_id?: TouristProfileData;
  }[];
  accesibility: boolean;
  allowBooking: boolean;
  
  InterestedUsers: {
    user_id?: TouristProfileData;
  }[];
}

const ItineraryDetailsTourist: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split(`/`)[5];
  const { itinerary: initialItinerary } = useGetItineraryID(id);
  const [itinerary, setItinerary] = useState<Itinerary | null>(
    initialItinerary
  );

  useEffect(() => {
    if (initialItinerary) {
      setItinerary(initialItinerary);
    }
  }, [initialItinerary]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );

  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );
  if (!itinerary) return <p>No itinerary data found</p>;
  const locations = [];
  locations.push(itinerary.pickup_location);
  locations.push(itinerary.dropoff_location);
  itinerary.plan.forEach((item) => {
    if (item.place && item.place.location) {
      locations.push(item.place.location);
    }
  });

  return (
<div className="flex justify-center items-center py-8 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 overflow-auto">
<div className="flex flex-col mt-[150px] justify-start items-start w-full max-w-3xl mx-auto">
      <div
  className="relative w-full h-[350px] rounded-[20px] bg-cover bg-center shadow-lg transform transition-all hover:scale-105"
  style={{ backgroundImage: `url(${itinerary.main_Picture})` }}
>
  <p
    className="absolute bottom-[60px] left-[20px] w-[90%] text-[24px] text-white font-bold break-words overflow-auto"
    style={{
      textShadow: "0 4px 6px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)" 
    }}
  >
    {itinerary.title}
  </p>
  <div className="absolute bottom-[20px] left-[20px] flex items-center">
    <img
      src={itinerary.added_By.profilepic}
      alt="Profile Picture"
      className="w-[35px] h-[35px] rounded-full"
    />
    <p
      className="ml-2 text-[18px] text-white font-semibold"
      style={{
        textShadow: "0 4px 6px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)" 
      }}
    >
      {itinerary.added_By.username}
    </p>
  </div>
</div>


  
        <div className="mt-6 space-y-4">
          <p className="text-[18px] font-semibold text-gray-700">
            {formatDate(itinerary.starting_Date)} → {formatDate(itinerary.ending_Date)}
          </p>
          <p className="text-[18px] font-medium text-gray-700">
            {currentCurrency} {(itinerary.price * exchangeRate).toFixed(2)}
          </p>
          <p className="text-[20px] text-gray-800 leading-relaxed">
            {itinerary.description}
          </p>
        </div>
  
        <div className="space-y-4 mt-6">
          {itinerary.plan.map((plan) => (
            <Accordion
              key={itinerary._id}
              disableGutters
              sx={{
                width: "200%",
                backgroundColor: "transparent",
                borderRadius: "10px",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" sx={{ color: "#fff" }} />}
                sx={{
                  backgroundImage: `url(${plan.place.pictures[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "15px",
                  minHeight: "unset",
                  marginBottom: "12px",
                }}
              >
                <div className="relative w-full h-[160px] rounded-[15px]">
                  <p
                    className="absolute bottom-[10px] left-[20px] text-[30px] text-white font-bold"
                    style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.6)" }}
                  >
                    {plan.place.name}
                  </p>
                </div>
              </AccordionSummary>
  
              

<AccordionDetails sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "20px", padding: "25px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
  <div className="flex flex-col space-y-8 w-full">
    
    {/* Ticket Pricing Section */}
    <div className="flex flex-col space-y-4 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
      <div className="flex items-center space-x-3 text-gray-800 text-lg font-semibold">
        <GiTicket className="text-purple-600 text-2xl" />
        <span>Native:</span>
        <span className="text-purple-600">{currentCurrency} {(plan.place.ticket_price.native * exchangeRate).toFixed(2)}</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-800 text-lg font-semibold">
        <FaGlobe className="text-blue-600 text-2xl" />
        <span>Foreign:</span>
        <span className="text-blue-600">{currentCurrency} {(plan.place.ticket_price.foreign * exchangeRate).toFixed(2)}</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-800 text-lg font-semibold">
        <FaUserGraduate className="text-green-600 text-2xl" />
        <span>Student:</span>
        <span className="text-green-600">{currentCurrency} {(plan.place.ticket_price.student * exchangeRate).toFixed(2)}</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-600">
        <MdAccessTime className="text-yellow-500 text-xl" />
        <span>{plan.place.opening_hrs}</span>
      </div>
      <p className="text-[16px] text-gray-600 break-words leading-relaxed italic">{plan.place.description}</p>
    </div>

    {/* Activities Section */}
    {plan.activities.map((activity) => (
      <div className="flex space-x-6 items-start bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
        
        {/* Activity Icon */}
        <div className="flex-shrink-0">
          <span className="w-[55px] h-[55px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
            <FaTags />
          </span>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <p className="text-[22px] text-gray-800 font-bold">{activity.activity_id.Title}</p>
            <p className="text-[16px] text-gray-500 flex items-center space-x-2">
              <FaTags className="text-gray-400" />
              <span>{activity.activity_id.Category.name}</span>
            </p>
          </div>

          {/* Price Section */}
          <div className="flex justify-between mt-2">
            {activity.activity_id.SpecialDiscount >= activity.activity_id.Price ? (
              <p className="text-[16px] text-red-500 font-bold">
                {currentCurrency} {(activity.activity_id.Price * exchangeRate).toFixed(2)}
              </p>
            ) : (
              <div className="relative">
                <p className="text-[16px] text-gray-500 line-through">
                  {currentCurrency} {(activity.activity_id.Price * exchangeRate).toFixed(2)}
                </p>
                <p className="absolute bottom-0 left-[70px] text-[16px] text-green-500 font-semibold">
                  {currentCurrency} {(activity.activity_id.SpecialDiscount * exchangeRate).toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Date */}
          <p className="text-[16px] text-gray-700 mt-2 flex items-center space-x-2">
            <FaCalendarAlt className="text-blue-400" />
            <span>{formatDate(activity.activity_id.DateAndTime.split("T")[0])}</span>
          </p>

          {/* Rating */}
          <Rating
            name="read-only"
            value={activity.activity_id.rating}
            readOnly
            sx={{ marginTop: "8px", marginBottom: "5px" }}
          />

          {/* Tags */}
          <div className="flex flex-wrap space-x-2 mt-2">
            {activity.activity_id.Tags.map((tag) => (
              <Chip
                key={tag._id}
                icon={<FaTags />}
                label={tag.name}
                color="primary"
                size="small"
                sx={{ marginTop: "5px" }}
              />
            ))}
          </div>
        </div>

        {/* Google Map iframe */}
        <iframe
          title="map"
          className="rounded-xl border-2 border-gray-200 shadow-md w-[220px] h-[150px] hover:shadow-lg hover:scale-105 transition-transform"
          src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${activity.activity_id.Location.longitude}!3d${activity.activity_id.Location.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
        ></iframe>
      </div>
    ))}
  </div>
</AccordionDetails>


            </Accordion>
          ))}
        </div>
      </div>
      <div className="w-px h-full bg-gray-400 mx-11"></div>

      <div className="flex flex-col justify-start items-center w-[500px] mt-8">
        <TheBIGMAP id="bigmap" arrayofmarkers={locations} />
      </div>
    </div>
  );
  
};

export default ItineraryDetailsTourist;
