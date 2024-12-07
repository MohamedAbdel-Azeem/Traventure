import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Button, TextField } from "@mui/material";
import useUpdatePlace from "../../custom_hooks/places/useUpdatePlace";
import Place from "../../custom_hooks/places/place_interface";
import TheMAP from "../Maps/TheMAP";
import { useSelector } from "react-redux";
import { useGetHTags } from "../../custom_hooks/useCreateHistoricalTag";

interface LocationCardTouristProps {
  id: string;
  className?: string;
  wholeLocation: Place | null;
}

const LocationCardTourist: React.FC<LocationCardTouristProps> = ({
  id,
  className,
  wholeLocation: details,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [locationName, setLocationName] = useState(details?.name || "");
  const [description, setDescription] = useState(details?.description || "");
  const [native, setNative] = useState(details?.ticket_price.native ?? 0);
  const [foreign, setForeign] = useState(details?.ticket_price.foreign ?? 0);
  const [student, setStudent] = useState(details?.ticket_price.student ?? 0);
  const [hours, setHours] = useState(details?.opening_hrs || "");
  const [latitude, setLatitude] = useState(details?.location.latitude ?? 0);
  const [longitude, setLongitude] = useState(details?.location.longitude ?? 0);
  const [images, setImages] = useState(details?.pictures || []);
  const [image, setImage] = useState("");
  const [apiBody, setApiBody] = useState<Place | null>(details);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    details?.historicalTags?.map((tag) => tag._id) || []
  );

  const {
    loading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useGetHTags();

  const handleTagsText = (value: string[]) => {
    const valueNames = tagsData
      .filter((tag) => value.includes(tag._id))
      .map((tag) => tag.name);
    return valueNames.join(", ");

  };

  console.log(details.historicalTags.map((tag) => typeof tag.name));

  useUpdatePlace(id, apiBody);
  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  return (
    <div 
      className={`relative w-full max-w-[500px] h-[350px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all ${className}`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${images?.[0] || 'https://via.placeholder.com/500'})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
  
      {/* Title displayed at bottom-left */}
      <div className="absolute bottom-4 left-4 z-10">
        {isEditing ? (
          <TextField
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full text-center bg-white bg-opacity-70 rounded-md p-1"
            placeholder="Location Name"
          />
        ) : (
          <h2 className="text-2xl font-bold text-white drop-shadow-md">{locationName}</h2>
        )}
      </div>
  
      {/* Hover Overlay Content */}
      <div 
        className="absolute inset-0 bg-purple-800 bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-all duration-300 flex flex-col p-6"
      >
        {/* Images Section (when editing) */}
        {isEditing && (
          <div className="w-full h-[150px] rounded-lg overflow-hidden mb-4">
            <div className="flex flex-col">
              <div className="flex w-full h-[100px] overflow-x-auto space-x-2">
                {images?.map((cimage, index) => (
                  <TextField
                    key={index}
                    title="Upload Image"
                    value={cimage}
                    className="pr-2"
                  />
                ))}
              </div>
              <div className="flex mt-4">
                <TextField 
                  onChange={(e) => setImage(e.target.value)} 
                  className="flex-1" 
                  placeholder="Image URL" 
                />
                <Button onClick={() => setImages([...images, image])} className="ml-2 bg-purple-600 text-white rounded-md px-4">
                  Add Image
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Historical Tags */}
        {Array.isArray(selectedTags) && selectedTags.length > 0 && (
          <div className="flex flex-wrap justify-center items-center mb-4">
            {details?.historicalTags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-sm font-medium mr-2 mb-2"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
    
        {/* Description */}
        <div className="w-full mb-4">
          {isEditing ? (
            <TextField
              multiline
              maxRows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
              placeholder="Description"
            />
          ) : (
            <p className="text-center text-sm text-gray-200">{description}</p>
          )}
        </div>
  
        {/* Ticket Prices and Hours */}
        <div className="w-full flex flex-col md:flex-row">
          {/* Ticket Prices Section */}
          <div className="flex-1 mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <ConfirmationNumberIcon className="mr-2 text-white" />
              <span className="font-semibold">Ticket Prices</span>
            </div>
            {isEditing ? (
              <div className="space-y-3 text-white text-sm">
                <TextField value={native} onChange={(e) => setNative(Number(e.target.value))} placeholder="Native" fullWidth />
                <TextField value={foreign} onChange={(e) => setForeign(Number(e.target.value))} placeholder="Foreign" fullWidth />
                <TextField value={student} onChange={(e) => setStudent(Number(e.target.value))} placeholder="Student" fullWidth />
              </div>
            ) : (
              <div>
                <p className="text-white text-sm">Native: {currentCurrency} {(native * exchangeRate).toFixed(2)}</p>
                <p className="text-white text-sm">Foreign: {currentCurrency} {(foreign * exchangeRate).toFixed(2)}</p>
                <p className="text-white text-sm">Student: {currentCurrency} {(student * exchangeRate).toFixed(2)}</p>
              </div>
            )}
          </div>
  
          {/* Hours of Operation Section */}
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <AccessTimeIcon className="mr-2 text-white" />
              <span className="font-semibold">Hours of Operation</span>
            </div>
            {isEditing ? (
              <TextField 
                value={hours} 
                onChange={(e) => setHours(e.target.value)} 
                placeholder="Hours" 
                fullWidth 
              />
            ) : (
              <p className="text-white text-sm">{hours}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  export default LocationCardTourist;