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
    price: '',
    date: '',
    rating: '',
    image: '',
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
            placeholder="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="date"
            placeholder="Date"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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

          <Divider sx={{ my: 2 }} />

          {places.map((place, placeIndex) => (
            <Box key={placeIndex} sx={{ mb: 3 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id={`place-label-${placeIndex}`}>Select Place</InputLabel>
                <Select
                  labelId={`place-label-${placeIndex}`}
                  value={place.place}
                  onChange={(e) => handleChange(placeIndex, e)}
                  name="place"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {placesData.map((placeItem) => (
                    <MenuItem key={placeItem.id} value={placeItem.name}>
                      {placeItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {place.activities.map((activity, activityIndex) => (
                <Box key={activityIndex} sx={{ mb: 2 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id={`activity-label-${placeIndex}-${activityIndex}`}>Select Activity</InputLabel>
                    <Select
                      labelId={`activity-label-${placeIndex}-${activityIndex}`}
                      value={activity.name}
                      onChange={(e) => handleActivityChange(placeIndex, activityIndex, e)}
                      name="activity"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {placesData.find((placeItem) => placeItem.name === place.place)
                        ?.activities.map((act) => (
                          <MenuItem key={act.id} value={act.name}>
                            {act.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel id={`duration-label-${placeIndex}-${activityIndex}`}>Select Duration</InputLabel>
                    <Select
                      labelId={`duration-label-${placeIndex}-${activityIndex}`}
                      value={activity.duration}
                      onChange={(e) => handleDurationChange(placeIndex, activityIndex, e)}
                      name="duration"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {placesData.find((placeItem) => placeItem.name === place.place)
                        ?.activities.find((act) => act.name === activity.name)?.durationOptions.map((duration) => (
                          <MenuItem key={duration} value={duration}>
                            {duration}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <Button variant="outlined" color="secondary" onClick={() => deleteActivity(placeIndex, activityIndex)}>
                    Remove Activity
                  </Button>
                </Box>
              ))}

              <Button variant="contained" onClick={() => addAnotherActivity(placeIndex)} sx={{ mb: 2 }}>
                Add Another Activity
              </Button>

              <Button variant="outlined" color="error" onClick={() => deletePlace(placeIndex)}>
                Remove Place
              </Button>
            </Box>
          ))}

          <Button variant="contained" onClick={addAnotherPlace} sx={{ mb: 2 }}>
            Add Another Place
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            Submit Itinerary
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItineraryModal;
