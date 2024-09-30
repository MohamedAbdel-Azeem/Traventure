import React, { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Input, TextField } from "@mui/material";

interface LocationCardCRUDProps {
    id: number;
    locationName: string;
    description: string;
    price: string;
    hours: string;
    location: string;
    image: string;
    onDelete: (id: number) => void;
    className?: string;
}

const LocationCardCRUD: React.FC<LocationCardCRUDProps> = ({ id, locationName: initialLocationName, description: initialDescription, price: initialPrice, hours: initialHours, location: initialLocation, image: initialImage, onDelete, className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [locationName, setLocationName] = useState(initialLocationName);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [hours, setHours] = useState(initialHours);
    const [location, setLocation] = useState(initialLocation);
    const [fileName, setFileName] = useState("");
    const [image, setImage] = useState(initialImage);

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
    <div>
        <div className={`w-[422px] h-[334px] bg-[#D9D9D9] rounded-[11px] m-4 ${className}`}>
        <div className="w-[422px] h-[121px] relative">
        {isEditing ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            title="Upload Image"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="z-10 text-center">{fileName || "Choose File"}</span>
                    </div>
                ) : (
                    <img src={image} alt={locationName} className="w-full h-full object-cover rounded-t-[11px]" />
                )}
            </div>
            <div className="w-[422px] h-[37px]">
            {isEditing ? (
                    <TextField
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        className="text-center w-full"
                        placeholder="Location Name"
                        size="small"
                        sx={{
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                            },
                            '& .MuiInputBase-input::placeholder': {
                                textAlign: 'center',
                            },
                        }}
                    />
                ) : (
                    <p className="text-[24px] text-center font-medium">
                        {locationName}
                    </p>
                )}
            </div>
            <div className="w-[422px] h-[84px]">
            {isEditing ? (
                    <TextField
                    multiline
                    maxRows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-[16px] text-center w-full"
                    placeholder="Description"
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                        },
                    }}
                    />
                ) : (
                    <p className="text-[16px] text-center  h-[84px] overflow-auto">
                        {description}
                    </p>
                )}
            </div>
            <div className="w-[422px] h-[92px] flex">
                <div className="w-[140px] h-[92px] bg-[#2D7D10] rounded-bl-[11px]">
                {isEditing ? (
                            <TextField
                                value={location}
                                size="small"
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-[124px]"
                                placeholder="Location"
                                variant="outlined"
                            />
                        ) : ( 
                        <p className="text-[16px] h-[84px] overflow-auto">
                            {location}
                        </p>
                        )}
                </div>
                <div className="w-[152px] h-[92px] bg-[#B03131] flex flex-col">
                <div className="m-auto flex flex-row"><ConfirmationNumberIcon/>{isEditing ? (
                            <TextField
                                value={price}
                                size="small"
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-[124px]"
                                placeholder="Price"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        textAlign: 'center',
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        textAlign: 'center',
                                    },
                                }}
                            />
                        ) : (
                            <p className="overflow-auto w-[100px]">
                            {price}
                        </p>
                        )}</div>
                <div className="m-auto flex flex-row"><AccessTimeIcon/>{isEditing ? (
                            <TextField
                                value={hours}
                                size="small"
                                onChange={(e) => setHours(e.target.value)}
                                className="w-[124px]"
                                placeholder="Hours"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        textAlign: 'center',
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        textAlign: 'center',
                                    },
                                }}
                            />
                        ) : (
                            <p className="overflow-auto w-[100px]">
                            {hours}
                        </p>
                        )}</div>
                </div>
                <div className="w-[140px] h-[92px] bg-[#7CC7E7] rounded-br-[11px] grid grid-cols-2">
                <button className="editBtn m-auto" onClick={handleEditClick}
                    >
              <svg height="1em" viewBox="0 0 512 512">
                <path
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                ></path>
              </svg>
            </button>
            <button className="bin-button m-auto" title="Delete" onClick={handleDeleteClick}
            >
              <svg
                className="bin-top"
                viewBox="0 0 39 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                <line
                  x1="12"
                  y1="1.5"
                  x2="26.0357"
                  y2="1.5"
                  stroke="white"
                  stroke-width="3"
                ></line>
              </svg>
              <svg
                className="bin-bottom"
                viewBox="0 0 33 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_8_19" fill="white">
                  <path
                    d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                  ></path>
                </mask>
                <path
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                  fill="white"
                  mask="url(#path-1-inside-1_8_19)"
                ></path>
                <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                <path d="M21 6V29" stroke="white" stroke-width="4"></path>
              </svg>
            </button>
                </div>

            </div>
        </div>
    </div>
        
     );
}
 
export default LocationCardCRUD;