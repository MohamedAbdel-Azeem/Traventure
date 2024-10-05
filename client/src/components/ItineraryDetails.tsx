import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Rating,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

interface Activity {
  name: string;
  duration: string;
}

interface Place {
  name: string;
  activities: Activity[];
}

interface Itinerary {
  id: string;
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  price: string;
  description: string;
  rating: string;
  places: Place[];
  language: string;
  pickupLocation: string;
  dropoffLocation: string;
  selectedTags?: string[]; 
}

const ItineraryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const initialItinerary = location.state as Itinerary;

  const [itinerary, setItinerary] = useState(initialItinerary);
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setItinerary({ ...itinerary, [field]: e.target.value });
  };

  const handlePlaceChange = (index: number, field: string, value: string) => {
    const updatedPlaces = [...itinerary.places];
    updatedPlaces[index] = { ...updatedPlaces[index], [field]: value };
    setItinerary({ ...itinerary, places: updatedPlaces });
  };

  const handleActivityChange = (placeIndex: number, activityIndex: number, field: string, value: string) => {
    const updatedPlaces = [...itinerary.places];
    updatedPlaces[placeIndex].activities[activityIndex] = {
      ...updatedPlaces[placeIndex].activities[activityIndex],
      [field]: value,
    };
    setItinerary({ ...itinerary, places: updatedPlaces });
  };

  const handleAddPlace = () => {
    const newPlace = { name: "", activities: [] };
    setItinerary({ ...itinerary, places: [...itinerary.places, newPlace] });
  };

  const handleRemovePlace = (placeIndex: number) => {
    const updatedPlaces = itinerary.places.filter((_, index) => index !== placeIndex);
    setItinerary({ ...itinerary, places: updatedPlaces });
  };

  const handleAddActivity = (placeIndex: number) => {
    const newActivity = { name: "", duration: "" };
    const updatedPlaces = [...itinerary.places];
    updatedPlaces[placeIndex].activities.push(newActivity);
    setItinerary({ ...itinerary, places: updatedPlaces });
  };

  const handleRemoveActivity = (placeIndex: number, activityIndex: number) => {
    const updatedPlaces = [...itinerary.places];
    updatedPlaces[placeIndex].activities = updatedPlaces[placeIndex].activities.filter(
      (_, index) => index !== activityIndex
    );
    setItinerary({ ...itinerary, places: updatedPlaces });
  };

  const handleAddTag = () => {
    if (newTag && !itinerary.selectedTags?.includes(newTag)) {
      setItinerary((prev) => ({
        ...prev,
        selectedTags: [...(prev.selectedTags || []), newTag],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setItinerary((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags?.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <Box className="flex justify-center items-center h-auto py-12 bg-gray-100">
      <Card className="w-[95%] sm:w-[600px] md:w-[800px] lg:w-[900px] rounded-lg shadow-lg overflow-hidden bg-white">
        <CardMedia
          component="img"
          image={itinerary.image}
          alt={itinerary.title}
          className="h-[400px] w-full object-cover"
        />
        <CardContent>
          <Typography variant="h4" className="text-center font-bold mb-4 text-blue-600">
            {itinerary.title}
          </Typography>

          <Divider className="my-4" />

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Start Date:</span> {itinerary.startDate}
            </Typography>
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">End Date:</span> {itinerary.endDate}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Price:</span> ${itinerary.price}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Language:</span> {itinerary.language}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Pickup Location:</span> {itinerary.pickupLocation}
            </Typography>
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Dropoff Location:</span> {itinerary.dropoffLocation}
            </Typography>
          </Box>

          <Typography variant="body2" className="text-gray-700 text-justify leading-relaxed mb-4">
            {itinerary.description}
          </Typography>

          <Divider className="my-4" />

          {itinerary.places &&
            itinerary.places.map((place, placeIndex) => (
              <Box key={placeIndex} className="mb-4">
                <Typography variant="h6" className="font-semibold mb-2 text-gray-800">
                  {place.name}
                </Typography>

                {place.activities &&
                  place.activities.map((activity, activityIndex) => (
                    <Box key={activityIndex} className="ml-4 mb-2">
                      <Typography variant="body1" className="text-gray-700">
                        <span className="font-semibold">Activity:</span> {activity.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        <span className="font-semibold">Duration:</span> {activity.duration}
                      </Typography>
                    </Box>
                  ))}

              </Box>
            ))}

          <Divider className="my-4" />

          
          {Array.isArray(itinerary.selectedTags) && itinerary.selectedTags.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap justify-center items-center">
                {itinerary.selectedTags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Box className="flex justify-between items-center mt-6">
            <Rating value={parseFloat(itinerary.rating)} precision={0.5} readOnly />
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Edit Itinerary</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={itinerary.title}
            onChange={(e) => handleChange(e, "title")}
            margin="dense"
          />
          <TextField
            label="Image URL"
            fullWidth
            value={itinerary.image}
            onChange={(e) => handleChange(e, "image")}
            margin="dense"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={itinerary.description}
            onChange={(e) => handleChange(e, "description")}
            margin="dense"
          />

         
          <Box className="flex items-center mb-4">
            <TextField
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              margin="dense"
            />
            <Button variant="contained" color="primary" onClick={handleAddTag} className="ml-2">
              Add
            </Button>
          </Box>

     
          {Array.isArray(itinerary.selectedTags) && itinerary.selectedTags.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap justify-center items-center">
                {itinerary.selectedTags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2 flex items-center">
                    {tag}
                    <Button onClick={() => handleRemoveTag(tag)} size="small" color="secondary" className="ml-1">x</Button>
                  </span>
                ))}
              </div>
            </div>
          )}

         
          {itinerary.places.map((place, placeIndex) => (
            <div key={placeIndex}>
              <TextField
                label="Place Name"
                value={place.name}
                onChange={(e) => handlePlaceChange(placeIndex, "name", e.target.value)}
                fullWidth
                margin="dense"
              />
              {place.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="flex items-center">
                  <TextField
                    label="Activity Name"
                    value={activity.name}
                    onChange={(e) => handleActivityChange(placeIndex, activityIndex, "name", e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Duration"
                    value={activity.duration}
                    onChange={(e) => handleActivityChange(placeIndex, activityIndex, "duration", e.target.value)}
                    margin="dense"
                  />
                  <Button onClick={() => handleRemoveActivity(placeIndex, activityIndex)} color="secondary">Remove</Button>
                </div>
              ))}
              <Button onClick={() => handleAddActivity(placeIndex)} color="primary">
                Add Activity
              </Button>
              <Button onClick={() => handleRemovePlace(placeIndex)} color="secondary">
                Remove Place
              </Button>
            </div>
          ))}
          <Button onClick={handleAddPlace} color="primary">
            Add Place
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseModal} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ItineraryDetails;
