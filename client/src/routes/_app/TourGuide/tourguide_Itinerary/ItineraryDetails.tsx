import React, { useEffect, useState } from "react";
import {
  Box,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Rating,
  TextField,
  Button,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { IActivity } from "../../../../custom_hooks/activities/activity_interface";
import { TouristProfileData } from "../../../../routes/_app/Tourist/tourist_profile/tourist_profile_data";
import Place from "../../../../custom_hooks/places/place_interface";
import { useGetItineraryID } from "../../../../custom_hooks/itineraries/useGetItinerary";
import TheBIGMAP from "../../../../components/Maps/TheBIGMAP";
import ImageUploader from "../../../../components/PDFs&Images/ImageUploader";
import { useSelector } from "react-redux";
import { Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveButton from "../../../../components/Buttons/SaveButton";
import EditButton from "../../../../components/Buttons/EditButton";
import { useGetAllTags } from "../../../../custom_hooks/categoryandTagCRUD";
import TheMAP from "../../../../components/Maps/TheMAP";
import BestDeleteButton from "../../../../components/Buttons/BestDeleteButton";
import { v4 as uuidv4 } from "uuid";
import { useGetPlace } from "../../../../custom_hooks/places/useGetPlace";
import { useGetAllActivitiesTitleAndId } from "../../../../custom_hooks/activities/useGetActivitiesTitlesAndID";
import {
  UseUpdateItinerary,
  useUpdateItinerary,
} from "../../../../custom_hooks/itineraries/useUpdateItinerary";
interface TagStructure {
  _id: string;
  name: string;
  __v: number;
}

interface Itinerary {
  _id: string;
  main_Picture?: object | null;
  title: string;
  description: string;
  added_By?: {
    profilepic: string;
    username: string;
  };
  price: number;
  starting_Date: string;
  ending_Date: string;
  rating?: number;
  total: number;
  language: string;
  selectedTags?: string[];
  pickup_location: { longitude: number; latitude: number };
  dropoff_location: { longitude: number; latitude: number };
  plan: {
    place: string;
    activities: {
      activity_id: string;
      activity_duration: number;
      time_unit: string;
    }[];
  }[];
  booked_By: {
    user_id?: TouristProfileData;
  }[];
  accessibility: boolean;
}

interface SActivity {
  activity_id?: string;
  time_unit?: string;
  activity_duration?: number;
  _id?: string;
  Title?: string;
  DateAndTime: Date;
  Location: {
    latitude: number;
    longitude: number;
  };
  Price: number;
  SpecialDiscount: number;
  Category: string;
  Tags: TagStructure[];
  BookingIsOpen: boolean;
  added_By?: string;
}

type PlacetoGo = {
  placeid: string;
  placename: string;
  activities: ActivitytoGo[];
};

type ActivitytoGo = {
  activityid: string;
  activityname: string;
  activity_duration: number;
  time_unit: string;
};

const ItineraryDetails: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split(`/`)[5];
  const { itinerary: initialItinerary } = useGetItineraryID(id);
  const [itinerary, setItinerary] = useState<Itinerary | null>(
    initialItinerary
  );
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [starting_Date, setStarting_Date] = useState<Date>(
    initialItinerary ? new Date(initialItinerary.starting_Date) : new Date()
  );
  const [ending_Date, setEnding_Date] = useState<Date>(
    initialItinerary ? new Date(initialItinerary.ending_Date) : new Date()
  );
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [accessibility, setAccessibility] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("");
  const [startinglongitude, setStartinglongitude] = useState<number>(30);
  const [startinglatitude, setStartinglatitude] = useState<number>(30);
  const [endinglongitude, setEndinglongitude] = useState<number>(30);
  const [endinglatitude, setEndinglatitude] = useState<number>(30);
  const [placestogo, setPlacestogo] = useState<PlacetoGo[]>(
    initialItinerary
      ? initialItinerary.plan.map((place) => ({
          placeid: place.place._id || "",
          placename: place.place.name,
          activities: place.activities.map((activity) => ({
            activityid: activity.activity_id?._id || "",
            activityname: activity.activity_id?.Title || "",
            activity_duration: activity.activity_duration,
            time_unit: activity.time_unit as string,
          })),
        }))
      : []
  );
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const timeUnits: string[] = ["sec", "hours", "days", "month", "years", "min"];

  useEffect(() => {
    if (initialItinerary) {
      setItinerary(initialItinerary);
      setTitle(initialItinerary.title);
      setDescription(initialItinerary.description);
      setPrice(initialItinerary.price);
      setStarting_Date(new Date(initialItinerary.starting_Date));
      setEnding_Date(new Date(initialItinerary.ending_Date));
      setSelectedTags(
        initialItinerary.selectedTags?.map((tag) => tag._id) || []
      );
      setAccessibility(initialItinerary.accessibility);
      setLanguage(initialItinerary.language);
      setStartinglongitude(initialItinerary.pickup_location.longitude);
      setStartinglatitude(initialItinerary.pickup_location.latitude);
      setEndinglongitude(initialItinerary.dropoff_location.longitude);
      setEndinglatitude(initialItinerary.dropoff_location.latitude);
      setPlacestogo(
        initialItinerary.plan.map((place) => ({
          placeid: place.place._id || "",
          placename: place.place.name,
          activities: place.activities.map((activity) => ({
            activityid: activity.activity_id?._id || "",
            activityname: activity.activity_id?.Title || "",
            activity_duration: activity.activity_duration,
            time_unit: activity.time_unit as string,
          })),
        }))
      );
    }
  }, [initialItinerary]);

  useEffect(() => {
    console.log(placestogo);
  }, [placestogo]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const { iddata: tagsOptions } = useGetAllTags();
  const { places: apiPlaces } = useGetPlace();
  const { activities: activities } = useGetAllActivitiesTitleAndId();
  const [selectedTags, setSelectedTags] = useState<string[]>(
    tagsOptions.map((tag) => tag._id)
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

  useEffect(() => {}, [selectedTags]);

  const alltags = (value: string[]) => {
    const valueNames = tagsOptions
      .filter((tag) => value.includes(tag._id))
      .map((tag) => tag.name);
    return valueNames;
  };
  const handleDelete = (tagToDelete: string) => () => {
    const tagIdToDelete = tagsOptions.find(
      (tag) => tag.name === tagToDelete
    )?._id;
    if (tagIdToDelete) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagIdToDelete));
    }
  };
 


  const itineraryData = {
    ...itinerary,
    title,
    description,
    main_Picture: image ?? itinerary?.main_Picture,
    accesibility: accessibility,
    price,
    starting_Date: starting_Date.toISOString(),
    ending_Date: ending_Date.toISOString(),
    rating: 0,
    total: 0,
    pickup_location: {
      longitude: startinglongitude,
      latitude: startinglatitude,
    },
    dropoff_location: {
      longitude: endinglongitude,
      latitude: endinglatitude,
    },
    language: language,
    selectedTags: selectedTags.map((tag) => tag),
    plan: placestogo.map((place) => ({
      place: place.placeid,
      activities: place.activities.map((activity) => ({
        activity_id: activity.activityid,
        activity_duration: activity.activity_duration,
        time_unit: activity.time_unit,
      })),
    })),
  };

  const handleSaveClick = () => {
    setIsEditing(false);

      console.log(
        "LIFE IS PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIN",
        itineraryData
      );

      console.log(
        placestogo.map((place) => ({
          place: place.placeid,
        }))
      );

      UseUpdateItinerary(itineraryData, id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "starting_Date":
        setStarting_Date(new Date(value));
        break;
      case "ending_Date":
        setEnding_Date(new Date(value));
        break;
      case "price":
        setPrice(parseFloat(value));
        break;
      default:
        break;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );

  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  if (!itinerary) return <p>No itinerary data found</p>;

  const locations = [];
  locations.push(itinerary.pickup_location);
  locations.push(itinerary.dropoff_location);
  itinerary.plan.forEach((item) => {
    if (item.place && item.place.location) {
      locations.push(item.place.location);
    }
  });

  const handleActivityNameChange = (
    NewID: string,
    placeidN: string,
    activityidN: string
  ) =>
    setPlacestogo((prevPlacestogo) =>
      prevPlacestogo.map((placetogonew) =>
        placetogonew.placeid === placeidN
          ? {
              ...placetogonew,
              activities: placetogonew.activities.map((activity) =>
                activity.activityid === activityidN
                  ? { ...activity, activityname: NewID }
                  : activity
              ),
            }
          : placetogonew
      )
    );
  const handleAddPlace = () => {
    setPlacestogo([
      ...placestogo,
      { placeid: uuidv4(), placename: "", activities: [] },
    ]);
  };

  const handleAddActivity = (placeid: string) => () => {
    setPlacestogo((prevPlacestogo) =>
      prevPlacestogo.map((placetogo) =>
        placetogo.placeid === placeid
          ? {
              ...placetogo,
              activities: [
                ...placetogo.activities,
                {
                  activityid: uuidv4(),
                  activityname: "",
                  activity_duration: 1,
                  time_unit: "",
                },
              ],
            }
          : placetogo
      )
    );
  };

  const handleActivityTimeChange = (
    e: string,
    placeidN: string,
    activityidN: string
  ) => {
    if (/^(?!0$)(\d*\.?\d*)$/.test(e)) {
      setPlacestogo((prevPlacestogo) =>
        prevPlacestogo.map((placetogonew) =>
          placetogonew.placeid === placeidN
            ? {
                ...placetogonew,
                activities: placetogonew.activities.map((activity) =>
                  activity.activityid === activityidN
                    ? { ...activity, activity_duration: parseInt(e) }
                    : activity
                ),
              }
            : placetogonew
        )
      );
    }
  };
  const handleActivityUnitChange = (
    e: string,
    placeidN: string,
    activityidN: string
  ) =>
    setPlacestogo((prevPlacestogo) =>
      prevPlacestogo.map((placetogonew) =>
        placetogonew.placeid === placeidN
          ? {
              ...placetogonew,
              activities: placetogonew.activities.map((activity) =>
                activity.activityid === activityidN
                  ? { ...activity, time_unit: e }
                  : activity
              ),
            }
          : placetogonew
      )
    );

  const handlePlaceNameChange = (e: string, placeidN: string) => (
    console.log(e),
    setPlacestogo((prevPlacestogo) =>
      prevPlacestogo.map((placetogonew) =>
        placetogonew.placeid === placeidN
          ? {
              ...placetogonew,
              placename: e,
            }
          : placetogonew
      )
    )
  );
  const handleOChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (!isDropdownOpen) {
        setExpanded(isExpanded ? panel : false);
      }
    };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };
  console.log(itinerary);
  return (
    <Box className="flex justify-center items-center h-auto py-8 bg-gray-100">
      <div className="flex flex-col">
        <div className="relative">
          {!isEditing ? (
            <div className="absolute top-[280px] left-[600px]">
              <EditButton handleEditClick={handleEditClick} />
            </div>
          ) : (
            <div className="absolute top-[450px] left-[800px]">
              <SaveButton handleSaveClick={handleSaveClick} />
            </div>
          )}
        </div>
        {isEditing ? (
          <>
            <TextField
              name="title"
              value={title}
              onChange={handleChange}
              className="w-[700px] h-[90px] text-[28px]"
            />
            <TextField
              name="description"
              value={description}
              onChange={handleChange}
              className="w-[700px] h-[90px] text-[28px]"
            />
            <ImageUploader setSelectedImage={setImage} selectedImage={image} />
            <div className="grid grid-cols-3 mt-4">
              <p>Starting Date</p>
              <p>Ending Date</p>
              <p>Price</p>
              <input
                title="starting_Date"
                type="date"
                name="starting_Date"
                value={starting_Date.toISOString().split("T")[0]}
                onChange={handleChange}
                className="w-[200px] h-[30px] text-[16px]"
              />
              <input
                title="ending_Date"
                type="date"
                name="ending_Date"
                value={ending_Date.toISOString().split("T")[0]}
                onChange={handleChange}
                className="w-[200px] h-[30px] text-[16px]"
              />
              <input
                title="price"
                type="number"
                name="price"
                value={(price * exchangeRate).toFixed(2)}
                onChange={handleChange}
                className="w-[200px] h-[30px] text-[16px]"
              />
              <div className="w-[260px] h-[50px] bg-[#D9D9D9] rounded-[9px] relative">
                <Select
                  sx={{
                    height: "50px",
                    fontSize: "18px",
                    borderRadius: "9px",
                    width: "260px",
                  }}
                  multiple
                  value={selectedTags}
                  onChange={handleTagsChange}
                  input={<Input />}
                  renderValue={handleTagsText}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 250,
                        width: 139,
                      },
                    },
                  }}
                >
                  {tagsOptions.map((tag) => (
                    <MenuItem key={tag._id} value={tag._id}>
                      <Checkbox checked={selectedTags.indexOf(tag._id) > -1} />
                      <ListItemText primary={tag.name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <Select
                value={accessibility}
                label="Accessibility"
                onChange={(e) => setAccessibility(e.target.value === "true")}
                sx={{
                  height: "50px",
                  fontSize: "18px",
                  borderRadius: "9px",
                  width: "260px",
                }}
              >
                <MenuItem value="true">Accessible</MenuItem>
                <MenuItem value="false">Inaccessible</MenuItem>
              </Select>
              <Select
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value as string)}
                sx={{
                  height: "50px",
                  fontSize: "18px",
                  borderRadius: "9px",
                  width: "260px",
                }}
              >
                <MenuItem value="Egyptian">Egyptian</MenuItem>
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Quebecan">Quebecan</MenuItem>
                <MenuItem value="Dutch">Dutch</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
              </Select>
            </div>
            <div className="grid grid-cols-5 my-4">
              {alltags(selectedTags).map((tag) => (
                <Stack direction="row" spacing={1} key={tag}>
                  <Chip
                    sx={{
                      fontSize: "18px",
                      width: "130px",
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "#D9D9D9",
                      color: "#0000000",
                    }}
                    label={
                      <span style={{ flexGrow: 1, textAlign: "left" }}>
                        {tag}
                      </span>
                    }
                    onDelete={handleDelete(tag)}
                  />
                </Stack>
              ))}
            </div>
          </>
        ) : (
          <div>
            <div
              className="relative w-[700px] h-[200px] rounded-[20px] bg-cover bg-center"
              style={{ backgroundImage: `url(${itinerary.main_Picture})` }}
            >
              <p
                className="w-[690px] h-[50px] text-[20px] text-white break-words overflow-auto lasttimeipromise from-neutral-500 absolute bottom-[30px] left-[10px]"
                style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                {itinerary.title}
              </p>
              <img
                src={itinerary.added_By.profilepic}
                alt="Profile Picture"
                className="w-[25px] h-[25px] rounded-[25px] absolute bottom-[20px] left-[30px]"
              />
              <p
                className="w-[690px] h-[50px] text-[20px] text-white from-neutral-500 absolute top-[151px] left-[60px]"
                style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                {itinerary.added_By.username}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p>
                {formatDate(itinerary.starting_Date) +
                  " → " +
                  formatDate(itinerary.ending_Date)}
              </p>
              <p className="w-[200px] h-[30px] text-[16px]">
                {currentCurrency +
                  " " +
                  (itinerary.price * exchangeRate).toFixed(2)}
              </p>

              <Rating name="read-only" value={itinerary.rating} readOnly />
              <p>{itinerary.total + " reviews"}</p>
              <p>{itinerary.language}</p>
              <p>{itinerary.accessibility ? "Accessible" : "Inaccessible"}</p>
            </div>

            <p className="w-[700px] h-[90px] text-[28px] overflow-auto lasttimeipromise">
              {itinerary.description}
            </p>

            <div className="grid grid-cols-6">
              {itinerary.selectedTags?.map((tag) => (
                <Chip
                  key={tag._id}
                  label={tag.name}
                  color="info"
                  size="small"
                  sx={{
                    marginRight: "5px",
                    width: "100px",
                    height: "30px",
                    marginBottom: "5px",
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {isEditing ? (
          <div>
            <div className=" w-[883px] h-[82px] bg-[#413B3B] rounded-[15px] my-2 mx-auto flex">
              <Button
                onClick={handleAddPlace}
                sx={{
                  width: "883px",
                  height: "82px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px",
                  backgroundColor: "#413B3B",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#5a5a5a",
                  },
                }}
              >
                <p className="text-[20px] text-start my-auto ml-2 text-white mr-auto">
                  + Add New Place
                </p>
              </Button>
            </div>

            {placestogo.map((placetogo) => (
              <Accordion
                key={placetogo.placeid}
                disableGutters
                expanded={expanded === `panel${placetogo.placeid}`}
                onChange={handleOChange(`panel${placetogo.placeid}`)}
                sx={{
                  width: "883px",
                  backgroundColor: "transparent",
                  borderRadius: "15px",
                  borderColor: "transparent",
                  boxShadow: "none",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon fontSize="large" sx={{ color: "white" }} />
                  }
                  sx={{
                    minHeight: "unset",
                    backgroundColor: "#413B3B",
                    borderRadius: "15px",
                    "&.Mui-expanded": { minHeight: "unset" },
                    marginBottom: "8px",
                  }}
                >
                  <Select
                    value={placetogo.placename}
                    label="Places"
                    onChange={(e) =>
                      handlePlaceNameChange(e.target.value, placetogo.placeid)
                    }
                    onOpen={handleDropdownOpen}
                    onClose={handleDropdownClose}
                    sx={{
                      height: "58px",
                      fontSize: "18px",
                      borderRadius: "15px",
                      width: "200px",
                      color: "white",
                    }}
                  >
                    {apiPlaces &&
                      apiPlaces.map((place) => (
                        <MenuItem key={place._id} value={place.name}>
                          {place.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <BestDeleteButton
                    className="ml-auto mr-2 my-auto"
                    onDelete={() =>
                      setPlacestogo((prevPlacestogo) =>
                        prevPlacestogo.filter(
                          (placetogonew) =>
                            placetogonew.placeid !== placetogo.placeid
                        )
                      )
                    }
                  />
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    borderRadius: "15px",
                    borderColor: "transparent",
                    boxShadow: "none",
                    marginBottom: "16px",
                  }}
                >
                  <div className="w-[867px] h-[58px] bg-[#413B3B] rounded-[15px] flex flex-row my-4">
                    <Button
                      className="w-full"
                      onClick={handleAddActivity(placetogo.placeid)}
                    >
                      <p className="text-[20px] text-start my-auto text-white mr-auto">
                        + Add Activity
                      </p>
                    </Button>
                  </div>
                  {placetogo.activities.map((currentactivity) => (
                    <div
                      key={currentactivity.activityid}
                      className="w-[867px] h-[58px] bg-[#413B3B] rounded-[15px] flex flex-row my-4"
                    >
                      <Select
                        value={currentactivity.activityname}
                        label="Activity"
                        onChange={(e) => {
                          handleActivityNameChange(
                            e.target.value,
                            placetogo.placeid,
                            currentactivity.activityid
                          );
                        }}
                        sx={{
                          height: "58px",
                          fontSize: "18px",
                          borderRadius: "15px",
                          width: "200px",
                          color: "white",
                        }}
                      >
                        {activities.map((activity) => (
                          <MenuItem key={activity._id} value={activity.Title}>
                            {activity.Title}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextField
                        value={currentactivity.activity_duration}
                        onChange={(e) =>
                          handleActivityTimeChange(
                            e.target.value,
                            placetogo.placeid,
                            currentactivity.activityid
                          )
                        }
                        required
                        type="number"
                        className="w-[200px]"
                        InputProps={{
                          style: {
                            fontSize: "18px",
                            borderRadius: "9px",
                            height: "50px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginLeft: "24px",
                            color: "white",
                          },
                        }}
                        placeholder="Time"
                        variant="outlined"
                      />
                      <Select
                        value={currentactivity.time_unit}
                        label="timeUnit"
                        onChange={(e) =>
                          handleActivityUnitChange(
                            e.target.value,
                            placetogo.placeid,
                            currentactivity.activityid
                          )
                        }
                        required
                        className="w-[260px] text-[18px] rounded-[9px] h-[50px] mt-auto mb-auto ml-2"
                        placeholder="Days? Really?"
                        variant="outlined"
                        sx={{
                          borderRadius: "9px",
                          color: "white",
                        }}
                      >
                        {timeUnits.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                      <BestDeleteButton
                        className="ml-auto mr-2 my-auto"
                        onDelete={() =>
                          setPlacestogo((prevPlacestogo) =>
                            prevPlacestogo.map((placetogonew) =>
                              placetogonew.placeid === placetogo.placeid
                                ? {
                                    ...placetogonew,
                                    activities: [
                                      ...placetogonew.activities.filter(
                                        (activity) =>
                                          activity.activityid !==
                                          currentactivity.activityid
                                      ),
                                    ],
                                  }
                                : placetogonew
                            )
                          )
                        }
                      />
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <>
            {itinerary.plan.map((plan) => (
              <Accordion
                key={itinerary._id}
                disableGutters
                sx={{
                  width: "700px",
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  borderColor: "transparent",
                  boxShadow: "none",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon fontSize="large" sx={{ color: "black" }} />
                  }
                  sx={{
                    backgroundImage: `url(${plan.place.pictures[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "unset",
                    backgroundColor: "#413B3B",
                    borderRadius: "20px",
                    marginBottom: "8px",
                  }}
                >
                  <div className="relative w-[600px] h-[130px] rounded-[20px]">
                    <p
                      className="w-[150px] h-[60px] text-[35px] text-white absolute bottom-[10px] left-[10px]"
                      style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
                    >
                      {plan.place.name}
                    </p>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    borderRadius: "10px",
                    borderColor: "transparent",
                    boxShadow: "none",
                    marginBottom: "16px",
                  }}
                >
                  <div className="flex flex-col w-[700px]">
                    <div className="flex flex-col relative h-[170px] w-[650px]">
                      <span className="w-[10px] h-[170px] bg-black m-[30px] rounded-b-[3px] absolute rounded-t-[10px] top-[-30px] left-[-20px]" />
                      <line
                        className={`w-[1px] h-[250px] bg-black m-[30px] absolute top-[-46px] left-[-15px]`}
                        style={{ borderLeft: "1px solid black" }}
                      ></line>
                      <p className="text-[18px] ml-12 mt-0 mb-auto text-black">
                        {"Native: " +
                          currentCurrency +
                          " " +
                          (
                            plan.place.ticket_price.native * exchangeRate
                          ).toFixed(2) +
                          " "}
                        {"Foreign: " +
                          currentCurrency +
                          " " +
                          (
                            plan.place.ticket_price.foreign * exchangeRate
                          ).toFixed(2) +
                          " "}
                        {"Student: " +
                          currentCurrency +
                          " " +
                          (
                            plan.place.ticket_price.student * exchangeRate
                          ).toFixed(2)}
                      </p>
                      <p className="text-[18px] h-[100px] mt-auto ml-12 text-black overflow-auto">
                        {plan.place.description}
                      </p>
                    </div>

                    {plan.activities.map((activity) => (
                      <div className="flex flex-row relative mt-[35px] w-[650px]">
                        <span className="w-[30px] h-[30px] bg-black m-[30px] rounded-[30px] absolute top-[-30px] left-[-30px]" />
                        <line
                          className={`w-[1px] h-[150px] bg-black m-[30px] absolute top-[0px] left-[-15px]`}
                          style={{ borderLeft: "1px solid black" }}
                        ></line>
                        <div className="w-[600px] h-[140px] rounded-[15px] bg-[#D9D9D9] ml-[60px] flex flex-row">
                          <div className="flex flex-col w-[250px]">
                            <p className="w-[250px] h-[35px] text-[26px] ml-2 mr-auto mt-0 mb-auto text-black">
                              {activity.activity_id?.Title}
                            </p>
                            <p className="w-[250px] h-[30px] text-[16px] ml-2 mr-auto mt-0 mb-auto text-black">
                              {activity.activity_id?.Category.name}
                            </p>
                            {activity.activity_id?.SpecialDiscount &&
                            (activity.activity_id.SpecialDiscount >
                              activity.activity_id.Price ||
                              activity.activity_id.SpecialDiscount ===
                                activity.activity_id.Price) ? (
                              <p className="w-[100px] h-[16px] text-[16px] ml-2 mr-auto mt-2 mb-4 text-black">
                                {currentCurrency +
                                  " " +
                                  (
                                    activity.activity_id?.Price * exchangeRate
                                  ).toFixed(2)}
                              </p>
                            ) : (
                              <div className="relative h-[35px]">
                                <p className="w-[100px] h-[13px] text-[13px] ml-2 mr-auto mt-2 mb-1 text-red-500 line-through">
                                  {currentCurrency +
                                    " " +
                                    (activity.activity_id
                                      ? activity.activity_id.Price *
                                        exchangeRate
                                      : 0
                                    ).toFixed(2)}
                                </p>
                                <p className="w-[100px] h-[16px] text-[16px] absolute bottom-[10px] left-[70px] text-black">
                                  {currentCurrency +
                                    " " +
                                    (activity.activity_id
                                      ? activity.activity_id.SpecialDiscount *
                                        exchangeRate
                                      : 0
                                    ).toFixed(2)}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col w-[130px] h-[140px]">
                            <p className="text-[12px] w-[130px] h-[24px] mt-2 mb-0 text-center">
                              {formatDate(
                                activity.activity_id?.DateAndTime.split("T")[0]
                              )}
                            </p>
                            <Rating
                              name="read-only"
                              value={activity.activity_id?.rating}
                              readOnly
                              sx={{
                                marginTop: "2px",
                                marginBottom: "5px",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            />
                            <div className="flex flex-col w-[130px] h-[80px] overflow-auto lasttimeipromise mt-[400px]">
                              {activity.activity_id?.Tags.map(
                                (tag: TagStructure) => (
                                  <Chip
                                    key={tag._id}
                                    label={tag.name}
                                    color="info"
                                    size="small"
                                    sx={{
                                      width: "80px",
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                      marginTop: "3.5px",
                                    }}
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <iframe
                            title="map"
                            className="rounded-r-[15px] mt-0 mb-auto mr-0 ml-auto w-[220px] h-[140px]"
                            src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${activity.activity_id?.Location.longitude}!3d${activity.activity_id?.Location.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                            width="220px"
                            height="140px"
                          ></iframe>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col">
          <TheMAP
            id="startitinerarymap"
            className="flex h-[400px] w-[500px] ml-2 mb-2 mt-auto"
            setLongitude={setStartinglongitude}
            setLatitude={setStartinglatitude}
            lat={startinglatitude}
            long={startinglongitude}
          />
          <TheMAP
            id="enditinerarymap"
            className="flex h-[400px] w-[500px] ml-2"
            setLongitude={setEndinglongitude}
            setLatitude={setEndinglatitude}
            lat={endinglatitude}
            long={endinglongitude}
          />
        </div>
      ) : (
        <TheBIGMAP
          id="bigmap"
          className="flex h-[800px] w-[500px] ml-2 mb-0 mt-auto"
          arrayofmarkers={locations}
        />
      )}
    </Box>
  );
};

export default ItineraryDetails;
