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
    <div className="flex justify-center items-center h-auto py-8 bg-gray-100 overflow-auto lasttimeipromise">
      <div className="flex flex-col mt-[300px] justify-start items-start">
        <div
          className="relative w-[700px] h-[200px] rounded-[20px] bg-cover bg-center"
          style={{ backgroundImage: `url(${itinerary.main_Picture})` }}
        >
          <p
            className="w-[690px] h-[50px] text-[20px] text-white break-words overflow-auto lasttimeipromise
             from-neutral-500 absolute bottom-[30px] left-[10px]"
            style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            {itinerary.title}
          </p>
          <img
            src={itinerary.added_By.profilepic}
            alt="Profile Picture"
            className="w-[25px] h-[25px] rounded-[25px] absolute bottom-[20px] left-[30px]"
          />

          <p
            className="w-[690px] h-[50px] text-[20px] text-white
             from-neutral-500 absolute top-[151px] left-[60px]"
            style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            {itinerary.added_By.username}
          </p>
        </div>

        <p>
          {formatDate(itinerary.starting_Date) +
            " → " +
            formatDate(itinerary.ending_Date)}
        </p>
        <p className="w-[200px] h-[30px] text-[16px]">
          {currentCurrency + " " + (itinerary.price * exchangeRate).toFixed(2)}
        </p>
        <p className="w-[700px] h-[90px] text-[28px]">
          {itinerary.description}
        </p>
        {itinerary.plan.map((plan) => (
          <Accordion
            key={itinerary._id}
            disableGutters
            sx={{
              width: "700px",
              backgroundColor: "transparent",
              borderRadius: "10px",
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
                borderRadius: "20px",
                marginBottom: "8px",
              }}
            >
              <div className="relative w-[600px] h-[130px] rounded-[20px]">
                <p
                  className="w-[150px] h-[60px] text-[35px] text-white absolute bottom-[10px] left-[10px]"
                  style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
                >
                  {plan.place.name}
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                borderRadius: "10px",
                borderColor: "transparent",
                boxShadow: "none",
                marginBottom: "16px",
              }}
            >
              <div className="flex flex-col w-[700px]">
                <div className="flex flex-col relative h-[170px] w-[650px]">
                  <span className="w-[10px] h-[170px] bg-black m-[30px] rounded-b-[3px] absolute rounded-t-[10px] top-[-30px] left-[-20px]" />
                  <line
                    className={`w-[1px] h-[250px] bg-black m-[30px] absolute top-[-46px] left-[-15px]`}
                    style={{ borderLeft: "1px solid black" }}
                  ></line>
                  <p className="text-[18px] ml-12 mt-0 mb-auto text-black">
                    {"Native: " +
                      currentCurrency +
                      " " +
                      (plan.place.ticket_price.native * exchangeRate).toFixed(
                        2
                      ) +
                      " "}
                    {"Foreign: " +
                      currentCurrency +
                      " " +
                      (plan.place.ticket_price.foreign * exchangeRate).toFixed(
                        2
                      ) +
                      " "}
                    {"Student: " +
                      currentCurrency +
                      " " +
                      (plan.place.ticket_price.student * exchangeRate).toFixed(
                        2
                      )}
                  </p>
                  <p className="text-[18px] h-[50px] mt-auto ml-12 text-black overflow-auto">
                    {plan.place.opening_hrs}
                  </p>
                  <p className="text-[18px] h-[100px] mt-auto ml-12 text-black overflow-auto break-words lasttimeipromise">
                    {plan.place.description}
                  </p>
                </div>
                {plan.activities.map((activity) => (
                  <div className="flex flex-row relative mt-[35px] w-[650px]">
                    <span className="w-[30px] h-[30px] bg-black m-[30px] rounded-[30px] absolute top-[-30px] left-[-30px]" />
                    <line
                      className={`w-[1px] h-[150px] bg-black m-[30px] absolute top-[0px] left-[-15px]`}
                      style={{ borderLeft: "1px solid black" }}
                    ></line>
                    <div className="w-[600px] h-[140px] rounded-[15px] bg-[#D9D9D9] ml-[60px] flex flex-row">
                      <div className="flex flex-col w-[250px]">
                        <p className="w-[250px] h-[35px] text-[26px] ml-2 mr-auto mt-0 mb-auto text-black">
                          {activity.activity_id.Title}
                        </p>
                        <p className="w-[250px] h-[30px] text-[16px] ml-2 mr-auto mt-0 mb-auto text-black">
                          {activity.activity_id.Category.name}
                        </p>
                        {activity.activity_id.SpecialDiscount >
                          activity.activity_id.Price ||
                        activity.activity_id.SpecialDiscount ===
                          activity.activity_id.Price ? (
                          <p className="w-[100px] h-[16px] text-[16px] ml-2 mr-auto mt-2 mb-4 text-black">
                            {currentCurrency +
                              " " +
                              (
                                activity.activity_id.Price * exchangeRate
                              ).toFixed(2)}
                          </p>
                        ) : (
                          <div className="relative h-[35px]">
                            <p className="w-[100px] h-[13px] text-[13px] ml-2 mr-auto mt-2 mb-1 text-red-500 line-through">
                              {currentCurrency +
                                " " +
                                (
                                  activity.activity_id.Price * exchangeRate
                                ).toFixed(2)}
                            </p>
                            <p className="w-[100px] h-[16px] text-[16px] absolute bottom-[10px] left-[70px] text-black">
                              {currentCurrency +
                                " " +
                                (
                                  activity.activity_id.SpecialDiscount *
                                  exchangeRate
                                ).toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col w-[130px] h-[140px]">
                        <p className="text-[12px] w-[130px] h-[24px] mt-2 mb-0 text-center">
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
                        <div className="flex flex-col w-[130px] h-[80px] overflow-auto lasttimeipromise">
                          {activity.activity_id.Tags.map(
                            (tag: TagStructure) => (
                              <Chip
                                key={tag._id}
                                label={tag.name}
                                color="info"
                                size="small"
                                sx={{
                                  width: "80px",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  marginTop: "3.5px",
                                }}
                              />
                            )
                          )}
                        </div>
                      </div>
                      <iframe
                        title="map"
                        className="rounded-r-[15px] mt-0 mb-auto mr-0 ml-auto w-[220px] h-[140px]"
                        src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${activity.activity_id.Location.longitude}!3d${activity.activity_id.Location.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                        width="220px"
                        height="140px"
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
        className="flex h-[100%] w-[500px] ml-2 mb-0 mt-auto"
        arrayofmarkers={locations}
      />
    </div>
  );
};

export default ItineraryDetailsTourist;
