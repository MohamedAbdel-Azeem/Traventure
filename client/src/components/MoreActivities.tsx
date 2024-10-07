import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ActivityCardTourist } from './ActivityCardTourist';
import useGetAllActivitiesS from '../custom_hooks/activities/useGetActivities';
import IActivity from '../custom_hooks/activities/activity_interface'; 

const MoreActivities: React.FC = () => {
    const { sactivities, aloading, aerror } = useGetAllActivitiesS();
    const navigate = useNavigate();

    const [searchType, setSearchType] = useState<'name' | 'tag' | 'category'>('name');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredActivities = sactivities?.filter((activity: IActivity) => {
        const term = searchTerm.toLowerCase();
        if (searchType === 'name') {
            return activity.Title.toLowerCase().includes(term);
        } else if (searchType === 'tag') {
            return activity.Tags.some(tag => tag.name.toLowerCase().includes(term));  
        } else if (searchType === 'category') {
            return activity.Category.name.toLowerCase().includes(term); 
        }
        return true;
    });

    if (aloading) {
        return <div>Loading...</div>;
    }

    if (aerror) {
        return <div>Error Fetching Activities: {aerror}</div>;
    }

    return (
        <div className="flex">
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-4 mx-auto">All Activities</h1>
                <hr />
                <br />
                <div>
                    <div className="mb-4 flex gap-2">
                        <FormControl variant="outlined" className="min-w-[120px]">
                            <InputLabel id="search-type-label">Search By</InputLabel>
                            <Select
                                labelId="search-type-label"
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value as 'name' | 'tag' | 'category')}
                                label="Search By"
                            >
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="tag">Tag</MenuItem>
                                <MenuItem value="category">Category</MenuItem>
                            </Select>
                        </FormControl>
                        <input
                            type="text"
                            placeholder={`Search by ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredActivities && filteredActivities.length > 0 ? (
                            filteredActivities.map((activity: IActivity) => (
                                <ActivityCardTourist
                                    key={activity._id}
                                    activity={activity}
                                    onDelete={(_id) => {
                                        console.log(`Delete activity with id: ${_id}`);
                                    }}
                                />
                            ))
                        ) : (
                            <div>No activities found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreActivities;
