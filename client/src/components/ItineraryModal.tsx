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
  FormHelperText,
  Checkbox,
  ListItemText,
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

const tagsOptions = [
  'Adventure',
  'Relaxation',
  'Culture',
  'Nature',
  'Food',
  'History',
  'Family',
];

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
    starting_Date: '', // renamed for consistency
    ending_Date: '',   // renamed for consistency
    rating: 0,
    main_Picture: '',
    language: '',
    pickup_location: '', 
    dropoff_location: '', 
  });

  const [places, setPlaces] = React.useState<SelectedPlace[]>([{ place: '', activities: [] }]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);

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

  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === 'string' ? value.split(',') : value);
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!formData.title) newErrors.push('Title is required.');
    if (!formData.description) newErrors.push('Description is required.');
    if (formData.price <= 0) newErrors.push('Price must be greater than 0.');
    if (!formData.starting_Date) newErrors.push('Start date is required.');
    if (!formData.ending_Date) newErrors.push('End date is required.');
    if (new Date(formData.starting_Date) >= new Date(formData.ending_Date)) 
      newErrors.push('End date must be after start date.');
    
    places.forEach((place, placeIndex) => {
      if (!place.place) {
        newErrors.push(`Place ${placeIndex + 1} is required.`);
      }
      place.activities.forEach((activity, activityIndex) => {
        if (!activity.name) {
          newErrors.push(`Activity ${activityIndex + 1} in place ${placeIndex + 1} is required.`);
        }
        if (!activity.duration) {
          newErrors.push(`Duration for activity ${activityIndex + 1} in place ${placeIndex + 1} is required.`);
        }
      });
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    const itineraryData = {
      ...formData,
      selectedTags,
      plan: places.map((place) => ({
        place: place.place,
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
          
          {errors.length > 0 && (
            <Box sx={{ mb: 2, color: 'red' }}>
              {errors.map((error, index) => (
                <Typography key={index}>{error}</Typography>
              ))}
            </Box>
          )}

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

<FormControl fullWidth margin="normal">
      <InputLabel id="tags-select-label">Tags</InputLabel>
      <Select
        labelId="tags-select-label"
        multiple
        value={selectedTags}
        onChange={handleTagsChange}
        renderValue={(selected) => selected.join(', ')}
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
          <MenuItem key={tag} value={tag}>
            <Checkbox checked={selectedTags.indexOf(tag) > -1} />
            <ListItemText primary={tag} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select multiple tags</FormHelperText>
    </FormControl>


          <TextField
            name="price"
            type="number"
            placeholder="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            sx={{ mb: 2 }}
          />
        
          <TextField
            name="startDate"
            placeholder="Start Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, starting_Date: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            name="endDate"
            placeholder="End Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, ending_Date: e.target.value })}
            sx={{ mb: 2 }}
          />

          
          <TextField
            name="image"
            placeholder="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, main_Picture: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            name="dropoffLocation"
            placeholder="Dropoff Location"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, dropoff_location: e.target.value })}
            sx={{ mb: 2 }}
          />

          {places.map((place, placeIndex) => (
            <Box key={placeIndex} sx={{ mb: 3 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id={`place-label-${placeIndex}`}>Select Place</InputLabel>
                <Select
                  labelId={`place-label-${placeIndex}`}
                  value={place.place}
                  onChange={(e) => handleChange(placeIndex, e)}
                >
                  {placesData.map((place) => (
                    <MenuItem key={place.id} value={place.name}>
                      {place.name}
                    </MenuItem>
                  ))}
                </Select>
                {place.place === '' && <FormHelperText error>This field is required</FormHelperText>}
              </FormControl>

              {place.activities.map((activity, activityIndex) => (
                <Box key={activityIndex} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id={`activity-label-${placeIndex}-${activityIndex}`}>Select Activity</InputLabel>
                    <Select
                      labelId={`activity-label-${placeIndex}-${activityIndex}`}
                      value={activity.name}
                      onChange={(e) => handleActivityChange(placeIndex, activityIndex, e)}
                    >
                      {placesData
                        .find((p) => p.name === place.place)
                        ?.activities.map((activity) => (
                          <MenuItem key={activity.id} value={activity.name}>
                            {activity.name}
                          </MenuItem>
                        ))}
                    </Select>
                    {activity.name === '' && <FormHelperText error>This field is required</FormHelperText>}
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id={`duration-label-${placeIndex}-${activityIndex}`}>Duration</InputLabel>
                    <Select
                      labelId={`duration-label-${placeIndex}-${activityIndex}`}
                      value={activity.duration}
                      onChange={(e) => handleDurationChange(placeIndex, activityIndex, e)}
                    >
                      {activities.find((a) => a.name === activity.name)?.durationOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {activity.duration === '' && <FormHelperText error>This field is required</FormHelperText>}
                  </FormControl>

                  <IconButton onClick={() => deleteActivity(placeIndex, activityIndex)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={() => addAnotherActivity(placeIndex)}>Add Another Activity</Button>
              <IconButton onClick={() => deletePlace(placeIndex)}>
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={addAnotherPlace}>Add Another Place</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit Itinerary
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItineraryModal;