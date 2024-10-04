import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextField, Button } from "@mui/material";
import EditItineraryModal from "./EditItineraryModal";

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
    onDelete, 
    className,
    places: initialPlaces 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(initialImage);
    const [modalOpen, setModalOpen] = useState(false);

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    const handleSave = (data: any) => {
        // Update the state or handle the saved data here
        // For now, just log it
        console.log('Saved data:', data);
        setModalOpen(false);
    };

    return (
        <div className={`w-[420px] h-auto bg-white shadow-md rounded-lg overflow-hidden m-4 transition transform hover:scale-105 ${className}`}>
            <div className="relative w-full h-[200px]">
                <img src={image} alt={initialTitle} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <div className="mb-2">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">{initialTitle}</h2>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600 text-center text-sm">{initialDescription}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-500 text-white p-2 rounded-lg flex flex-col items-center">
                        <p className="text-sm flex items-center">
                            <AccessTimeIcon className="mr-1" /> {initialDate}
                        </p>
                    </div>
                    <div className="bg-red-500 text-white p-2 rounded-lg flex flex-col items-center">
                        <p className="text-sm flex items-center">
                            <ConfirmationNumberIcon className="mr-1" /> {initialPrice}
                        </p>
                    </div>
                    <div className="bg-yellow-500 text-white p-2 rounded-lg flex flex-col items-center">
                        <p className="text-sm flex items-center">
                            <StarIcon className="mr-1" /> {initialRating}
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <button
                        className="editBtn p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                        onClick={handleEditClick}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className="deleteBtn p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        onClick={handleDeleteClick}
                    >
                        <DeleteIcon />
                    </button>
                    <Link
                        to={`/itinerary/${id}`}
                        state={{ title: initialTitle, description: initialDescription, price: initialPrice, date: initialDate, rating: initialRating, image, places: initialPlaces }}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center"
                    >
                        <VisibilityIcon />
                    </Link>
                </div>
            </div>
            <EditItineraryModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave} itineraryData={{
                    title: "",
                    description: "",
                    price: "",
                    date: "",
                    rating: "",
                    image: ""
                }}                //initialData={{ title: initialTitle, description: initialDescription, price: initialPrice, date: initialDate, rating: initialRating, image, places: initialPlaces }}
            />
        </div>
    );
};

export default ItineraryCardCRUD;
