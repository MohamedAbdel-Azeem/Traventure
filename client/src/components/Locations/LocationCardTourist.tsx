import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Button, TextField } from "@mui/material";
import useUpdatePlace from "../../custom_hooks/places/useUpdatePlace";
import Place from "../../custom_hooks/places/place_interface";
import TheMAP from "../Maps/TheMAP";
import { useSelector } from "react-redux";
import { useGetHTags } from "../../custom_hooks/useCreateHistoricalTag";
import TheBIGMAP from "../Maps/TheBIGMAP";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewMap = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`relative w-full max-w-[500px] h-[350px] rounded-lg overflow-hidden shadow-lg transition-all ${className}`}
      style={{ boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{
          backgroundImage: `url(${
            images?.[0] || "https://via.placeholder.com/500"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Title displayed at bottom-left */}
      <div className="absolute bottom-4 left-4 z-10 w-full px-4 pointer-events-none">
        <h2
          className="text-2xl font-bold text-white drop-shadow-md truncate"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        >
          {locationName}
        </h2>
      </div>

      {/* Hover Overlay Content */}
      <div className="absolute inset-0 bg-purple-800 bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-all duration-300 flex flex-col p-6">
        {/* Ticket Prices and Hours (top) */}
        <div className="flex w-full mb-4 mt-5">
          {/* Ticket Prices Section */}
          <div className="flex-1 mr-4">
            <div className="flex items-center mb-2">
              <ConfirmationNumberIcon className="mr-2 text-white" />
              <span className="font-semibold">Ticket Prices</span>
            </div>
            <div>
              <p className="text-white text-sm">
                Native: {currentCurrency} {(native * exchangeRate).toFixed(2)}
              </p>
              <p className="text-white text-sm">
                Foreign: {currentCurrency} {(foreign * exchangeRate).toFixed(2)}
              </p>
              <p className="text-white text-sm">
                Student: {currentCurrency} {(student * exchangeRate).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Hours of Operation Section */}
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <AccessTimeIcon className="mr-2 text-white" />
              <span className="font-semibold">Hours of Operation</span>
            </div>
            <p className="text-white text-sm">{hours}</p>
          </div>
        </div>

        {/* Historical Tags */}
        {Array.isArray(selectedTags) && selectedTags.length > 0 && (
          <div className="flex flex-wrap justify-center items-center mb-4">
            {details?.historicalTags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-sm font-medium mr-2 mb-2"
              >
                {tag.name}
              </span>
            ))}
            {selectedTags.length > 3 && (
              <span className="text-sm text-purple-200">...</span>
            )}
          </div>
        )}

        {/* Description */}
        <div className="w-full mb-4">
          <p
            className="text-center text-sm text-gray-200 truncate"
            style={{ maxWidth: "100%" }}
          >
            {description}
          </p>
        </div>

        {/* View Map Button */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleViewMap}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
          >
            View Map
          </button>
        </div>
      </div>

      {/* Map Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-4/5 md:w-1/2">
            {/* Close Button */}
            <TheBIGMAP
              arrayofmarkers={[
                {
                  latitude: latitude,
                  longitude: longitude,
                },
              ]}
              id="map"
              className="h-[500px] w-full"
            />{" "}
            <button
              onClick={handleCloseModal}
              className="absolute h-[40px] w-[40px] top-2 left-2 text-[25px] text-center items-center text-white bg-red-500 hover:bg-red-600 font-bold rounded-full"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCardTourist;
