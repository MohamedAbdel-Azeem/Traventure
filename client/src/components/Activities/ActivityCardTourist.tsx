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
        {/* Booking Status & Admin Status */}
        <div className="flex justify-between items-center bg-white-100 p-4">
          {/* Booking Status */}
          {!newBIO && (
            <div className="flex items-center">
              <BlockIcon className="text-red-500" />
            </div>
          )}
  
          {/* Admin Controls */}
          {currenttype === "admin" && (
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
          )}
        </div>
  
        {/* Title */}
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold">{activity.Title}</h2>
          <Rating disabled name="rating" value={averageRating} precision={0.1} />
        </div>
  
        {/* Booking Section */}
        {type === "tourist" && activity.BookingIsOpen && (
          <div className="flex justify-center gap-4 py-4">
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => handleBooking(activity._id)}
            >
              {loading ? <ClipLoader size={30} color="#ffffff" /> : "Book"}
            </button>
          </div>
        )}
  
        {/* Dropdown Selectors */}
        <div className="px-6 py-4">
          <div className="flex justify-between gap-4">
            <FormControl fullWidth>
              <Select
                disabled
                labelId="cat-select-label"
                value={selectedCat}
                onChange={handleCatChange}
                className="bg-gray-100"
              >
                {CatOptions.map((tag) => (
                  <MenuItem key={tag._id} value={tag._id}>
                    <ListItemText primary={tag.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
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
  
        {/* Price & Date Section */}
        <div className="px-6 py-4">
          <div className="flex justify-between border-t pt-4">
            <input
              title="date"
              name="date"
              disabled
              value={formatDate(newDate)}
              onChange={handleDateChange}
              type="datetime-local"
              className="border border-gray-300 rounded-md p-2 text-sm w-full"
            />
          </div>
  
          <div className="flex justify-between pt-4">
            <div className="text-gray-700">
              <p>Price:</p>
              <p className="font-bold">
                {currentCurrency} {(activity.Price * exchangeRate).toFixed(2)}
              </p>
            </div>
            <div className="text-gray-700">
              <p>Special Discount:</p>
              <p className="font-bold">
                {currentCurrency} {(activity.SpecialDiscount * exchangeRate).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
  
        {/* Embedded Google Map */}
        <div className="w-full h-[200px]">
          <iframe
            title="map"
            className="w-full h-full rounded-b-lg"
            src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${activity.Location.longitude}!3d${activity.Location.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
          ></iframe>
        </div>
      </div>
    </div>
  );
  
  
};
