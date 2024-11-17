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
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

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
}

type CatStructure = {
  _id: string;
  name: string;
  __v: number;
};

export const ActivityCardTourist: React.FC<ActivityProp> = ({
  type,
  activity,
}) => {
  const currenttype = useLocation().pathname.split("/")[1];
  const [newDate, setNewDate] = useState(new Date(activity.DateAndTime));
  const [newBIO, setNewBIO] = useState(activity.BookingIsOpen);
  const [mopen, setmOpen] = useState(false);
  const { username } = useParams<{ username: string }>();
  const { bookActivity } = useBookActivity();
  const [inappropriate, setInappropriate] = useState(activity.inappropriate);

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
      await bookActivity(activity_id, username);
    } catch (error) {
      console.error("Error booking activity:", error);
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
      <Modal open={mopen} onClose={() => setmOpen(false)}>
        <Box sx={style}>
          <div>{alltags(selectedTags)}</div>
        </Box>
      </Modal>

      <div className="rounded-[19px]">
        <div className="w-[400px] h-[475px] bg-[#25b396] rounded-[19px] relative">
          <div className="w-[400px] h-[69px] rounded-t-[19px]">
            <div className="absolute text-center top-0 left-0 w-[71px] h-[30px] rounded-tl-[19px] bg-[#FF0000] border-black border-[1px] rounded-br-[19px]">
              {newBIO ? "Open" : "Closed"}
            </div>
            {type === "tourist" && activity.BookingIsOpen && (
              <div className=" flex justify-end items-center py-2 px-5">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-2"
                  onClick={() => handleBooking(activity._id)}
                >
                  Book
                </button>
              </div>
            )}
            {currenttype === "admin" && (
              <div className="absolute text-center top-0 right-0 w-[171px] h-[30px] rounded-tl-[19px] bg-[#FF0000] border-black border-[1px] rounded-br-[19px]">
                <select
                  title="status"
                  name="status"
                  value={inappropriate ? "true" : "false"}
                  onChange={handleInappropriate}
                  className="bg-transparent text-black border-none"
                >
                  <option value="true">Inappropriate</option>
                  <option value="false">Appropriate</option>
                </select>
              </div>
            )}
          </div>
          <Rating
            disabled
            name="rating"
            value={averageRating}
            precision={0.1}
          />
          <div className="text-[38px] h-[45px] text-center leading-[43px]">
            {activity.Title}
          </div>
          <div className="flex flex-row">
            <FormControl fullWidth>
              <Select
                disabled={true}
                labelId="cat-select-label"
                value={selectedCat}
                onChange={handleCatChange}
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
                disabled={true}
                labelId="tags-select-label"
                multiple
                value={selectedTags}
                onChange={handleTagsChange}
                renderValue={handleTagsText}
                sx={{ padding: "4.45px" }}
              >
                {tagsOptions.map((tag) => (
                  <MenuItem key={tag._id} value={tag._id}>
                    <Checkbox checked={selectedTags.indexOf(tag._id) > -1} />
                    <ListItemText primary={tag.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="my-auto w-[50px] h-[65px] text-[11px] flex flex-col items-center justify-center">
              <button
                title="View Tags"
                onClick={() => setmOpen(true)}
                className="text-center"
              >
                {" "}
                View More
              </button>
            </div>
          </div>
          <hr className="border-dotted border-t-2 border-gray-400  mt-[10px]" />
          <div className="w-[400px] h-[284px] rounded-b-[19px] flex flex-col">
            <div className="flex flex-row">
              <div className="border-dotted border-r-2 border-gray-400 flex flex-col w-[260px]">
                <input
                  title="date"
                  name="date"
                  disabled={true}
                  value={formatDate(newDate)}
                  onChange={handleDateChange}
                  type="datetime-local"
                  className="text-[20px] py-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-[13px] w-[160px] h-full">
                <div>
                  <div>
                    Price: {currentCurrency}{" "}
                    {(activity.Price * exchangeRate).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div>
                    Special Discount: {currentCurrency}{" "}
                    {(activity.SpecialDiscount * exchangeRate).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-[13px] h-[236px]">
              <iframe
                title="map"
                className="rounded-b-[19px]"
                src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${activity.Location.longitude}!3d${activity.Location.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                width="400px"
                height="166px"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
