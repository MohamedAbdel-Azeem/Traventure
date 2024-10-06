import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useGetUpcoming from '../custom_hooks/itineraries/useGetupcoming';
import ItineraryCardToruist from './ItineraryCardToruist';
import { TouristProfileData } from '../routes/_app/tourist_profile/tourist_profile_data';
import IActivity from '../custom_hooks/activities/activity_interface';
import Place from '../custom_hooks/places/place_interface';

const MoreItineraries: React.FC = () => {
    const { upcoming, loading, error } = useGetUpcoming();
    const navigate = useNavigate();

    const [searchType, setSearchType] = useState<'name' | 'tag'>('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState<'price' | 'rating'>('price');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error Fetching: {error}</div>;
    }

    const filteredItineraries = upcoming?.itineraries
        .filter((itinerary) => {
            const term = searchTerm.toLowerCase();
            if (searchType === 'name') {
                return itinerary.title.toLowerCase().includes(term);
            } else if (searchType === 'tag') {
                return itinerary.selectedTags?.some(tag => tag.name.toLowerCase().includes(term)) ?? false;
            }
            return true; 
        })
        .sort((a, b) => {
            const sortFactor = sortOrder === 'asc' ? 1 : -1;
            if (sortType === 'price') {
                const aPrice = a.price ?? 0;
                const bPrice = b.price ?? 0;
                return (aPrice - bPrice) * sortFactor;
            } else if (sortType === 'rating') {
                const aRating = a.rating ?? 0;
                const bRating = b.rating ?? 0;
                return (aRating - bRating) * sortFactor; 
            }
            return 0;
        });

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">All Itineraries</h1>
            <hr />
            <br />

            <div className="mb-4 flex gap-2">
                <FormControl variant="outlined" className="min-w-[120px]">
                    <InputLabel id="search-type-label">Search By</InputLabel>
                    <Select
                        labelId="search-type-label"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value as 'name' | 'tag')}
                        label="Search By"
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="tag">Tag</MenuItem>
                    </Select>
                </FormControl>
                <input
                    type="text"
                    placeholder={`Search by ${searchType === 'name' ? 'Name' : 'Tag'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded"
                />
                <FormControl variant="outlined" className="min-w-[120px]">
                    <InputLabel id="sort-type-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-type-label"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value as 'price' | 'rating')}
                        label="Sort By"
                    >
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className="min-w-[120px]">
                    <InputLabel id="sort-order-label">Order</InputLabel>
                    <Select
                        labelId="sort-order-label"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        label="Order"
                    >
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <hr />
            <div className="overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredItineraries?.length ?? 0 > 0 ? (
                        (filteredItineraries ?? []).map((itinerary: {
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
                            main_Picture?: string; 
                            selectedTags?: { _id: string; name: string; __v: number; }[]; 
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
                                selectedTags={itinerary.selectedTags}
                                main_Picture={itinerary.main_Picture}
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
