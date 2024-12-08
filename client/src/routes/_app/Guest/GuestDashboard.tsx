import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUpcoming from "../../../custom_hooks/itineraries/useGetupcoming";
import ItineraryCardToruist from "../../../components/Itinerary/ItineraryCardToruist";
import LocationCardTourist from "../../../components/Locations/LocationCardTourist";
import { ActivityCardTourist } from "../../../components/Activities/ActivityCardTourist";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Slideshow from "../../../components/Slideshow";



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
    Welcome, Guest!
  </h1>
  <p className="mt-2 text-base text-white opacity-90">
    Sign in to explore the full features of the website.
  </p>
</header>
      


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
            <div className="flex gap-6 items-start">
              {itineraries.length > 0 ? (
                itineraries.map((itinerary) => (
                  <div className="w-96 flex-shrink-0" key={itinerary._id}>
                    <ItineraryCardToruist
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
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 mt-4"
                onClick={() => navigate(`/guest/more-itineraries`)}
              >
                <MoreHorizIcon className="w-6 h-6 text-white" />
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
                    <LocationCardTourist id={String(location._id)} wholeLocation={location} />
                  </div>
                ))
              ) : (
                <div>No upcoming places available.</div>
              )}
              <button
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 mt-4"
                onClick={() => navigate(`/guest/more-places`)}
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
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 mt-4"
                onClick={() => navigate(`/guest/more-activities`)}
              >
                <MoreHorizIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
      .overflow-x-auto {
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: #8b3fe8 #e0e0e0; 
      }

      .overflow-x-auto::-webkit-scrollbar {
        height: 8px;
      }

      .overflow-x-auto::-webkit-scrollbar-track {
        background: #e0e0e0; 
      }

      .overflow-x-auto::-webkit-scrollbar-thumb {
        background: #9b4d96; 
        border-radius: 10px;
      }
    `}</style>

    </>
  );
};

export default GuestDashboard;
