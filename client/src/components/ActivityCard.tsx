import React, { useState } from "react";
import TheMAP from "./TheMAP";
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
  TextField,
} from "@mui/material";
import {
  useGetAllCategoriesD,
  useGetAllTags,
} from "../custom_hooks/categoryandTagCRUD";
import { updateActivity } from "../custom_hooks/activities/updateActivity";
import BestDeleteButton from "./BestDeleteButton";
type Activity = {
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
  inappropiate: boolean;
};
interface ActivityProp {
  activity: Activity;
  onDelete: (_id: string) => void;
}

type CatStructure = {
  _id: string;
  name: string;
  __v: number;
};

export const ActivityCard: React.FC<ActivityProp> = ({
  activity,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity>(activity);
  const [newTitle, setNewTitle] = useState(currentActivity.Title);
  const [newDate, setNewDate] = useState(new Date(currentActivity.DateAndTime));
  const [newLatitude, setNewLatitude] = useState(
    currentActivity.Location.latitude
  );
  const [newLongitude, setNewLongitude] = useState(
    currentActivity.Location.longitude
  );
  const [newPrice, setNewPrice] = useState(currentActivity.Price);
  const [newSpecialDiscount, setNewSpecialDiscount] = useState(
    currentActivity.SpecialDiscount
  );
  const [newBIO, setNewBIO] = useState(currentActivity.BookingIsOpen);
  const [inappropriate, setinappropriate] = useState(
    currentActivity.inappropriate
  );
  const [mopen, setmOpen] = useState(false);

  const calculateAverageRating = (currentActivity: Activity): number => {
    const allRatings = currentActivity.feedback?.map((fb) =>
      parseFloat(fb.rating)
    );
    const totalRating = allRatings?.reduce((acc, rating) => acc + rating, 0);
    return allRatings?.length ? totalRating / allRatings?.length : 0;
  };

  const averageRating = calculateAverageRating(currentActivity);
  console.log("testtt", currentActivity.inappropiate);
  console.log(currentActivity.feedback);
  const handleDeleteClick = () => {
    onDelete(activity._id);
  };

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

  const handleSave = async () => {
    const updatedActivity = {
      _id: currentActivity._id,
      Title: newTitle,
      DateAndTime: newDate,
      Location: {
        latitude: newLatitude,
        longitude: newLongitude,
      },
      Price: newPrice,
      SpecialDiscount: newSpecialDiscount,
      Tags: selectedTags,
      Category: selectedCat,
      BookingIsOpen: newBIO,
      added_By: currentActivity.added_By,
    };
    try {
      await updateActivity(currentActivity._id, updatedActivity);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleSave();
    }
  };
  const handleDateChange = (e) => {
    setNewDate(new Date(e.target.value));
  };

  const formatDate = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };
  const [latitude, setLatitude] = useState(30.0);
  const [longitude, setLongitude] = useState(31.2);

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
            <div className="flex-row space-x-24">
              <div className="absolute text-center top-0 left-0 w-[71px] h-[30px] rounded-tl-[19px] bg-[#FF0000] border-black border-[1px] rounded-br-[19px]">
                {isEditing ? (
                  <select
                    title="status"
                    name="status"
                    value={newBIO ? "true" : "false"}
                    onChange={() => setNewBIO(!newBIO)}
                    className="bg-transparent text-black border-none"
                  >
                    <option value="true">Open</option>
                    <option value="false">Closed</option>
                  </select>
                ) : newBIO ? (
                  "Open"
                ) : (
                  "Closed"
                )}
              </div>
              {inappropriate && (
                <div className="bg-red-500 text-white  rounded-lg flex flex-col items-center h-[50%] w-1/2 space-x-2 ">
                  <h1 className="text-sm flex items-center">Inappropiate</h1>
                  <p className="text-sm flex items-center  text-white">
                    please modify the Acitvity
                  </p>
                </div>
              )}
            </div>
            <div className="absolute top-[60px] right-[10px]">
              <button
                title="Edit"
                className="editBtn"
                onClick={handleEditClick}
              >
                <svg height="1em" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </button>
            </div>
            <BestDeleteButton
              className="absolute top-[10px] right-[10px]"
              onDelete={() => handleDeleteClick()}
            />
          </div>
          <Rating
            disabled
            name="rating"
            value={averageRating}
            precision={0.1}
          />
          {!isEditing ? (
            <div className="text-[38px] h-[45px] text-center leading-[43px]">
              {newTitle}
            </div>
          ) : (
            <TextField
              size="small"
              label="Title"
              name="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-center border-none bg-transparent"
            />
          )}
          <div className="flex flex-row">
            <FormControl fullWidth>
              <Select
                disabled={isEditing ? false : true}
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
                disabled={isEditing ? false : true}
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
                  disabled={!isEditing}
                  value={formatDate(newDate)}
                  onChange={handleDateChange}
                  type="datetime-local"
                  className="text-[20px] py-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-[13px] w-[160px] h-full">
                <div>
                  {isEditing ? (
                    <TextField
                      size="small"
                      label="Price"
                      name="price"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="text-center border-none bg-transparent"
                    />
                  ) : (
                    <div>Price: {currentActivity.Price}</div>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <TextField
                      size="small"
                      label="Special Discount"
                      name="special Discount"
                      value={newSpecialDiscount}
                      onChange={(e) =>
                        setNewSpecialDiscount(Number(e.target.value))
                      }
                      className="text-center border-none bg-transparent"
                    />
                  ) : (
                    <div>
                      Special Discount: {currentActivity.SpecialDiscount}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-[13px] h-[236px]">
              {isEditing ? (
                <TheMAP
                  id={"map" + activity._id}
                  className="rounded-b-[19px] h-[209px] w-[400px]"
                  lat={latitude}
                  long={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              ) : (
                <iframe
                  title="map"
                  className="rounded-b-[19px]"
                  src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                  width="400px"
                  height="166px"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
