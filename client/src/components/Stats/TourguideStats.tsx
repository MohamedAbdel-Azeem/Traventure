import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState, MouseEvent, useEffect } from "react";
import AdvGuideRevenue from "./AdvGuideRevenue";
import AdvGuideUsers from "./AdvGuideUsers";
import axios from "axios";
import { useParams } from "react-router-dom";

export type Itinerary = {
  _id: string;
  title: string;
};
export const TourguideStats = () => {
  const [revenueView, setRevenueView] = useState(false);

  const handleViewChange = (event: MouseEvent, value: boolean) => {
    setRevenueView(value);
  };
  const username = useParams().username;
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/traventure/api/itinerary/${username}`).then((res) => {
        setItineraries(res.data);
        console.log(res.data);
      });
    };
    fetchData();
  }, []);
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const months = [
    "ALL",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <h1 className="font-sans text-xl font-medium">Revenue and Statistics</h1>
      <ToggleButtonGroup
        color="primary"
        value={revenueView}
        exclusive
        onChange={handleViewChange}
        aria-label="Platform"
      >
        <ToggleButton value={true}>Revenue</ToggleButton>
        <ToggleButton value={false}>Tourist Count</ToggleButton>
      </ToggleButtonGroup>
      <div className="flex flex-row gap-3">
        <select
          className="p-2 border rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        {itineraries && (
          <select
            className="p-2 border rounded"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
          >
            <option value="">All Itineraries</option>
            {itineraries.map((itinerary, index) => (
              <option key={index} value={itinerary.title}>
                {(itinerary as Itinerary).title}
              </option>
            ))}
          </select>
        )}
      </div>
      {revenueView ? (
        <AdvGuideRevenue
          month={selectedMonth}
          actItenName={selectedActivity}
          type={"tourguide"}
          username={username ? username : ""}
        />
      ) : (
        <AdvGuideUsers
          month={selectedMonth}
          actItenName={selectedActivity}
          type={"tourguide"}
          username={username ? username : ""}
        />
      )}
    </div>
  );
};
