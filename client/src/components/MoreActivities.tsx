import React, { useState, useEffect } from 'react';
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
import {useGetAllActivitiesS} from '../custom_hooks/activities/useGetActivities';
import IActivity from '../custom_hooks/activities/activity_interface';
import { useGetAllCategories } from '../custom_hooks/categoryandTagCRUD';
import Activity from '../custom_hooks/activities/activity_interface';

const MoreActivities: React.FC = () => {
    const { sactivities, aloading, aerror } = useGetAllActivitiesS();

    const { data: catData } = useGetAllCategories(); 

    const [categoryTerms, setCategoryTerms] = useState<string[]>([]); 


    
    
    const [selectedCat, setSelectedCats] = useState<string[]>([]);

    const navigate = useNavigate();

    const [searchType, setSearchType] = useState<'name' | 'tag' | 'category'>('name');
    const [searchTerm, setSearchTerm] = useState('');

    const [filterType, setFilterType] = useState<'budget' | 'date' | 'category' | 'rating'>('budget');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [categoryTerm, setCategoryTerm] = useState('');

    const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        if (filterType === 'date') {
            const today = new Date();
            const start = new Date();
            const end = new Date();
            start.setFullYear(today.getFullYear() - 1);
            end.setFullYear(today.getFullYear() + 1);
            setStartDate(start.toISOString().split('T')[0]);
            setEndDate(end.toISOString().split('T')[0]);
        }
    }, [filterType]);

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
    }).filter((activity: IActivity) => {
        switch (filterType) {
            case 'budget':
                return activity.Price >= minPrice && activity.Price <= maxPrice;
            case 'date':
                const activityDate = new Date(activity.DateAndTime);
                return activityDate >= new Date(startDate) && activityDate <= new Date(endDate);
            case 'category':
                return categoryTerms.length === 0 || categoryTerms.includes(activity.Category.name);
            case 'rating':
                return calculateAverageRating(activity) >= 4;
            default:
                return true;
        }
    });

    const calculateAverageRating = (currentActivity: Activity): number => {
        const allRatings = currentActivity.feedback?.map(fb => parseFloat(fb.rating));
        const totalRating = allRatings?.reduce((acc, rating) => acc + rating, 0);
        return allRatings?.length ? totalRating / allRatings?.length : 0;
      };
    
    
    const sortedActivities = [...(filteredActivities ?? [])].sort((a: IActivity, b: IActivity) => {
        let comparison = 0;

        if (sortBy === 'price') {
            comparison = a.Price - b.Price;
        } else if (sortBy === 'rating') {
            console.log('SORT RATING HERE')
            comparison = calculateAverageRating(a) - calculateAverageRating(b);
        }

       
        return sortOrder === 'asc' ? comparison : -comparison;
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

                    <div className="mb-4 flex gap-2">
                        <FormControl variant="outlined" className="min-w-[120px]">
                            <InputLabel id="filter-type-label">Filter By</InputLabel>
                            <Select
                                labelId="filter-type-label"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value as 'budget' | 'date' | 'category' | 'rating')}
                                label="Filter By"
                            >
                                <MenuItem value="budget">Budget</MenuItem>
                                <MenuItem value="date">Date</MenuItem>
                                <MenuItem value="category">Category</MenuItem>
                                <MenuItem value="rating">Rating</MenuItem>
                            </Select>
                        </FormControl>

                        {filterType === 'budget' && (
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="border p-2 rounded"
                                />
                            </div>
                        )}

                        {filterType === 'date' && (
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border p-2 rounded"
                                />
                            </div>
                        )}

                        {filterType === 'category' && (
                           <div className="flex gap-2">
                           <FormControl variant="outlined" className="min-w-[120px]">
                               <InputLabel id="category-select-label">Categories</InputLabel>
                               <Select
                                   labelId="category-select-label"
                                   multiple
                                   value={categoryTerms}
                                   onChange={(e) => setCategoryTerms(e.target.value as string[])}
                                   label="Categories"
                               >
                                   {catData.map((category) => (
                                       <MenuItem key={category} value={category}>
                                           {category}
                                       </MenuItem>
                                   ))}
                               </Select>
                           </FormControl>
                       </div>
                        )}
                    </div>

                    <div className="mb-4 flex gap-2">
                        <FormControl variant="outlined" className="min-w-[120px]">
                            <InputLabel id="sort-type-label">Sort By</InputLabel>
                            <Select
                                labelId="sort-type-label"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'price' | 'rating')}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedActivities && sortedActivities.length > 0 ? (
                            sortedActivities.map((activity: IActivity) => (
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
