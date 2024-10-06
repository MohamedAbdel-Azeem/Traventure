import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useGetUpcoming from '../custom_hooks/itineraries/useGetupcoming';
import ItineraryCardToruist from './ItineraryCardToruist';
import { TouristProfileData } from '../routes/_app/tourist_profile/tourist_profile_data';
import IActivity from '../custom_hooks/activities/activity_interface';
import Place from '../custom_hooks/places/place_interface';

const MoreItineraries: React.FC = () => {
    const { upcoming, loading, error } = useGetUpcoming();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error Fetching: {error}</div>;
    }
  
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">All Itineraries</h1>
            <hr></hr>
            <br></br>

            {/* Insert Search and filter and sort here */}
                


            <hr></hr>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {upcoming && upcoming.itineraries.length > 0 ? (
                        upcoming.itineraries.map((itinerary: {
                            _id: React.Key | null | undefined;
                            title: string;
                            description: string;
                            added_By: string;
                            price: number;
                            starting_Date: string;
                            ending_Date: string;
                            rating: number;
                            total: number;
                            language: string;
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
                            booked_By: { user_id?: TouristProfileData }[];
                            accesibility: boolean;
                        }) => (
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
                                booked_By={itinerary.booked_By}
                                accesibility={itinerary.accesibility}
                            />
                        ))
                    ) : (
                        <div>No Itineraries Available</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MoreItineraries;
