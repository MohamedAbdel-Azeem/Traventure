import React from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    price: number; 
    startDate: string; 
    endDate: string; 
    rating: string;
    image: string;
    language: string;
    pickupLocation: string; 
    dropoffLocation: string; 
    onDelete: (id: number) => void;
    className?: string;
    places: Place[]; 
    selectedTags?: string[]; 
}

const ItineraryCardCRUD: React.FC<ItineraryCardCRUDProps> = ({ 
    id, 
    title, 
    description, 
    price, 
    startDate,
    endDate, 
    rating, 
    image, 
    language,
    pickupLocation, 
    dropoffLocation,
    onDelete, 
    className,
    places,
    selectedTags = [],
}) => {
    const handleDeleteClick = () => {
        onDelete(id);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={`m-4 transition transform hover:scale-105 w-96 ${className}`}>
            <div className="relative w-full h-[200px]">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <div className="mb-2">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center truncate">{title}</h2>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600 text-center text-sm truncate">{description}</p>
                </div>

              
                {Array.isArray(selectedTags) && selectedTags.length > 0 && (
                    <div className="mb-2">
            
                        <div className="flex flex-wrap justify-center items-center">
                            {selectedTags.map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-center items-center mb-4">
                    <div className="flex flex-col items-center mx-2">
                        <div className="bg-green-500 text-white p-2 rounded-lg">
                            <p className="text-sm flex items-center">
                                <AccessTimeIcon className="mr-1" /> {formatDate(startDate)}
                            </p>
                        </div>
                    </div>
                    <span className="text-gray-500 mx-4">-</span>
                    <div className="flex flex-col items-center mx-2">
                        <div className="bg-blue-500 text-white p-2 rounded-lg">
                            <p className="text-sm flex items-center">
                                <AccessTimeIcon className="mr-1" /> {formatDate(endDate)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center mb-4 space-x-4">
                    <div className="bg-red-500 text-white p-2 rounded-lg flex flex-col items-center w-1/2">
                        <p className="text-sm flex items-center">
                            <ConfirmationNumberIcon className="mr-1" /> {price.toFixed(2)} 
                        </p>
                    </div>
                    <div className="bg-yellow-500 text-white p-2 rounded-lg flex flex-col items-center w-1/2">
                        <p className="text-sm flex items-center">
                            <StarIcon className="mr-1" /> {rating}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <Link
                        to={`/itinerary/${id}`}
                        state={{ title, description, price, startDate, endDate, rating, image, language, pickupLocation, dropoffLocation, places }} 
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center"
                    >
                        View Details
                    </Link>
                    <button onClick={handleDeleteClick} className="text-red-500 hover:text-red-700 transition">
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItineraryCardCRUD;
