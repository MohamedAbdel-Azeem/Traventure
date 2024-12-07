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
    <div className={`w-full max-w-[500px] border border-gray-300 rounded-lg p-4 ${className}`}>
      {/* Image Section */}
      <div className="w-full h-[250px] rounded-lg overflow-hidden">
        {isEditing ? (
          <div className="flex flex-col">
            <div className="flex w-full h-full object-cover overflow-auto whitespace-nowrap">
              {images?.map((cimage, index) => (
                <TextField
                  key={index}
                  title="Upload Image"
                  value={cimage}
                  className="pr-2"
                />
              ))}
            </div>
            <div className="flex flex-row mt-2">
              <TextField onChange={(e) => setImage(e.target.value)} className="flex-1" />
              <Button onClick={() => setImages([...images, image])} className="ml-2">
                Add Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full object-cover relative">
            <div className="flex w-full h-full object-cover overflow-auto whitespace-nowrap">
              {images?.map((cimage) => (
                <img key={cimage} className="w-full h-full object-cover" src={cimage} alt={locationName} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Location Name */}
      <div className="w-full mt-4">
        {isEditing ? (
          <TextField
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full text-center"
            placeholder="Location Name"
            size="small"
            sx={{
              "& .MuiInputBase-input": {
                textAlign: "center",
                padding: "8px",
              },
            }}
          />
        ) : (
          <p className="text-2xl text-center font-medium">{locationName}</p>
        )}
      </div>

      {/* Historical Tags */}

      {Array.isArray(selectedTags) && selectedTags.length > 0 && (
  <div className="mb-2">
    <div className="flex flex-wrap justify-center items-center">
      {details?.historicalTags.map((tag, index) => (
        <span 
          key={index} 
          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mr-2 mb-2"
        >
          {tag.name}
        </span>
      ))}
    </div>
  </div>
)}




      {/* Description */}
      <div className="w-full mt-2">
        {isEditing ? (
          <TextField
            multiline
            maxRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
            placeholder="Description"
            size="small"
            sx={{
              "& .MuiInputBase-input": {
                textAlign: "center",
                padding: "8px",
              },
            }}
          />
        ) : (
          <p className="text-base text-center mt-2">{description}</p>
        )}
      </div>
      

      {/* Ticket Prices and Hours */}
      <div className="w-full mt-4 flex flex-row">
        {/* Ticket Prices Section */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <ConfirmationNumberIcon className="mr-2" />
            <span className="font-semibold">Ticket Prices</span>
          </div>
          {isEditing ? (
            <div className="space-y-2">
              <TextField
                value={native}
                size="small"
                onChange={(e) => setNative(Number(e.target.value))}
                placeholder="Native"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    padding: "8px",
                  },
                }}
              />
              <TextField
                value={foreign}
                size="small"
                onChange={(e) => setForeign(Number(e.target.value))}
                placeholder="Foreign"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    padding: "8px",
                  },
                }}
              />
              <TextField
                value={student}
                size="small"
                onChange={(e) => setStudent(Number(e.target.value))}
                placeholder="Student"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    padding: "8px",
                  },
                }}
              />
            </div>
          ) : (
            <div>
              <p>Native: {currentCurrency} {(native * exchangeRate).toFixed(2)}</p>
              <p>Foreign: {currentCurrency} {(foreign * exchangeRate).toFixed(2)}</p>
              <p>Student: {currentCurrency} {(student * exchangeRate).toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Hours of Operation Section */}
        <div className="flex-1 ml-4">
          <div className="flex items-center mb-2">
            <AccessTimeIcon className="mr-2" />
            <span className="font-semibold">Hours of Operation</span>
          </div>
          {isEditing ? (
            <TextField
              value={hours}
              size="small"
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  padding: "8px",
                },
              }}
            />
          ) : (
            <p>{hours}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCardTourist;