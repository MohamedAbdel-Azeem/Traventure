import React from 'react';
import ItineraryCardCRUD from '../ItineraryCardCRUD';
import useGetUpcoming from '../../custom_hooks/itineraries/useGetupcoming';
import IActivity from '../../custom_hooks/activities/activity_interface';
import Place from '../../custom_hooks/places/place_interface';
import { TouristProfileData } from '../../routes/_app/tourist_profile/tourist_profile_data';
import { useNavigate } from 'react-router-dom';
import LocationCardCRUD from '../LocationCardCRUD';
import LocationCardTourist from '../LocationCardTourist';

const Dashboard = () => {
    const { upcoming, loading, error } = useGetUpcoming();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error Fetching: {error}</div>;
    }

    const itineraries = upcoming?.itineraries.slice(0, 5) || [];
    const locations = upcoming?.places.slice(0, 5) || [];

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Upcoming Itineraries</h1>
            <div className="overflow-x-auto">
                <div className="flex gap-4 items-center">
                    {itineraries.length > 0 ? (
                        itineraries.map((itinerary: { _id: React.Key | null | undefined; title: string; description: string; added_By: string; price: number; starting_Date: string; ending_Date: string; rating: number; total: number; language: string; pickup_location: string; dropoff_location: string; plan: { place?: Place; activities: { activity_id?: IActivity; activity_duration: number; time_unit: string; }[]; }[]; booked_By: { user_id?: TouristProfileData; }[]; accesibility: boolean; }) => (
                            <ItineraryCardCRUD
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
                                booked_By={itinerary.booked_By}
                                accesibility={itinerary.accesibility}
                              
                            />
                        ))
                    ) : (
                        <div>No upcoming itineraries available.</div>
                    )}
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => navigate('/more-itineraries')}
                    >
                        View More
                    </button>
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-8 mb-4">Upcoming Places</h1>
            <div className="overflow-x-auto">
                <div className="flex gap-4 items-center">
                    {locations.length > 0 ? (
                        locations.map((location: Place) => (
                            <LocationCardTourist
                                key={location._id}
                                id={String(location._id)}
                                wholeLocation={location}
                                onDelete={function (id: string): void {
                                    throw new Error('Function not implemented.');
                                }}
                                className=""
                            />
                        ))
                    ) : (
                        <div>No upcoming places available.</div>
                    )}
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => navigate('/more-places')}
                    >
                        View More
                    </button>
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-8 mb-4">Upcoming Activities</h1>
            {/* Insert Activity Cards here */}
        </>
    );
};

export default Dashboard;