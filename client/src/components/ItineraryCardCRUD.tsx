import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextField } from "@mui/material";

interface Activity {
    id: number; 
    name: string;
    description: string;
    time: string; 
}

interface Place {
    id: number; 
    name: string;
    activities: Activity[];
}

interface ItineraryCardCRUDProps {
    id: number;
    title: string;
    description: string;
    price: string;
    date: string;
    rating: string;
    image: string;
    language: string;
    pickupLocation: string; 
    dropoffLocation: string; 
    onDelete: (id: number) => void;
    className?: string;
    places: Place[]; 
}

const ItineraryCardCRUD: React.FC<ItineraryCardCRUDProps> = ({ 
    id, 
    title: initialTitle, 
    description: initialDescription, 
    price: initialPrice, 
    date: initialDate, 
    rating: initialRating, 
    image: initialImage, 
    language: initialLanguage,
    pickupLocation: initialPickupLocation, 
    dropoffLocation: initialDropoffLocation,
    onDelete, 
    className,
    places: initialPlaces 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [date, setDate] = useState(initialDate);
    const [rating, setRating] = useState(initialRating);
    const [fileName, setFileName] = useState("");
    const [image, setImage] = useState(initialImage);
    const [language, setLanguage] = useState(initialLanguage);
    const [pickupLocation, setPickupLocation] = useState(initialPickupLocation); 
    const [dropoffLocation, setDropoffLocation] = useState(initialDropoffLocation); 

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <div className={`m-4 transition transform hover:scale-105 w-96 ${className}`}>
            <div className="relative w-full h-[200px]">
                {isEditing ? (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            title="Upload Image"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="z-10 text-center text-gray-600">{fileName || "Choose Image"}</span>
                    </div>
                ) : (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                )}
            </div>
            <div className="p-4">
                <div className="mb-2">
                    {isEditing ? (
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-center w-full"
                            placeholder="Title"
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    textAlign: 'center',
                                },
                            }}
                        />
                    ) : (
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">{title}</h2>
                    )}
                </div>
                <div className="mb-4">
                    {isEditing ? (
                        <TextField
                            multiline
                            maxRows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-center w-full"
                            placeholder="Description"
                            size="small"
                            sx={{
                                '& .MuiInputBase-input': {
                                    textAlign: 'center',
                                },
                            }}
                        />
                    ) : (
                        <p className="text-gray-600 text-center text-sm">{description}</p>
                    )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-500 text-white p-2 rounded-lg flex flex-col items-center">
                        {isEditing ? (
                            <TextField
                                value={date}
                                size="small"
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full"
                                placeholder="Date"
                                variant="outlined"
                            />
                        ) : (
                            <p className="text-sm flex items-center">
                                <AccessTimeIcon className="mr-1" /> {date}
                            </p>
                        )}
                    </div>
                    <div className="bg-red-500 text-white p-2 rounded-lg flex flex-col items-center">
                        {isEditing ? (
                            <TextField
                                value={price}
                                size="small"
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full"
                                placeholder="Price"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        textAlign: 'center',
                                    },
                                }}
                            />
                        ) : (
                            <p className="text-sm flex items-center">
                                <ConfirmationNumberIcon className="mr-1" /> {price}
                            </p>
                        )}
                    </div>
                    <div className="bg-yellow-500 text-white p-2 rounded-lg flex flex-col items-center">
                        {isEditing ? (
                            <TextField
                                value={rating}
                                size="small"
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full"
                                placeholder="Rating"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        textAlign: 'center',
                                    },
                                }}
                            />
                        ) : (
                            <p className="text-sm flex items-center">
                                <StarIcon className="mr-1" /> {rating}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <Link
                        to={`/itinerary/${id}`}
                        state={{ title, description, price, date, rating, image, language, pickupLocation, dropoffLocation, places: initialPlaces }} // Pass new fields here
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center"
                    >
                        <VisibilityIcon />
                    </Link>
                    <button
                        className="deleteBtn p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        onClick={handleDeleteClick}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItineraryCardCRUD;
