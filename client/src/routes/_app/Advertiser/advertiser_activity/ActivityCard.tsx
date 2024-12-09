import React, { useState } from "react";
import { useSelector } from "react-redux";
import BlockIcon from "@mui/icons-material/Block";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TheBIGMAP from "../../../../components/Maps/TheBIGMAP";
import ClipLoader from "react-spinners/ClipLoader";
import TheMAP from "../../../../components/Maps/TheMAP";
import {
  Box,
  Checkbox,
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
} from "../../../../custom_hooks/categoryandTagCRUD";
import { updateActivity } from "../../../../custom_hooks/activities/updateActivity";
import BestDeleteButton from "../../../../components/Buttons/BestDeleteButton";
import EditButton from "../../../../components/Buttons/EditButton";
import SaveButton from "../../../../components/Buttons/SaveButton";
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
  inappropriate: boolean;
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
  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );
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
  const [latitude, setLatitude] = useState(currentActivity.Location.latitude);
  const [longitude, setLongitude] = useState(
    currentActivity.Location.longitude
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewMap = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  if (tagsLoading || CatLoading) {
    return (
      <div className="flex flex-col items-center justify-center mx-4">
        <ClipLoader size={30} color="#ffffff" />
      </div>
    );
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
  const handleCancelClick = () => {
    setNewTitle(currentActivity.Title);
    setNewDate(new Date(currentActivity.DateAndTime));
    setNewLatitude(currentActivity.Location.latitude);
    setNewLongitude(currentActivity.Location.longitude);
    setNewPrice(currentActivity.Price);
    setNewSpecialDiscount(currentActivity.SpecialDiscount);
    setNewBIO(currentActivity.BookingIsOpen);
    setIsEditing(false);
  };
  return (
    <div className="flex flex-col items-center justify-center mx-4">
      {/* Modal for Tags */}
      <Modal open={mopen} onClose={() => setmOpen(false)}>
        <Box sx={style}>
          <div>{alltags(selectedTags)}</div>
        </Box>
      </Modal>

      <div className="w-[400px] bg-gray-100 rounded-lg shadow-lg overflow-hidden relative">
        <div className="absolute right-[10px] bottom-[10px]">
          {isEditing ? (
            <>
              <SaveButton handleSaveClick={handleSave} />
            </>
          ) : (
            <>
              <EditButton handleEditClick={handleEditClick} />
            </>
          )}
        </div>
        <div className="absolute left-[10px] bottom-[10px]">
          {isEditing ? (
            <>
              <button
                title="Reject"
                className="rejectBtn z-10"
                onClick={handleCancelClick}
              >
                <svg
                  height="1em"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="512"
                    y2="512"
                    stroke="white"
                    strokeWidth="80"
                  />
                  <line
                    x1="512"
                    y1="0"
                    x2="0"
                    y2="512"
                    stroke="white"
                    strokeWidth="80"
                  />
                </svg>
              </button>
            </>
          ) : (
            <BestDeleteButton onDelete={handleDeleteClick} />
          )}
        </div>
        {/* Booking Status & Title Section */}
        <div className="bg-white-100 m-[5px] h-[50px]">
          <div className="flex justify-between items-start">
            {/* Title and Date Section */}

            <div className="flex flex-col flex-grow max-w-[calc(70%-10px)]">
              <div className="flex items-center gap-2">
                {/* Booking Status Icon */}
                {isEditing ? (
                  <input
                    title="Booking Status"
                    aria-label="Booking Status"
                    type="checkbox"
                    checked={newBIO}
                    onChange={(e) => setNewBIO(e.target.checked)}
                    className="w-5 h-5 text-green-500"
                  />
                ) : (
                  newBIO && <BlockIcon className="text-red-500" />
                )}

                {/* Title */}
                {isEditing ? (
                  <TextField
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    sx={{
                      width: "335px",
                      "& .MuiInputBase-input": {
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "bold",
                        boxSizing: "border-box",
                        width: "335px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "black",
                          borderRadius: "7px",
                          height: "38px",
                          width: "335px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                          borderRadius: "7px",
                          width: "335px",
                        },
                      },
                    }}
                  />
                ) : (
                  <h2
                    className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                    title={activity.Title}
                  >
                    {activity.Title}
                  </h2>
                )}
              </div>
              {/* Date */}
              <input
                title="date"
                name="date"
                disabled={!isEditing}
                value={formatDate(newDate)}
                onChange={handleDateChange}
                type="datetime-local"
                className="border-0 text-sm text-gray-600 h-[25px]"
              />
            </div>

            {/* Ratings */}
            {!isEditing ? (
              <div className="ml-4 flex-shrink-0">
                <Rating
                  disabled
                  name="rating"
                  value={averageRating}
                  precision={0.1}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Categorical Tag */}
        <div className="px-6 h-[40px]">
          {isEditing ? (
            <Select
              labelId="cat-select-label"
              value={selectedCat}
              onChange={handleCatChange}
              sx={{ width: 350, height: 40, fontSize: "0.875rem" }} // Adjust the width and font size as needed
            >
              {CatOptions.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-2">
              {selectedCat && (
                <span className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-sm font-medium">
                  {CatOptions.find((tag) => tag._id === selectedCat)?.name ||
                    "No Category"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Date Section */}

        <div className="px-6 py-4">
          <div className="flex justify-between border-t pt-2 h-[50px]">
            {/* Price Section */}
            <div className="text-gray-700 flex items-center gap-2">
              <ConfirmationNumberIcon className="text-green-500" />
              <div>
                {isEditing ? (
                  <TextField
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(+e.target.value)}
                    sx={{
                      width: "120px",
                      height: "45px",
                      "& .MuiInputBase-input": {
                        color: "black",
                        fontSize: "14px",
                        height: "45px",
                        boxSizing: "border-box",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "black",
                          borderRadius: "7px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                          borderRadius: "7px",
                        },
                      },
                    }}
                  />
                ) : (
                  <p className="font-bold text-lg flex mb-0">
                    {currentCurrency}{" "}
                    {(activity.Price * exchangeRate).toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Special Discount Section */}
            <div className="text-gray-700 flex items-center gap-2">
              <LocalOfferIcon className="text-red-500" />
              <div>
                {isEditing ? (
                  <TextField
                    type="number"
                    value={newSpecialDiscount}
                    onChange={(e) => setNewSpecialDiscount(+e.target.value)}
                    sx={{
                      width: "120px",
                      height: "45px",
                      "& .MuiInputBase-input": {
                        color: "black",
                        fontSize: "14px",
                        height: "45px",
                        boxSizing: "border-box",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "black",
                          borderRadius: "7px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                          borderRadius: "7px",
                        },
                      },
                    }}
                  />
                ) : (
                  <p className="font-bold text-lg mb-0">
                    {currentCurrency}
                    {(activity.SpecialDiscount * exchangeRate).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tag Section */}
        <div className="px-6 h-[40px]">
          {isEditing ? (
            <Select
              labelId="tags-select-label"
              multiple
              value={selectedTags}
              onChange={handleTagsChange}
              renderValue={handleTagsText}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 350,
                    width: 350,
                  },
                },
              }}
              sx={{ width: 350, height: 40, fontSize: "0.875rem" }}
            >
              {tagsLoading && <MenuItem>Loading...</MenuItem>}
              {tagsError && <MenuItem>Error</MenuItem>}
              {tagsOptions.map((tag) => (
                <MenuItem key={tag._id} value={tag._id}>
                  <Checkbox checked={selectedTags.indexOf(tag._id) > -1} />
                  <ListItemText primary={tag.name} />
                </MenuItem>
              ))}
            </Select>
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-2">
              {selectedTags && selectedTags.length > 0 ? (
                selectedTags.slice(0, 3).map((tagId) => {
                  const tag = tagsOptions.find((t) => t._id === tagId);
                  return (
                    <span
                      key={tagId}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {tag?.name}
                    </span>
                  );
                })
              ) : (
                <span className="text-gray-500 italic">No tags selected</span>
              )}

              {/* View More Button */}
              {selectedTags.length > 3 && (
                <button
                  title="View Tags"
                  onClick={() => setmOpen(true)}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  +
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center gap-4 px-6 py-4">
          {/* View Map Button */}
          <button
            onClick={handleViewMap}
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
          >
            View Map
          </button>
        </div>

        {/* Map Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-4/5 md:w-1/2">
              {isEditing ? (
                <TheMAP
                  lat={newLatitude}
                  long={newLongitude}
                  setLatitude={setNewLatitude}
                  setLongitude={setNewLongitude}
                  className="h-[500px] w-full"
                />
              ) : (
                <TheBIGMAP
                  arrayofmarkers={[
                    {
                      latitude: activity.Location.latitude,
                      longitude: activity.Location.longitude,
                    },
                  ]}
                  id="map"
                  className="h-[500px] w-full"
                />
              )}

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

export default ActivityCard;
