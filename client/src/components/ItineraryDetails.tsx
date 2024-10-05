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
  MenuItem,
  Select,
  SelectChangeEvent,
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
}

const ItineraryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const initialItinerary = location.state as Itinerary;

  const [itinerary, setItinerary] = useState(initialItinerary);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSelectChange = (e: SelectChangeEvent<string>, field: string) => {
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
    const updatedPlaces = itinerary.places.filter((_: any, index: number) => index !== placeIndex);
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
      (_: any, index: number) => index !== activityIndex
    );
    setItinerary({ ...itinerary, places: updatedPlaces });
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
              <span className="mr-2 font-semibold">Price:</span> {itinerary.price}
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
            margin="none"
          />
          <TextField
            label="Start Date"
            type="date" 
            fullWidth
            value={itinerary.startDate}
            onChange={(e) => handleChange(e, "startDate")} 
            margin="normal"
            InputLabelProps={{
              shrink: true, 
            }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={itinerary.endDate}
            onChange={(e) => handleChange(e, "endDate")} 
            margin="normal"
            InputLabelProps={{
              shrink: true, 
            }}
          />
          <TextField
            label="Price"
            fullWidth
            value={itinerary.price}
            onChange={(e) => handleChange(e, "price")}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={itinerary.description}
            onChange={(e) => handleChange(e, "description")}
            margin="normal"
          />
          <TextField
            label="Language"
            fullWidth
            value={itinerary.language}
            onChange={(e) => handleChange(e, "language")}
            margin="normal"
          />
          <TextField
            label="Pickup Location"
            fullWidth
            value={itinerary.pickupLocation}
            onChange={(e) => handleChange(e, "pickupLocation")}
            margin="normal"
          />
          <TextField
            label="Dropoff Location"
            fullWidth
            value={itinerary.dropoffLocation}
            onChange={(e) => handleChange(e, "dropoffLocation")}
            margin="normal"
          />
          <Divider className="my-4" />
          {itinerary.places.map((place, placeIndex) => (
            <Box key={placeIndex} mb={2}>
              <TextField
                label="Place Name"
                fullWidth
                value={place.name}
                onChange={(e) => handlePlaceChange(placeIndex, "name", e.target.value)}
              />
              {place.activities.map((activity, activityIndex) => (
                <Box key={activityIndex} mb={1}>
                  <TextField
                    label="Activity Name"
                    fullWidth
                    value={activity.name}
                    onChange={(e) =>
                      handleActivityChange(placeIndex, activityIndex, "name", e.target.value)
                    }
                  />
                  <TextField
                    label="Duration"
                    fullWidth
                    value={activity.duration}
                    onChange={(e) =>
                      handleActivityChange(placeIndex, activityIndex, "duration", e.target.value)
                    }
                  />
                  <Button onClick={() => handleRemoveActivity(placeIndex, activityIndex)}>Remove Activity</Button>
                </Box>
              ))}
              <Button onClick={() => handleAddActivity(placeIndex)}>Add Activity</Button>
              <Button onClick={() => handleRemovePlace(placeIndex)}>Remove Place</Button>
            </Box>
          ))}
          <Button onClick={handleAddPlace}>Add Place</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseModal();
              
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ItineraryDetails;
