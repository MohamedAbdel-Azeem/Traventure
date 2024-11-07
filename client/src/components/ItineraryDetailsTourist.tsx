import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  AccordionDetails,
  Select,
  MenuItem,
  AccordionSummary,
  Chip,
  Rating,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import IActivity from "../custom_hooks/activities/activity_interface";
import { TouristProfileData } from "../routes/_app/tourist_profile/tourist_profile_data";
import Place from "../custom_hooks/places/place_interface";
import { useGetItineraryID } from "../custom_hooks/itineraries/useGetItinerary";
import TheBIGMAP from "./TheBIGMAP";

import { useSelector } from "react-redux";
import { Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
}

const ItineraryDetailsTourist: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split(`/`)[2];
  const { itinerary: initialItinerary } = useGetItineraryID(id);
  const [itinerary, setItinerary] = useState<Itinerary | null>(
    initialItinerary
  );

  useEffect(() => {
    if (initialItinerary) {
      setItinerary(initialItinerary);
    }
  }, [initialItinerary]);
  console.log(itinerary);



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
    <Box className="flex justify-center items-center h-auto py-12 bg-gray-100">
      <div className="flex flex-col">
        <img
          src={itinerary.main_Picture}
          alt="Itinerary Main Picture"
          className="w-[827px] h-[252px] rounded-[33px] object-cover"
        />
        <div className="relative w-[827px] h-[161px] rounded-[33px]">
          <p
            className="w-[817px] h-[61px] text-[40px] text-white from-neutral-500 absolute bottom-[200px] left-[10px]"
            style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            {itinerary.title}
          </p>
        </div>
        
        <p>
          {formatDate(itinerary.starting_Date)+"→"+formatDate(itinerary.ending_Date)}
          </p>
        <p className="w-[263px] h-[41px] text-[20px]">
          {currentCurrency+" "+(itinerary.price*exchangeRate).toFixed(2)}
        </p>
        <p className="w-[827px] h-[115px] text-[34px]">
          {itinerary.description}
        </p>
        {itinerary.plan.map((plan) => (
          <Accordion
          key={itinerary._id}
          disableGutters
          sx={{
            width: "883px",
            backgroundColor: "transparent",
            borderRadius: "15px",
            borderColor: "transparent",
            boxShadow: "none",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon fontSize="large" sx={{ color: "black" }} />
            }
            sx={{
              backgroundImage: `url(${plan.place.pictures[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "unset",
              backgroundColor: "#413B3B",
              borderRadius: "33px",
              marginBottom: "8px",
            }}
          >
            <div className="relative w-[827px] h-[161px] rounded-[33px]">
              <p
                className="w-[193px] h-[81px] text-[45px] text-white absolute bottom-[10px] left-[10px]"
                style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                {plan.place.name}
              </p>
            </div>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderRadius: "15px",
              borderColor: "transparent",
              boxShadow: "none",
              marginBottom: "16px",
            }}
          >
            <div className="flex flex-col w-[827px]">
              <div className="flex flex-col relative h-[213px] w-[768px]">
                <span className="w-[13px] h-[213px] bg-black m-[37px] rounded-b-[3px] absolute rounded-t-[13px] top-[-36px] left-[-20px]" />
                <line
                  className={`w-[1px] h-[${200+(1+(plan.activities.length)*200)}px] bg-black m-[37px] absolute top-[-53px] left-[-14px]`}
                  style={{ borderLeft: "1px solid black" }}
                >

                </line>
                <p className="text-[22px] ml-12 mt-0 mb-auto text-black">
                  {"Native:"+currentCurrency+" "+(plan.place.ticket_price.native*exchangeRate).toFixed(2)+" "}
                  
                  {"Foreign:"+currentCurrency+" "+(plan.place.ticket_price.foreign*exchangeRate).toFixed(2)+" "}
                  
                  {"Student:"+currentCurrency+" "+(plan.place.ticket_price.student*exchangeRate).toFixed(2)}
                </p>
                
                <p className="text-[22px] h-[120px] mt-auto ml-12 text-black overflow-auto lasttimeipromise">
                  {plan.place.description}
                </p>
              </div>
              {plan.activities.map((activity) => (
                <div className="flex flex-row relative mt-[43px] w-[768px]">
                  <span className="w-[37px] h-[37px] bg-black m-[37px] rounded-[37px] absolute top-[-36px] left-[-32px]" />
                  <div className="w-[700px] h-[168px] rounded-[20px] bg-[#D9D9D9] ml-[70px] flex flex-row">
                    <div className="flex flex-col w-[308px]">
                      <p className="w-[308px] h-[42px] text-[32px] ml-2 mr-auto mt-0 mb-auto text-black">
                        {activity.activity_id.Title}
                      </p>
                      <p className="w-[308px] h-[37px] text-[20px] ml-2 mr-auto mt-0 mb-auto text-black">
                        {activity.activity_id.Category.name}
                      </p>
                      {activity.activity_id.SpecialDiscount >
                      activity.activity_id.Price ? (
                        <p className="w-[62px] h-[20px] text-[20px] ml-5 mr-auto mt-auto mb-5 text-black">
                          {activity.activity_id.Price}
                        </p>
                      ) : (
                        <div className="relative">
                          <p className="w-[61px] h-[16px] text-[16px] ml-5 mr-auto mt-0 mb-5 text-red-500 line-through">
                            {activity.activity_id.Price}
                          </p>
                          <p className="w-[62px] h-[20px] text-[20px] absolute bottom-[7px] left-[40px] text-black">
                            {activity.activity_id.SpecialDiscount}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-[130px] h-[168px]">
                      <p className="text-[15px] w-[130px] h-[30px] mt-2 mb-0 text-center">
                        {formatDate(
                          activity.activity_id.DateAndTime.split("T")[0]
                        )}
                      </p>
                      <Rating
                        name="read-only"
                        value={activity.activity_id.rating}
                        readOnly
                        sx={{
                          marginTop: "2px",
                          marginBottom: "5px",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                      <div className="flex flex-col w-[130px] h-[100px] overflow-auto lasttimeipromise">
                        {activity.activity_id.Tags.map((tag: TagStructure) => (
                          <Chip
                            key={tag._id}
                            label={tag.name}
                            color="info"
                            size="small"
                            sx={{
                              width: "100px",
                              marginLeft: "auto",
                              marginRight: "auto",
                              marginTop: "3.5px",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <iframe
                      title="map"
                      className="rounded-r-[20px] mt-0 mb-auto mr-0 ml-auto w-[262px] h-[168px]"
                      src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${activity.activity_id.Location.longitude}!3d${activity.activity_id.Location.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                      width="400px"
                      height="166px"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        ))}
        
      </div>

      <TheBIGMAP
        id="bigmap"
        className="flex h-[979px] w-[576px] ml-2 mb-0 mt-auto"
        arrayofmarkers={locations}
      />
    </Box>
  );
};

export default ItineraryDetailsTourist;
