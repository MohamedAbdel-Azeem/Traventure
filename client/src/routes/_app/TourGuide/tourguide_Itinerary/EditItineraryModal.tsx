import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

interface EditItineraryModalProps {
    open: boolean;
    onClose: () => void;
    itineraryData: {
        title: string;
        description: string;
        price: string;
        date: string;
        rating: string;
        image: string;
    };
    onSave: (updatedData: any) => void;
}

const EditItineraryModal: React.FC<EditItineraryModalProps> = ({
    open,
    onClose,
    itineraryData,
    onSave,
}) => {
    const [title, setTitle] = React.useState(itineraryData.title);
    const [description, setDescription] = React.useState(itineraryData.description);
    const [price, setPrice] = React.useState(itineraryData.price);
    const [date, setDate] = React.useState(itineraryData.date);
    const [rating, setRating] = React.useState(itineraryData.rating);

    const handleSave = () => {
        const updatedData = { title, description, price, date, rating, /*places*/ };
        onSave(updatedData);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '100px', borderRadius: '8px' }}>
                <h2>Edit Itinerary</h2>
                <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Price"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label="Date"
                    fullWidth
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                    label="Rating"
                    fullWidth
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default EditItineraryModal;
