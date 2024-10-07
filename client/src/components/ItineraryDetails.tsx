import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

import { useParams, useLocation, useNavigate } from "react-router-dom";
import IActivity from "../custom_hooks/activities/activity_interface";
import { TouristProfileData } from "../routes/_app/tourist_profile/tourist_profile_data";
import Place from "../custom_hooks/places/place_interface";
import { useGetAllTags } from "../custom_hooks/categoryandTagCRUD";
import { useGetAllActivities } from "../custom_hooks/activities/useGetActivity";
import { useGetAllActivitiesTitleAndId } from "../custom_hooks/activities/useGetActivitiesTitlesAndID";
import { useGetPlace } from "../custom_hooks/places/useGetPlace";
import EditItineraryModal from "./EditItineraryModal";
import IActivityInItinerary from "../custom_hooks/activities/activity_in_itinary";
import { useUpdateItinerary } from "../custom_hooks/itineraries/useUpdateItinerary";
import { set } from "date-fns";

interface TagStructure {
  _id: string;
  name: string;
  __v: number;
}

interface Itinerary {
  _id: string;
  main_Picture?: string;
  title: string;
  description: string;
  added_By: string;
  price: number;
  starting_Date: string;
  ending_Date: string;
  rating: number;
  total: number;
  language: string;
  selectedTags?: TagStructure[];
  pickup_location: string;
  dropoff_location: string;
  plan: {
    place: Place;
    activities: IActivity[];
  }[];
  booked_By: {
    user_id?: TouristProfileData;
  }[];
  accesibility: boolean;
  onDelete: (id: string) => void;
}

const ItineraryDetails: React.FC = () => {
  // console.log("this is where the error is id",id);
  const navigate = useNavigate();

  const location = useLocation();
  const initialItinerary = location.state as Itinerary;
  const id = location.state._id as string;
  // const id=location.pathname.split(`/`)[2];
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [itinerary, setItinerary] = useState(initialItinerary);
  // console.log("this is where the error is id",id);
  const [isEditing, setIsEditing] = useState(false);
  // const [id,setId]= useState<string>(itinerary._id);
  console.log("this is where the error is id", id);
  //Not to reflect in the displayed itinerary until saved
  const deepCopy = (obj: any) => {
    return JSON.parse(JSON.stringify(obj)) as Itinerary;
  };

  const [editedItinerary, setEditedItinerary] = useState(deepCopy(itinerary));
  const [newTag, setNewTag] = useState("");
  const timeUnits: string[] = ["sec", "hours", "days", "month", "years", "min"];
  const [plans, setPlans] = React.useState<Itinerary["plan"]>(itinerary.plan);
  //to be able to put in database
  const transformActivity = (activity: IActivity): IActivityInItinerary => {
    return {
      activity_id: activity.activity_id,
      time_unit: activity.time_unit,
      activity_duration: Number(activity.activity_duration),
    };
  };
  //the one inserted in the database
  const [updatedItinerary, setUpdatedItinerary] = useState({
    ...editedItinerary,
    starting_Date: editedItinerary.starting_Date.split("/").reverse().join("-"),
    ending_Date: editedItinerary.ending_Date.split("/").reverse().join("-"),
    selectedTags: editedItinerary.selectedTags?.map((tag) => tag._id),
    plan: editedItinerary.plan.map((plan) => ({
      place: plan.place._id,
      activities: plan.activities.map(transformActivity),
    })),
  });
  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const selectedIds = typeof value === "string" ? value.split(",") : value;

    setSelectedTags(selectedIds); // Sync selected tags directly

    // Sync the editedItinerary's selectedTags with actual tag objects
    setEditedItinerary({
      ...editedItinerary,
      selectedTags: tagsOptions.filter((tag) => selectedIds.includes(tag._id)),
    });
  };
  const {
    loading: tagsLoading,
    error: tagsError,
    iddata: tagsOptions,
  } = useGetAllTags();
  const {
    activities: activities,
    loading: activityLoading,
    error: activityError,
  } = useGetAllActivitiesTitleAndId();

  const {
    places: apiPlaces,
    gloading: placeLoading,
    gerror: placeError,
  } = useGetPlace();
  console.log("api places", apiPlaces);
  const handleTagsText = (value: string[]) => {
    const valueNames =
      editedItinerary.selectedTags
        ?.filter((tag) => value.includes(tag._id))
        .map((tag) => tag.name) || [];

    return valueNames.join(", ");
  };
  const handleAddTag = (event: React.MouseEvent<HTMLButtonElement>): void => {
    // Prevent adding a tag that is already in the selected tags
    if (newTag && !selectedTags.includes(newTag)) {
      const updatedTags = [...selectedTags, newTag];
      setSelectedTags(updatedTags); // Update the local selectedTags state

      // Update the itinerary state with the new selected tags
      setEditedItinerary({
        ...editedItinerary,
        selectedTags: tagsOptions.filter((tag) =>
          updatedTags.includes(tag._id)
        ), // Update with tag objects
      });
    }
    setNewTag(""); // Clear the new tag input after adding
  };
  const handleRemoveTag = (tagToRemove: TagStructure) => {
    setEditedItinerary((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags?.filter(
        (tag) => tag._id !== tagToRemove._id
      ),
    }));
  };

  console.log(itinerary.plan);
  if (!itinerary) return <p>No itinerary data found</p>;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleOpenModal = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };
  const [validationError, setValidationError] = useState({
    tags: false,
    activities: false,
  });
  const handleSaveModal = () => {
    let isValid = true;

    // Validate tags
    if (editedItinerary.selectedTags?.length === 0) {
      setValidationError((prev) => ({ ...prev, tags: true }));
      isValid = false;
    } else {
      setValidationError((prev) => ({ ...prev, tags: false }));
    }

    // Validate activities (each place must have at least one activity)
    const hasInvalidPlan = editedItinerary.plan.some((place) => {
      return place.activities.length === 0;
    });

    if (hasInvalidPlan) {
      setValidationError((prev) => ({ ...prev, activities: true }));
      isValid = false;
    } else {
      setValidationError((prev) => ({ ...prev, activities: false }));
    }
    if (isValid) {
      const updatedItineraryinline = {
        ...editedItinerary,
        starting_Date: editedItinerary.starting_Date
          .split("/")
          .reverse()
          .join("-"),
        ending_Date: editedItinerary.ending_Date.split("/").reverse().join("-"),
        selectedTags: editedItinerary.selectedTags?.map((tag) => tag._id),
        plan: editedItinerary.plan.map((plan) => ({
          place: plan.place._id,
          activities: plan.activities.map(transformActivity),
        })),
      };
      console.log("initial", itinerary);
      console.log("updating", updatedItinerary);
      setItinerary(editedItinerary);
      console.log("final", editedItinerary);
      setUpdatedItinerary(updatedItineraryinline);
      setIsEditing(false);
      console.log("updated", updatedItinerary);
      navigate(-1);
    }

    // setId(editedItinerary._id);
  };
  useUpdateItinerary(updatedItinerary, id);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setEditedItinerary({ ...editedItinerary, [field]: e.target.value });
    console.log(field, e);
  };

  const handlePlaceChange = (index: number, field: string, value: string) => {
    const updatedPlan = [...editedItinerary.plan];
    updatedPlan[index].place = { ...updatedPlan[index].place, [field]: value };
    setEditedItinerary({ ...editedItinerary, plan: updatedPlan });
    console.log(editedItinerary);
  };

  // const handleActivityChange = (
  //   placeIndex: number,
  //   activityIndex: number,
  //   field: string,
  //   value: string
  // ) => {
  //   const updatedPlan = [...editedItinerary.plan];
  //   if (field === "Title") {
  //     // Handle the nested activity_id.Title field
  //     updatedPlan[placeIndex].activities[activityIndex].activity_id = {
  //       ...updatedPlan[placeIndex].activities[activityIndex].activity_id,
  //       Title: value,
  //     };
  //   } else {
  //     // Handle other fields
  //     updatedPlan[placeIndex].activities[activityIndex] = {
  //       ...updatedPlan[placeIndex].activities[activityIndex],
  //       [field]: value,
  //     };
  //   }

  //   setEditedItinerary({ ...editedItinerary, plan: updatedPlan });
  // };

  const handleAddPlace = () => {
    const newPlace: Place = {
      name: "",
      description: "",
      pictures: [],
      location: { latitude: 0, longitude: 0 },
      opening_hrs: "",
      ticket_price: { native: 0, foreign: 0, student: 0 },
    };
    setEditedItinerary({
      ...editedItinerary,
      plan: [...editedItinerary.plan, { place: newPlace, activities: [] }],
    });
  };

  const handleRemovePlace = (placeIndex: number) => {
    const updatedPlan = editedItinerary.plan.filter(
      (_, index) => index !== placeIndex
    );
    setEditedItinerary({ ...editedItinerary, plan: updatedPlan });
  };
  const handleActivityChangetime_unit = (
    placeIndex: number,
    activityIndex: number,
    e: SelectChangeEvent<any>
  ) => {
    const updatedPlaces = [...editedItinerary.plan];
    // updatedPlaces[placeIndex].activities[activityIndex]._id = e.target
    //   .value as string;
    updatedPlaces[placeIndex].activities[activityIndex].time_unit =
      e.target.value;
    setEditedItinerary({ ...editedItinerary, plan: updatedPlaces });
    console.log("editing", editedItinerary);
  };
  const handleActivityChangeDuration = (
    planindex: number,
    activityIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedPlaces = [...editedItinerary.plan];
    updatedPlaces[planindex].activities[activityIndex].activity_duration =
      e.target.value;
    setEditedItinerary({ ...editedItinerary, plan: updatedPlaces });
    console.log("editing", editedItinerary);
  };

  // const handleAddActivity = (placeIndex: number) => {
  //   const newActivity: IActivity = { Title: "", DateAndTime: new Date(), Location: { latitude: 0, longitude: 0 }, Price: 0, SpecialDiscount: 0, Category: "", Tags: [], BookingIsOpen: true };
  //   const updatedPlan = [...itinerary.plan];
  //   updatedPlan[placeIndex].activities.push(newActivity);
  //   setItinerary({ ...itinerary, plan: updatedPlan });
  // };

  const handleRemoveActivity = (placeIndex: number, activityIndex: number) => {
    const updatedPlan = [...editedItinerary.plan];
    updatedPlan[placeIndex].activities = updatedPlan[
      placeIndex
    ].activities.filter((_, index) => index !== activityIndex);
    setEditedItinerary({ ...editedItinerary, plan: updatedPlan });
  };

  const handleAddActivity = (planIndex: number) => {
    const newActivity: IActivity = {
      Title: "", // Set initial values for the new activity
      DateAndTime: new Date(),
      Location: { latitude: 0, longitude: 0 },
      Price: 0,
      SpecialDiscount: 0,
      Category: "",
      Tags: [],
      BookingIsOpen: true,
    };

    const updatedPlan = [...editedItinerary.plan];
    updatedPlan[planIndex].activities.push(newActivity); // Add the new activity to the specified plan

    setEditedItinerary({ ...editedItinerary, plan: updatedPlan }); // Update the state with the new plan
  };

  const handleActivityChangeID = (
    placeIndex: number,
    activityIndex: number,
    e: SelectChangeEvent<string>
  ) => {
    const updatedPlaces = [...editedItinerary.plan];
    updatedPlaces[placeIndex].activities[activityIndex].activity_id =
      e.target.value;
    setEditedItinerary({ ...editedItinerary, plan: updatedPlaces });
  };

  const handlePlaceChangeID = (
    planIndex: number,
    e: SelectChangeEvent<string>
  ) => {
    const selectedPlaceId = e.target.value;
    const selectedPlace = apiPlaces?.find(
      (place) => place._id === selectedPlaceId
    );

    if (selectedPlace) {
      const updatedPlan = [...editedItinerary.plan];
      updatedPlan[planIndex].place = selectedPlace;
      setEditedItinerary({ ...editedItinerary, plan: updatedPlan });
    }
  };
  // function handleActivityChange(planIndex: number, activityIndex: number, arg2: string, value: string): void {
  //   throw new Error("Function not implemented.");
  // }

  // const handleAddTag = () => {
  //   if (newTag && !itinerary.selectedTags?.includes(newTag)) {
  //     setItinerary((prev) => ({
  //       ...prev,
  //       selectedTags: [...(prev.selectedTags || []), newTag],
  //     }));
  //     setNewTag("");
  //   }
  // };

  // const handleRemoveTag = (tagToRemove: string) => {
  //   setItinerary((prev) => ({
  //     ...prev,
  //     selectedTags: prev.selectedTags?.filter((tag) => tag !== tagToRemove),
  //   }));
  // };

  return (
    <Box className="flex justify-center items-center h-auto py-12 bg-gray-100">
      <Card className="w-[95%] sm:w-[600px] md:w-[800px] lg:w-[900px] rounded-lg shadow-lg overflow-hidden bg-white">
        <CardMedia
          component="img"
          image={itinerary.main_Picture}
          alt={itinerary.title}
          className="h-[400px] w-full object-cover"
        />
        <CardContent>
          <Typography
            variant="h4"
            className="text-center font-bold mb-4 text-blue-600"
          >
            {itinerary.title}
          </Typography>

          <Divider className="my-4" />

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Start Date:</span>{" "}
              {itinerary.starting_Date.slice(0, 10)}
            </Typography>
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">End Date:</span>{" "}
              {itinerary.ending_Date.slice(0, 10)}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Price:</span> $
              {itinerary.price}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Language:</span>{" "}
              {itinerary.language}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Accessibility:</span>{" "}
              {itinerary.accesibility ? "Yes" : "No"}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Pickup Location:</span>{" "}
              {itinerary.pickup_location}
            </Typography>
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Dropoff Location:</span>{" "}
              {itinerary.dropoff_location}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            className="text-gray-700 text-justify leading-relaxed mb-4"
          >
            {itinerary.description}
          </Typography>

          <Divider className="my-4" />

          {itinerary.plan &&
            itinerary.plan.map((item, placeIndex) => (
              <Box key={placeIndex} className="mb-4">
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 text-gray-800"
                >
                  {item.place.name}
                </Typography>

                {item.activities &&
                  item.activities.map((activity, activityIndex) => (
                    <Box key={activityIndex} className="ml-4 mb-2">
                      <Typography variant="body2" className="text-gray-700">
                        <span className="font-semibold">Activity:</span>{" "}
                        {activity.activity_id.Title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        <span className="font-semibold">Duration:</span>{" "}
                        {activity.activity_duration} {activity.time_unit}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            ))}

          <Divider className="my-4" />

          {Array.isArray(itinerary.selectedTags) &&
            itinerary.selectedTags.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 text-gray-800"
                >
                  Tags:
                </Typography>
                <Box className="flex flex-wrap mb-4">
                  {itinerary.selectedTags.map((tag, index) => (
                    <Box
                      key={index}
                      className="bg-blue-100 text-blue-600 py-1 px-2 rounded-full mr-2 mb-2 flex items-center justify-between"
                    >
                      {tag.name}
                      {/* <Button onClick={() => handleRemoveTag(tag)} color="inherit">
                      &times;
                    </Button> */}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

          <Box className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
            >
              Edit Itinerary
            </Button>
          </Box>

          <Dialog open={isEditing} onClose={handleCloseModal}>
            <DialogTitle>Edit Itinerary</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                value={editedItinerary.title}
                onChange={(e) => {
                  setEditedItinerary({
                    ...editedItinerary,
                    title: e.target.value,
                  });
                  console.log("editing", editedItinerary);
                }}
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={editedItinerary.description}
                onChange={(e) => handleChange(e, "description")}
              />
              {/* <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                value={editedItinerary.price}
                onChange={(e) => handleChange(e, "price")}
              /> */}

              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={
                  editedItinerary.starting_Date
                    ? new Date(editedItinerary.starting_Date)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                onChange={(e) => handleChange(e, "starting_Date")}
                margin="dense"
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={
                  editedItinerary.ending_Date
                    ? new Date(editedItinerary.ending_Date)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                onChange={(e) => handleChange(e, "ending_Date")}
                margin="dense"
              />
              <TextField
                label="Price"
                fullWidth
                type="number"
                value={editedItinerary.price}
                onChange={(e) => handleChange(e, "price")}
                margin="dense"
              />
              <TextField
                label="Language"
                fullWidth
                value={editedItinerary.language}
                onChange={(e) => handleChange(e, "language")}
                margin="dense"
              />
              <TextField
                label="Pickup Location"
                fullWidth
                value={editedItinerary.pickup_location}
                onChange={(e) => handleChange(e, "pickup_location")}
                margin="dense"
              />
              <TextField
                label="Dropoff Location"
                fullWidth
                value={editedItinerary.dropoff_location}
                onChange={(e) => handleChange(e, "dropoff_location")}
                margin="dense"
              />

              <Box className="mt-4">
                <Typography variant="h6">Places</Typography>
                {editedItinerary.plan.map((plan, planIndex) => (
                  <Box key={planIndex} className="mb-2">
                    {/* Access the place directly from each plan */}
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id={`place-label-${planIndex}`}>
                        Select Place
                      </InputLabel>
                      <Select
                        labelId={`place-label-${planIndex}`}
                        value={plan.place._id || ""}
                        onChange={(e) => handlePlaceChangeID(planIndex, e)}
                      >
                        {Array.isArray(apiPlaces) &&
                          apiPlaces.map((place) => (
                            <MenuItem key={place._id} value={place._id}>
                              {place.name}
                            </MenuItem>
                          ))}
                      </Select>
                      {plan.place === null && (
                        <FormHelperText error>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Box className="mt-2">
                      <Typography variant="subtitle1">Activities</Typography>
                      {plan.activities.map((activity, activityIndex) => (
                        <Box key={activityIndex} className="mb-2">
                          <FormControl fullWidth>
                            <InputLabel
                              id={`activity-label-${planIndex}-${activityIndex}`}
                            >
                              Select Activity
                            </InputLabel>
                            <Select
                              labelId={`activity-label-${planIndex}-${activityIndex}`}
                              value={activity.activity_id} // Ensure value is a string
                              onChange={(e) =>
                                handleActivityChangeID(
                                  planIndex,
                                  activityIndex,
                                  e
                                )
                              }
                            >
                              {activities.map((activityItem) => (
                                <MenuItem
                                  key={activityItem._id}
                                  value={activityItem._id}
                                >
                                  {activityItem.Title}
                                </MenuItem>
                              ))}
                            </Select>
                            {activity.activity_id === "" && (
                              <FormHelperText error>
                                This field is required
                              </FormHelperText>
                            )}
                          </FormControl>
                          <TextField
                            name="activity_duration"
                            placeholder="activity_duration"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            sx={{ mb: 2 }}
                            value={activity.activity_duration}
                            onChange={(e) =>
                              handleActivityChangeDuration(
                                planIndex,
                                activityIndex,
                                e
                              )
                            }
                          />
                          <FormControl fullWidth>
                            <InputLabel
                              id={`timeUnit-label-${planIndex}-${activityIndex}`}
                            >
                              Time Unit
                            </InputLabel>
                            <Select
                              labelId={`activity-label-${planIndex}-${activityIndex}`}
                              value={activity.time_unit}
                              onChange={(e) =>
                                handleActivityChangetime_unit(
                                  planIndex,
                                  activityIndex,
                                  e
                                )
                              }
                            >
                              {timeUnits.map((timeUnit) => (
                                <MenuItem key={timeUnit} value={timeUnit}>
                                  {timeUnit}
                                </MenuItem>
                              ))}
                            </Select>
                            {activity.time_unit === "" && (
                              <FormHelperText error>
                                This field is required
                              </FormHelperText>
                            )}
                          </FormControl>

                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              handleRemoveActivity(planIndex, activityIndex)
                            }
                          >
                            Remove Activity
                          </Button>
                        </Box>
                      ))}
                      {validationError.activities &&
                        plan.activities.length === 0 && (
                          <FormHelperText error>
                            Each place must have at least one activity.
                          </FormHelperText>
                        )}
                      <Button
                        variant="outlined"
                        onClick={() => handleAddActivity(planIndex)}
                      >
                        Add Activity
                      </Button>
                    </Box>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemovePlace(planIndex)}
                    >
                      Remove Place
                    </Button>
                  </Box>
                ))}
                <Button variant="outlined" onClick={handleAddPlace}>
                  Add Place
                </Button>
              </Box>
              <Box>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={validationError.tags}
                >
                  <InputLabel id="tags-select-label">Tags</InputLabel>
                  <Select
                    labelId="tags-select-label"
                    multiple
                    value={
                      editedItinerary.selectedTags?.map((tag) => tag._id) ||
                      selectedTags
                    }
                    onChange={handleTagsChange}
                    renderValue={handleTagsText}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          width: 250,
                        },
                      },
                    }}
                  >
                    {tagsOptions.map((tag) => (
                      <MenuItem key={tag._id} value={tag._id}>
                        <Checkbox
                          checked={
                            selectedTags.includes(tag._id) ||
                            editedItinerary.selectedTags?.some(
                              (selectedTag) => selectedTag._id === tag._id
                            )
                          }
                        />
                        <ListItemText primary={tag.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {validationError.tags && (
                    <FormHelperText error>
                      At least one tag must be selected.
                    </FormHelperText>
                  )}
                  {/* <FormHelperText>Select multiple tags</FormHelperText> */}
                </FormControl>

                {/* <Button variant="outlined" onClick={handleAddTag}>
    Add Tag
  </Button> */}
                <div className="flex flex-wrap mt-2">
                  {editedItinerary.selectedTags?.map((tag, index) => (
                    <Box
                      key={index}
                      className="bg-blue-100 text-blue-600 py-1 px-2 rounded-full mr-2 mb-2 flex items-center justify-between"
                    >
                      {tag.name}
                      <Button
                        onClick={() => handleRemoveTag(tag)}
                        color="inherit"
                      >
                        &times;
                      </Button>
                    </Box>
                  ))}
                </div>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSaveModal} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItineraryDetails;
