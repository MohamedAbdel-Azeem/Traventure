import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useGetUpcoming from '../custom_hooks/itineraries/useGetupcoming';
import ItineraryCardToruist from './ItineraryCardToruist';
import { TouristProfileData } from '../routes/_app/tourist_profile/tourist_profile_data';
import IActivity from '../custom_hooks/activities/activity_interface';
import Place from '../custom_hooks/places/place_interface';
import LocationCardTourist from './LocationCardTourist';

const MorePlaces: React.FC = () => {
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

    const filteredPlaces = upcoming?.places
        .filter((place) => {
            const term = searchTerm.toLowerCase();
            if (searchType === 'name') {
                return place.name.toLowerCase().includes(term);
            } 
            return true; 
        })
        

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">All Places</h1>
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
                
            </div>

            <hr />
            <div className="overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="overflow-x-auto">
                <div className="flex gap-4 items-center">
                    {filteredPlaces && filteredPlaces.length > 0 ? (
                        filteredPlaces.map((location: Place) => (
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
                </div>
            </div>
            </div>
            </div>
        </>
    );
};

export default MorePlaces;
