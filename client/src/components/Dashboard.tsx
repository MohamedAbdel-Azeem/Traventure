import React, { useEffect, useState } from "react";
import ItineraryCardToruist from "./Itinerary/ItineraryCardToruist";
import LocationCardTourist from "./Locations/LocationCardTourist";
import useGetUpcoming from "../custom_hooks/itineraries/useGetupcoming";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Activity,
  ActivityCardTourist,
} from "./Activities/ActivityCardTourist";
import axios from "axios";
import Itinerary from "../custom_hooks/itineraries/itinerarySchema";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Slideshow from "./Slideshow";

const Dashboard: React.FC = () => {
  const { upcoming, loading, error } = useGetUpcoming();
  const [bookmarkedItineraries, setBookmarkedItineraries] = useState<
    Itinerary[]
  >([]);
  const [bookmarkedActivities, setBookmarkedActivities] = useState<Activity[]>(
    []
  );
  const navigate = useNavigate();
  const currenttype = useLocation().pathname.split("/")[1];
  const { username } = useParams<{ username: string }>();
  const currentuser = username as string;

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (currenttype.includes("tourist")) {
          const response = await axios.get(
            `/traventure/api/tourist/bookmarks/${currentuser}`
          );
          setBookmarkedItineraries(response.data.bookmarkedItineraries);
          setBookmarkedActivities(response.data.bookmarkedActivities);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error Fetching: {error}</div>;
  }

  const itineraries = upcoming?.itineraries || [];
  const locations = upcoming?.places.slice(0, 5) || [];
  const activities = upcoming?.activities || [];
  let tourist_itineraries = itineraries.filter((itinerary) => {
    // Filter based on bookingActivated status depending on currentType
    if (currenttype === "admin") {
      // Example: check if user is an admin
      return true; // Admins see all itineraries
    } else {
      return itinerary.bookingActivated && !itinerary.inappropriate; // Non-admins see only activated itineraries
    }
  });

  let tourist_activities = activities.filter((activity) => {
    if (currenttype === "tourist" || currenttype === "guest")
      return !activity.inappropriate;
    return true;
  });

  tourist_activities = tourist_activities.slice(0, 5);
  tourist_itineraries = tourist_itineraries.slice(0, 5);

  const slideshowItems = [
    ...itineraries.map((itinerary) => ({
      image: itinerary.main_Picture, 
      title: itinerary.title,
    })),
    ...locations.map((location) => ({
      image: location.pictures?.[0] || '',
      title: location.name,
    })),
  ];

  return (
    <>
      {/* Page Header */}
        <Slideshow items={slideshowItems} />
     <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 py-6 min-h-[180px] text-center rounded-b-2xl shadow-lg mb-5">
  <h1 className="text-3xl font-extrabold text-white drop-shadow-md">
    Welcome Back, {currentuser}!
  </h1>
  <p className="mt-2 text-base text-white opacity-90">
    Plan your next adventure with ease. Check upcoming itineraries, places, and activities all in one place.
  </p>
</header>
    

      <hr></hr>

      {/* Upcoming Itineraries Section */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-1 mx-4 lg:mx-20 rounded-lg shadow-md mt-5">
      <section className="p-8 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <h2 className="text-3xl font-bold mb-2 text-gray-800 relative inline-block">
            Upcoming Itineraries
            <span className="block h-1 mt-2 bg-gradient-to-r from-purple-500 to-pink-500"></span>
          </h2>
          <p className="mb-6 text-gray-600">
            Stay on top of your travel plans with these upcoming trips.
          </p>
          <div className="overflow-x-auto">
            <div className="flex gap-12 items-start">
              {tourist_itineraries.length > 0 ? (
                tourist_itineraries.map((itinerary) => (
                  <div className="w-96 flex-shrink-0">
                    <ItineraryCardToruist
                      key={itinerary._id}
                      {...itinerary}
                      bookmarked={bookmarkedItineraries.some(
                        (bookmarkedItinerary) =>
                          bookmarkedItinerary._id === itinerary._id
                      )}
                    />
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic text-center">
                  No upcoming itineraries available.
                </div>
              )}
              <button
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 my-auto"
                onClick={() =>
                  navigate(`/${currenttype}/${currentuser}/itineraries`)
                }
              >
                <MoreHorizIcon className="w-6 h-6 text-white my-auto" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Upcoming Places Section */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-1 mx-4 lg:mx-20 rounded-lg shadow-md mt-5">
      <section className="p-8 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <h2 className="text-3xl font-bold mb-2 text-gray-800 relative inline-block">
            Upcoming Places
            <span className="block h-1 mt-2 bg-gradient-to-r from-purple-500 to-pink-500"></span>
          </h2>
          <p className="mb-6 text-gray-600">
            Explore new destinations you’re about to discover.
          </p>
          <div className="overflow-x-auto">
            <div className="flex gap-6 items-start">
              {locations.length > 0 ? (
                locations.map((location) => (
                  <div key={location._id} className="min-w-[600px]">
                    <LocationCardTourist
                      id={String(location._id)}
                      wholeLocation={location}
                    />
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">
                  No upcoming places available.
                </div>
              )}
              <button
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 my-auto"
                onClick={() =>
                  navigate(`/${currenttype}/${currentuser}/locations`)
                }
              >
                <MoreHorizIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Upcoming Activities Section */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-1 mx-4 lg:mx-20 rounded-lg shadow-md mt-5">
      <section className="p-8 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <h2 className="text-3xl font-bold mb-2 text-gray-800 relative inline-block">
            Upcoming Activities
            <span className="block h-1 mt-2 bg-gradient-to-r from-purple-500 to-pink-500"></span>
          </h2>
          <p className="mb-6 text-gray-600">
            Get ready for exciting activities for your journey.
          </p>
          <div className="overflow-x-auto">
            <div className="flex gap-6 items-start">
              {tourist_activities.length > 0 ? (
                tourist_activities.map((activity) => (
                  <ActivityCardTourist
                    key={activity._id}
                    activity={activity}
                    bookmarked={bookmarkedActivities.some(
                      (bookmarkedActivity) =>
                        bookmarkedActivity._id === activity._id
                    )}
                    {...(currenttype === "tourist" && { type: "tourist" })}
                  />
                ))
              ) : (
                <div className="text-gray-500 italic text-center">
                  No upcoming activities available.
                </div>
              )}
              <button
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 my-auto"
                onClick={() =>
                  navigate(`/${currenttype}/${currentuser}/activities`)
                }
              >
                <MoreHorizIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
