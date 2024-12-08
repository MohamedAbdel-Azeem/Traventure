import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Modal,
  Rating,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  useGetAllCategoriesD,
  useGetAllTags,
} from "../../custom_hooks/categoryandTagCRUD";
import useBookActivity from "../../custom_hooks/activities/bookActivity";

import useBookmarkActivity from "../../custom_hooks/activities/bookmarkActivity";
import { updateActivity } from "../../custom_hooks/activities/updateActivity";

import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import BookmarkIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ClipLoader from 'react-spinners/ClipLoader';
import BlockIcon from '@mui/icons-material/Block';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";




import TheBIGMAP from "../Maps/TheBIGMAP";

export type Activity = {
  _id: string;
  Title: string;
  DateAndTime: Date;
  Location: {
    latitude: number;
    longitude: number;
  };
  Price: number;
  SpecialDiscount: number;
  Category: CatStructure;
  Tags: CatStructure[];
  BookingIsOpen: boolean;
  added_By: string;
  feedback?: {
    name: string;
    rating: string;
    review: string;
  }[];
  inappropriate: boolean;
};
interface ActivityProp {
  activity: Activity;
  type?: string;
  bookmarked?: boolean;
}

type CatStructure = {
  _id: string;
  name: string;
  __v: number;
};

export const ActivityCardTourist: React.FC<ActivityProp> = ({
  type,
  activity,
  bookmarked
}) => {
  const currentuser = useLocation().pathname.split("/")[2];
  const currpath = useLocation().pathname.split("/")[3];
  const currenttype = useLocation().pathname.split("/")[1];
  const [newDate, setNewDate] = useState(new Date(activity.DateAndTime));
  const [newBIO, setNewBIO] = useState(activity.BookingIsOpen);
  const [mopen, setmOpen] = useState(false);
  const { username } = useParams<{ username: string }>();

  const { bookActivity, data, loading, error } = useBookActivity();
  const { bookmarkActivity,loading:loadingBookmark } = useBookmarkActivity();
  const [inappropriate, setInappropriate] = useState(
    activity.inappropriate
  );
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewMap = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  const handleInappropriate = async () => {
    try {
      const response = await axios.patch(
        `/traventure/api/activity/toggleInappropriate/${activity._id}`
      );
      if (response.status === 200) {
        setInappropriate(!inappropriate);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.error(error.response.data.message);
      }
    }
  };

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  const calculateAverageRating = (activity: Activity): number => {
    const allRatings = activity.feedback?.map((fb) => parseFloat(fb.rating));
    const totalRating = allRatings?.reduce((acc, rating) => acc + rating, 0);
    return allRatings?.length ? totalRating / allRatings?.length : 0;
  };

  const averageRating = calculateAverageRating(activity);

  const {
    loading: tagsLoading,
    error: tagsError,
    iddata: tagsOptions,
  } = useGetAllTags();
  const [selectedTags, setSelectedTags] = useState<string[]>(
    activity.Tags.map((tag) => tag._id)
  );
  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === "string" ? value.split(",") : value);
  };
  const handleTagsText = (value: string[]) => {
    const valueNames = tagsOptions
      .filter((tag) => value.includes(tag._id))
      .map((tag) => tag.name);
    return valueNames.join(", ");
  };
  const alltags = handleTagsText;

 
  const handleBooking = async (activity_id: string) => {
    try {
      await bookActivity(activity_id, username,activity.Price,activity.SpecialDiscount);
    } catch (error) {
      console.error("Error booking activity:", error);
    }
  };



  const handleBookMark = async (activity_id: string) => {
    try {
      await bookmarkActivity(currentuser,activity_id);
      setIsBookmarked(true);
    } catch (error) {
      console.error("Error bookmarking activity:", error);
    }

  };

  const handleDateChange = (e) => {
    setNewDate(new Date(e.target.value));
  };

  const {
    loading: CatLoading,
    error: CatError,
    data: CatOptions,
  } = useGetAllCategoriesD();

  const [selectedCat, setSelectedCat] = useState<string>(activity.Category._id);
  const handleCatChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSelectedCat(value);
  };

  const formatDate = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  if (tagsLoading || CatLoading) {
    return <div>loading</div>;
  }
  if (tagsError || CatError) {
    return <div>{tagsError || CatError}</div>;
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="flex flex-col items-center justify-center mt-12 mx-4">
      {/* Modal for Tags */}
      <Modal open={mopen} onClose={() => setmOpen(false)}>
        <Box sx={style}>
          <div>{alltags(selectedTags)}</div>
        </Box>
      </Modal>
  
      <div className="w-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
    
        {/* Booking Status & Title Section */}
        <div className="bg-white-100 p-4">
          <div className="flex justify-between items-start">
            
            {/* Title and Date on Left Side */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {/* Booking Status Icon */}
                {!newBIO && <BlockIcon className="text-red-500" />}
                
                {/* Title */}
                <h2 className="text-xl font-bold">{activity.Title}</h2>
              </div>
              {/* Date Below Title */}
              <input
                title="date"
                name="date"
                disabled
                value={formatDate(newDate)}
                onChange={handleDateChange}
                type="datetime-local"
                className="border-0 text-sm text-gray-600 mt-1"
              />
            </div>
  
            {/* Ratings on the Right Side */}
            <div className="ml-auto flex items-center">
              <Rating disabled name="rating" value={averageRating} precision={0.1} />
            </div>
  
          </div>
        </div>
  
        {/* Admin Controls */}
        {currenttype === "admin" && (
          <div className="flex justify-end p-4">
            <select
              title="status"
              name="status"
              value={inappropriate ? "true" : "false"}
              onChange={handleInappropriate}
              className="text-sm bg-gray-200 rounded-full px-2 py-1"
            >
              <option value="true">Inappropriate</option>
              <option value="false">Appropriate</option>
            </select>
          </div>
        )}
  
       {/* Categorical Tag */}
<div className="px-6 py-4">
  <div className="flex flex-wrap justify-center items-center gap-2">
    {/* Display selected category as a tag */}
    {selectedCat && (
      <span className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-sm font-medium">
        {CatOptions.find(tag => tag._id === selectedCat)?.name || 'No Category'}
      </span>
    )}
  </div>
</div>
  
{/* Price & Date Section */}

<div className="px-6 py-4">
  <div className="flex justify-between border-t pt-4">

    {/* Price Section */}
    <div className="text-gray-700 flex items-center gap-2">
      <ConfirmationNumberIcon className="text-green-500" />
      <div>
        <p className="font-bold text-lg">
          {currentCurrency} {(activity.Price * exchangeRate).toFixed(2)}
        </p>
      </div>
    </div>

    {/* Special Discount Section */}
    <div className="text-gray-700 flex items-center gap-2">
      <LocalOfferIcon className="text-red-500" />
      <div>
        <p className="font-bold text-lg">
          {currentCurrency} {(activity.SpecialDiscount * exchangeRate).toFixed(2)}
        </p>
      </div>
    </div>
  </div>
</div>

  
        {/* Tag Section */}
        <div className="px-6 py-4">
          <div className="flex justify-between gap-4">
            <FormControl fullWidth>
              <Select
                disabled
                labelId="tags-select-label"
                multiple
                value={selectedTags}
                onChange={handleTagsChange}
                renderValue={handleTagsText}
                className="bg-gray-100"
              >
                {tagsOptions.map((tag) => (
                  <MenuItem key={tag._id} value={tag._id}>
                    <Checkbox checked={selectedTags.indexOf(tag._id) > -1} />
                    <ListItemText primary={tag.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
  
          <button
            title="View Tags"
            onClick={() => setmOpen(true)}
            className="text-center mt-4 text-blue-600 underline"
          >
            View More
          </button>
        </div>
  
        {/* View Map, Bookmark, and Book Buttons Section */}
        <div className="mt-4 flex justify-center gap-4 px-6 py-4">
          {/* View Map Button */}
          <button
            onClick={handleViewMap}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
          >
            View Map
          </button>
  
          {/* Bookmark Button */}
          <div className="flex gap-4">
            {!isBookmarked && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                title="Bookmark"
                onClick={() => handleBookMark(activity._id)}
              >
                {loadingBookmark ? <ClipLoader size={30} color="#ffffff" /> : <BookmarkIcon />}
              </button>
            )}
            {isBookmarked && currpath !== "bookmarks" && (
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg" disabled>
                <BookmarkAddedIcon />
              </button>
            )}
          </div>
  
          {/* Book Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => handleBooking(activity._id)}
          >
            {loading ? <ClipLoader size={30} color="#ffffff" /> : "Book"}
          </button>
        </div>
  
        {/* Map Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-4/5 md:w-1/2">
              <TheBIGMAP
                arrayofmarkers={[{
                  latitude: activity.Location.latitude,
                  longitude: activity.Location.longitude,
                }]}
                id="map"
                className="h-[500px] w-full"
              />
              <button
                onClick={handleCloseModal}
                className="absolute h-[40px] w-[40px] top-2 left-2 text-[25px] text-center items-center text-white bg-red-500 hover:bg-red-600 font-bold rounded-full"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  
};

export default ActivityCardTourist;
