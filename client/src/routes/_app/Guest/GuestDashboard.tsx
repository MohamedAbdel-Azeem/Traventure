import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUpcoming from "../../../custom_hooks/itineraries/useGetupcoming";
import ItineraryCardToruist from "../../../components/Itinerary/ItineraryCardToruist";
import LocationCardTourist from "../../../components/Locations/LocationCardTourist";
import { ActivityCardTourist } from "../../../components/Activities/ActivityCardTourist";


const GuestDashboard = () => {
  const { upcoming, loading, error } = useGetUpcoming();
  const navigate = useNavigate();
  const currentuser = useLocation().pathname.split("/")[2];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error Fetching: {error}</div>;
  }

  const itineraries = upcoming?.itineraries.slice(0, 5) || [];
  const locations = upcoming?.places.slice(0, 5) || [];
  const activities = upcoming?.activities.slice(0, 5) || [];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Upcoming Itineraries</h1>
      <div className="overflow-x-auto">
        <div className="flex gap-4 items-center">
          {itineraries.length > 0 ? (
            itineraries.map((itinerary) => (
              <div className="w-96 flex-shrink-0">
              <ItineraryCardToruist
                key={itinerary._id}
                _id={String(itinerary._id)}
                title={itinerary.title}
                description={itinerary.description}
                added_By={itinerary.added_By}
                price={itinerary.price}
                starting_Date={itinerary.starting_Date}
                ending_Date={itinerary.ending_Date}
                rating={itinerary.rating}
                total={itinerary.total}
                language={itinerary.language}
                pickup_location={itinerary.pickup_location}
                dropoff_location={itinerary.dropoff_location}
                plan={itinerary.plan}
                selectedTags={itinerary.selectedTags}
                main_Picture={itinerary.main_Picture}
                accesibility={itinerary.accesibility}
                booked_By={itinerary.booked_By}
                bookingActivated={false}
                inappropriate={false}
              />
              </div>
            ))
          ) : (
            <div>No upcoming itineraries available.</div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => navigate(`/guest/more-itineraries`)}
          >
            View More
          </button>
        </div>
      </div>

      {/* Upcoming Places */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Upcoming Places</h1>
      <div className="overflow-x-auto">
        <div className="flex gap-4 items-center">
          {locations.length > 0 ? (
            locations.map((location) => (
              <LocationCardTourist
                key={location._id}
                id={String(location._id)}
                wholeLocation={location}
              />
            ))
          ) : (
            <div>No upcoming places available.</div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => navigate(`/guest/more-places`)}
          >
            View More
          </button>
        </div>
      </div>

      {/* Upcoming Activities */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Upcoming Activities</h1>
      <div className="overflow-x-auto">
        <div className="flex gap-4 items-center">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCardTourist
                key={activity._id}
                activity={activity}
              />
            ))
          ) : (
            <div>No upcoming activities available.</div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => navigate(`/guest/more-activities`)}
          >
            View More
          </button>
        </div>
      </div>
    </>
  );
};

export default GuestDashboard;
