import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material/Select'; 

interface Activity {
  id: string;
  name: string;
  durationOptions: string[];
}

interface Place {
  id: string;
  name: string;
  activities: Activity[];
}

interface SelectedActivity {
  name: string;
  duration: string;
}

interface SelectedPlace {
  place: string;
  activities: SelectedActivity[];
}

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const activities: Activity[] = [
  { id: '1', name: 'Hiking', durationOptions: ['1 hour', '2 hours', '3 hours'] },
  { id: '2', name: 'Sightseeing', durationOptions: ['1 hour', '2 hours', '3 hours', '4 hours'] },
  { id: '3', name: 'Beach', durationOptions: ['1 hour', '2 hours', '3 hours'] },
];

const placesData: Place[] = [
  { id: '1', name: 'Mountain', activities: [activities[0]] },
  { id: '2', name: 'City', activities: [activities[1]] },
  { id: '3', name: 'Beach Resort', activities: [activities[2]] },
];

const ItineraryModal: React.FC<ItineraryModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: 0,
    startDate: '', 
    endDate: '',   
    rating: '',
    image: '',
    language: '',
    pickupLocation: '', 
    dropoffLocation: '', 
  });

  const [places, setPlaces] = React.useState<SelectedPlace[]>([{ place: '', activities: [] }]);

  const handleChange = (index: number, e: SelectChangeEvent<string>) => {
    const value = e.target.value as string;
    const updatedPlaces = [...places];
    updatedPlaces[index].place = value;
    updatedPlaces[index].activities = [];
    if (value) {
      const selectedPlace = placesData.find((place) => place.name === value);
      if (selectedPlace) {
        updatedPlaces[index].activities = selectedPlace.activities.map((activity) => ({
          name: activity.name,
          duration: '',
        }));
      }
    }
    setPlaces(updatedPlaces);
  };

  const handleActivityChange = (placeIndex: number, activityIndex: number, e: SelectChangeEvent<string>) => {
    const updatedPlaces = [...places];
    updatedPlaces[placeIndex].activities[activityIndex].name = e.target.value as string;
    updatedPlaces[placeIndex].activities[activityIndex].duration = '';
    setPlaces(updatedPlaces);
  };

  const handleDurationChange = (placeIndex: number, activityIndex: number, e: SelectChangeEvent<string>) => {
    const updatedPlaces = [...places];
    updatedPlaces[placeIndex].activities[activityIndex].duration = e.target.value as string;
    setPlaces(updatedPlaces);
  };

  const addAnotherActivity = (placeIndex: number) => {
    const updatedPlaces = [...places];
    updatedPlaces[placeIndex].activities.push({ name: '', duration: '' });
    setPlaces(updatedPlaces);
  };

  const deleteActivity = (placeIndex: number, activityIndex: number) => {
    const updatedPlaces = [...places];
    updatedPlaces[placeIndex].activities.splice(activityIndex, 1);
    setPlaces(updatedPlaces);
  };

  const addAnotherPlace = () => {
    setPlaces([...places, { place: '', activities: [] }]);
  };

  const deletePlace = (placeIndex: number) => {
    const updatedPlaces = [...places];
    updatedPlaces.splice(placeIndex, 1);
    setPlaces(updatedPlaces);
  };

  const handleSubmit = () => {
    const itineraryData = {
      ...formData, 
      places: places.map((place) => ({
        name: place.place,
        activities: place.activities,
      })),
    };
    onSubmit(itineraryData); 
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box
          sx={{
            width: '450px',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 4,
            p: 4,
            maxHeight: '80vh',
            overflowY: 'auto',
            border: '2px solid #1976d2',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: '#1976d2',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" component="h2" gutterBottom>
            Create New Itinerary
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TextField
            name="title"
            placeholder="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            placeholder="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="price"
            type="number"
            placeholder="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => 
            setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
            }
            sx={{ mb: 2 }}
            />
        
          <TextField
            name="startDate"
            placeholder="Start Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="endDate"
            placeholder="End Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            name="rating"
            placeholder="Rating"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="image"
            placeholder="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            sx={{ mb: 2 }}
          />
          
        
          <TextField
            name="language"
            placeholder="Language"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="pickupLocation"
            placeholder="Pickup Location"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="dropoffLocation"
            placeholder="Dropoff Location"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          {places.map((place, placeIndex) => (
            <Box key={placeIndex} sx={{ mb: 3 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id={`place-label-${placeIndex}`}>Select Place</InputLabel>
                <Select
                  labelId={`place-label-${placeIndex}`}
                  value={place.place}
                  onChange={(e) => handleChange(placeIndex, e)}
                >
                  {placesData.map((placeData) => (
                    <MenuItem key={placeData.id} value={placeData.name}>
                      {placeData.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {place.activities.map((activity, activityIndex) => (
                <Box key={activityIndex} sx={{ mb: 1 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id={`activity-label-${placeIndex}-${activityIndex}`}>
                      Select Activity
                    </InputLabel>
                    <Select
                      labelId={`activity-label-${placeIndex}-${activityIndex}`}
                      value={activity.name}
                      onChange={(e) => handleActivityChange(placeIndex, activityIndex, e)}
                    >
                      {placesData
                        .find((p) => p.name === place.place)?.activities.map((activity) => (
                          <MenuItem key={activity.id} value={activity.name}>
                            {activity.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel id={`duration-label-${placeIndex}-${activityIndex}`}>
                      Select Duration
                    </InputLabel>
                    <Select
                      labelId={`duration-label-${placeIndex}-${activityIndex}`}
                      value={activity.duration}
                      onChange={(e) => handleDurationChange(placeIndex, activityIndex, e)}
                    >
                      {placesData
                        .find((p) => p.name === place.place)?.activities.find((a) => a.name === activity.name)
                        ?.durationOptions.map((duration, index) => (
                          <MenuItem key={index} value={duration}>
                            {duration}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <Button onClick={() => deleteActivity(placeIndex, activityIndex)} color="error" sx={{ mt: 1 }}>
                    Delete Activity
                  </Button>
                </Box>
              ))}
              <Button onClick={() => addAnotherActivity(placeIndex)} color="primary">
                Add Another Activity
              </Button>
              <Button onClick={() => deletePlace(placeIndex)} color="error" sx={{ mt: 1 }}>
                Delete Place
              </Button>
            </Box>
          ))}

          <Button onClick={addAnotherPlace} color="primary">
            Add Another Place
          </Button>

          <Box sx={{ mt: 3 }}>
            <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
              Submit Itinerary
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItineraryModal;
