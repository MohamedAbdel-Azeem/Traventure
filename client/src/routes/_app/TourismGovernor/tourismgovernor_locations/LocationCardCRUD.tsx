import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Button, TextField } from "@mui/material";
import useUpdatePlace from "../../../../custom_hooks/places/useUpdatePlace";
import Place from "../../../../custom_hooks/places/place_interface";
import TheMAP from "../../../../components/Maps/TheMAP";
import { useSelector } from "react-redux";
import { useGetHTags } from "../../../../custom_hooks/useCreateHistoricalTag";
import TheBIGMAP from "../../../../components/Maps/TheBIGMAP";
import EditButton from "../../../../components/Buttons/EditButton";
import SaveButton from "../../../../components/Buttons/SaveButton";
import MiniImageEditor from "./MiniImageEdiitor";
interface LocationCardCRUDProps {
  id: string;
  onDelete: (id: string) => void;
  className?: string;
  wholeLocation: Place | null;
}

const currentuser = location.pathname.split(`/`)[2];
const LocationCardCRUD: React.FC<LocationCardCRUDProps> = ({
  id,
  onDelete,
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
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    details?.historicalTags?.map((tag) => tag._id) || []
  );
  const {
    loading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useGetHTags();

  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === "string" ? value.split(",") : value);
  };

  const handleTagsText = (value: string[]) => {
    const valueNames = tagsData
      .filter((tag) => value.includes(tag._id))
      .map((tag) => tag.name);
    return valueNames.join(", ");
  };

  const handleEditClick = async () => {
    setIsEditing(!isEditing);
  };

  const handleCancelClick = async () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    setIsEditing(!isEditing);
    useUpdatePlace(details._id, {
      name: locationName,
      description: description,
      pictures: selectedImages || [],
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      opening_hrs: hours,
      ticket_price: {
        native: native,
        foreign: foreign,
        student: student,
      },
      added_By: currentuser,
      historicalTags: selectedTags || [],
    });
  };
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleImageChange = (index: number, newValue: string) => {
    if (newValue === "") {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
    } else {
      const updatedImages = [...images];
      updatedImages[index] = newValue;
      setImages(updatedImages);
    }
  };

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );

  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const handleViewMap = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleViewImage = () => {
    setIsModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <div
      className={`relative w-[470px] h-[350px] rounded-lg overflow-hidden shadow-lg transition-all ${className}`}
      style={{ boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="absolute top-[2px] right-[2px] z-10">
        {isEditing ? (
          <SaveButton handleSaveClick={handleSaveClick} />
        ) : (
          <EditButton handleEditClick={handleEditClick} />
        )}
      </div>
      <div className="absolute top-[2px] left-[2px] z-10">
        {isEditing ? (
          <button
            title="Reject"
            className="rejectBtn z-10"
            onClick={handleCancelClick}
          >
            <svg
              height="1em"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="0"
                x2="512"
                y2="512"
                stroke="white"
                strokeWidth="80"
              />
              <line
                x1="512"
                y1="0"
                x2="0"
                y2="512"
                stroke="white"
                strokeWidth="80"
              />
            </svg>
          </button>
        ) : (
          <></>
        )}
      </div>

      <div className="absolute left-[40%] top-[10px] z-10">
        {isEditing ? (
          <button
            className="bg-white transition-all hover:bg-slate-300 rounded-[6px] h-[30px] w-[100px]"
            onClick={handleViewImage}
          >
            Edit Image
          </button>
        ) : (
          <></>
        )}
      </div>

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
        {isEditing ? (
          <></>
        ) : (
          <h2
            className="text-2xl font-bold text-white drop-shadow-md truncate"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
          >
            {locationName}
          </h2>
        )}
      </div>

      {/* Hover Overlay Content */}
      <div
        className={`absolute inset-0 bg-purple-800 bg-opacity-50 ${
          isEditing ? "opacity-100" : "opacity-0"
        } text-white hover:opacity-100 transition-all duration-300 flex flex-col p-6`}
      >
        {/* Ticket Prices and Hours (top) */}
        <div className="flex w-full mb-4 mt-5">
          {/* Ticket Prices Section */}
          <div className="flex-1 mr-4">
            <div className="flex items-center mb-2">
              <ConfirmationNumberIcon className="mr-2 text-white" />
              <span className="font-semibold">Ticket Prices</span>
            </div>
            <div>
              {isEditing ? (
                <>
                  <div className="flex flex-row">
                    <TextField
                      label="Native"
                      type="number"
                      sx={{
                        width: "100px",
                        height: "40px",
                        "& .MuiInputBase-input": {
                          color: "white",
                          fontSize: "14px",
                          height: "40px",
                          boxSizing: "border-box",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          textAlign: "center",
                        },
                        "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                          fontSize: "14px",
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "7px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                            borderRadius: "7px",
                          },
                        },
                      }}
                      value={native}
                      onChange={(e) => setNative(Number(e.target.value))}
                    />
                    <TextField
                      label="Foreign"
                      type="number"
                      sx={{
                        width: "100px",
                        height: "40px",
                        "& .MuiInputBase-input": {
                          color: "white",
                          fontSize: "14px",
                          height: "40px",
                          boxSizing: "border-box",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          textAlign: "center",
                        },
                        "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                          fontSize: "14px",
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "7px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                            borderRadius: "7px",
                          },
                        },
                      }}
                      value={foreign}
                      onChange={(e) => setNative(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex">
                    <TextField
                      label="Student"
                      type="number"
                      sx={{
                        width: "100px",
                        height: "40px",
                        marginX: "auto",
                        marginTop: "10px",
                        "& .MuiInputBase-input": {
                          color: "white",
                          fontSize: "14px",
                          height: "40px",
                          boxSizing: "border-box",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          textAlign: "center",
                        },
                        "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                          fontSize: "14px",
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "7px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                            borderRadius: "7px",
                          },
                        },
                      }}
                      value={student}
                      onChange={(e) => setStudent(Number(e.target.value))}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white text-sm">
                    Native: {currentCurrency}{" "}
                    {(native * exchangeRate).toFixed(2)}
                  </p>
                  <p className="text-white text-sm">
                    Foreign: {currentCurrency}{" "}
                    {(foreign * exchangeRate).toFixed(2)}
                  </p>
                  <p className="text-white text-sm">
                    Student: {currentCurrency}{" "}
                    {(student * exchangeRate).toFixed(2)}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Hours of Operation Section */}
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <AccessTimeIcon className="mr-2 text-white" />
              <span className="font-semibold">Hours of Operation</span>
            </div>
            {isEditing ? (
              <TextField
                label="Hours"
                sx={{
                  width: "200px",
                  height: "50px",
                  marginX: "auto",
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "14px",
                    height: "50px",
                    boxSizing: "border-box",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    textAlign: "center",
                  },
                  "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                    fontSize: "14px",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                  },
                }}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            ) : (
              <p className="text-white text-sm">{hours}</p>
            )}
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
          {isEditing ? (
            <>
              <TextField
                sx={{
                  width: "400px",
                  height: "40px",
                  marginLeft: "9.8px",
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "14px",
                    padding: "0 9.8px",
                    height: "40px",
                    boxSizing: "border-box",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    textAlign: "center",
                  },
                  "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                    fontSize: "14px",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                  },
                }}
                label="Title"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
              <TextField
                sx={{
                  width: "400px",
                  height: "40px",
                  marginLeft: "9.8px",
                  marginTop: "10px",
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "14px",
                    padding: "0 9.8px",
                    height: "40px",
                    boxSizing: "border-box",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    textAlign: "center",
                  },
                  "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                    fontSize: "14px",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                  },
                }}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </>
          ) : (
            <p
              className="text-center text-sm text-gray-200 truncate"
              style={{ maxWidth: "100%" }}
            >
              {description}
            </p>
          )}
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
            {isEditing ? (
              <TheMAP
                id="map"
                className="h-[500px] w-full"
                lat={latitude}
                long={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              />
            ) : (
              <TheBIGMAP
                arrayofmarkers={[
                  {
                    latitude: latitude,
                    longitude: longitude,
                  },
                ]}
                id="map"
                className="h-[500px] w-full"
              />
            )}

            <button
              onClick={handleCloseModal}
              className="absolute h-[40px] w-[40px] top-2 left-2 text-[25px] text-center items-center text-white bg-red-500 hover:bg-red-600 font-bold rounded-full"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {isModalOpen2 && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-4/5 md:w-1/2">
            {isEditing ? (
              <div className="flex flex-row overflow-auto gap-5 h-[240px]">
                <div className="h-[100px] min-w-[200px] flex mt-[90px]">
                  <MiniImageEditor
                    id={id}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    OutsideClassName="w-[200px] h-[100px]"
                    OutsideText="Select Image"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            <button
              onClick={handleCloseModal2}
              className="absolute h-[40px] w-[40px] top-2 right-2 text-[28px] text-center items-center text-white bg-red-500 hover:bg-red-600 font-bold rounded-full"
            >
              &times;
            </button>
            <button
              onClick={() => setImages([...images, ""])}
              className="absolute h-[40px] w-[40px] bottom-2 right-2 text-[28px] text-center items-center text-white bg-green-500 hover:bg-green-600 font-bold rounded-full"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCardCRUD;
