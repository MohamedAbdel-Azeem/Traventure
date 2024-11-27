// Bookmarks.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ItineraryCardToruist from '../../../../components/Itinerary/ItineraryCardToruist';
import { Activity, ActivityCardTourist } from '../../../../components/Activities/ActivityCardTourist';
import Itinerary from '../../../../custom_hooks/itineraries/itinerarySchema';

const Bookmarks = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currenttype = useLocation().pathname.split("/")[1];
  const currentuser = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`/traventure/api/tourist/bookmarks/${currentuser}`);
        setItineraries(response.data.bookmarkedItineraries);
        setActivities(response.data.bookmarkedActivities);
      } catch (err : any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl p-2 font-bold mb-4">Itineraries</h1>
      <div className="overflow-x-auto">
      <div className="flex gap-4 items-center">
      {itineraries.length === 0 ? (
        <div>No bookmarked Itineraries found</div>
      ) : (
    
          itineraries.map((itinerary) => (
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
             bookingActivated={itinerary.bookingActivated}
             inappropriate={itinerary.inappropriate}
             bookmarked={true}
           />
          ))
      )}
        </div>
        </div>

    <h1 className="text-2xl p-2 font-bold mt-8 mb-4">Activities</h1>
      <div className="overflow-x-auto">
        <div className="flex gap-4 items-center">
        {activities.length === 0 ? (
            <div>No bookmarked Activities found</div>
        ) : (

            activities.map((activity) => (
              <ActivityCardTourist
                key={activity._id}
                activity={activity}
                bookmarked={true}
                {...(currenttype === "tourist" && { type: "tourist" })}
              />
            ))
        )}
        </div>
        </div>
        

    </div>
  );
};

export default Bookmarks;