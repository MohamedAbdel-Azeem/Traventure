import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import {
  Button,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import useUpdatePlace from "../../../../custom_hooks/places/useUpdatePlace";
import Place from "../../../../custom_hooks/places/place_interface";
import TheMAP from "../../../../components/Maps/TheMAP";
import { useGetHTags } from "../../../../custom_hooks/useCreateHistoricalTag";
import { useSelector } from "react-redux";
import EditButton from "../../../../components/Buttons/EditButton";
import SaveButton from "../../../../components/Buttons/SaveButton";
import BestDeleteButton from "../../../../components/Buttons/BestDeleteButton";
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
  const [image, setImage] = useState("");
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
    const filteredImages = images.filter((image) => image !== "");
    setImages(filteredImages);
    setIsEditing(!isEditing);
    useUpdatePlace(details._id, {
      name: locationName,
      description: description,
      pictures: images || [],
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

  return (
    <div>
      <div
        className={`w-[422px] h-[422px] bg-[#D9D9D9] rounded-[11px] m-4 ${className}`}
      >
        <div className="w-[422px] h-[121px] relative">
          {isEditing ? (
            <div className="flex flex-col">
              <div className="flex w-full h-full object-cover overflow-auto whitespace-nowrap">
                {images?.map((cimage, index) => (
                  <TextField
                    key={index}
                    title="Upload Image"
                    value={cimage}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="pr-[10px]"
                  />
                ))}
              </div>
              <div className="flex flex-row">
                <TextField onChange={(e) => setImage(e.target.value)} />
                <Button onClick={() => setImages([...images, image])}>
                  Add Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full object-cover rounded-t-[11px] relative">
              <div className="flex bg-[#333333] w-full h-full object-cover overflow-auto whitespace-nowrap">
                {images?.map((cimage) => (
                  <img className="pr-[10px]" src={cimage} alt={locationName} />
                ))}
              </div>
            </div>
          )}

          <div className="absolute top-[60px] right-[10px]">
            {isEditing ? (
              <SaveButton handleSaveClick={handleSaveClick} />
            ) : (
              <EditButton handleEditClick={handleEditClick} />
            )}
            
          </div>

          {isEditing ? (
            <div className="relative">
              <button
                title="Reject"
                className="rejectBtn absolute bottom-[100px] left-[366px]"
                onClick={() =>(handleCancelClick(),
                  setLocationName(details?.name || ""),
                  setDescription(details?.description || ""),
                  setNative(details?.ticket_price.native || 0),
                  setForeign(details?.ticket_price.foreign || 0),
                  setStudent(details?.ticket_price.student || 0),
                  setHours(details?.opening_hrs || ""),
                  setLatitude(details?.location.latitude || 0),
                  setLongitude(details?.location.longitude || 0),
                  setImages(details?.pictures || []),
                  setSelectedTags(
                    details?.historicalTags?.map((tag) => tag._id) || []))
                }
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
            </div>
          ) : (
            <BestDeleteButton
              onDelete={() => handleDeleteClick}
              className="bin-button absolute top-[10px] right-[10px]"
            />
          )}
        </div>
        <div className="w-[422px] h-[30px]">
          {isEditing ? (
            <TextField
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="text-center w-full"
              placeholder="Location Name"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  padding: "4px",
                },
                "& .MuiInputBase-input::placeholder": {
                  textAlign: "center",
                },
              }}
            />
          ) : (
            <p className="text-[24px] text-center font-medium">
              {locationName}
            </p>
          )}
        </div>
        <div className="w-[422px] h-[60px]">
          {isEditing ? (
            <TextField
              multiline
              maxRows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-[16px] text-center w-full"
              placeholder="Description"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  padding: "0px",
                },
              }}
            />
          ) : (
            <p className="text-[16px] text-center  h-[84px] overflow-auto">
              {description}
            </p>
          )}
        </div>
        <div className="w-[422px] h-[211px] flex">
          <div className="w-[311px] h-full rounded-bl-[11px]">
            {isEditing ? (
              <div>
                <TheMAP
                  id={"map" + id}
                  className="h-[300px] w-[300px]"
                  lat={latitude}
                  long={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              </div>
            ) : (
              <div className="text-[16px] h-full overflow-auto">
                <iframe
                  title="map"
                  className="h-full rounded-bl-[11px]"
                  src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                  width="311px"
                  height="211px"
                ></iframe>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="w-[111px] h-full bg-[#B03131] flex flex-col">
              <div className="m-auto">
                <ConfirmationNumberIcon />
                {isEditing ? (
                  <div>
                    <TextField
                      value={native}
                      size="small"
                      onChange={(e) => setNative(Number(e.target.value))}
                      className="w-[124px]"
                      placeholder="native"
                      sx={{
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                          padding: "3.6px",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          textAlign: "center",
                        },
                      }}
                    />
                    <TextField
                      value={foreign}
                      size="small"
                      onChange={(e) => setForeign(Number(e.target.value))}
                      className="w-[124px]"
                      placeholder="foreign"
                      sx={{
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                          padding: "3.6px",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          textAlign: "center",
                        },
                      }}
                    />
                    <TextField
                      value={student}
                      size="small"
                      onChange={(e) => setStudent(Number(e.target.value))}
                      className="w-[124px]"
                      placeholder="student"
                      sx={{
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                          padding: "3.6px",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="overflow-auto w-[100px]">
                    <div>
                      Native:
                      {currentCurrency +
                        " " +
                        (native * exchangeRate).toFixed(2)}
                    </div>
                    <div>
                      Foreign:
                      {currentCurrency +
                        " " +
                        (foreign * exchangeRate).toFixed(2)}
                    </div>
                    <div>
                      Student:
                      {currentCurrency +
                        " " +
                        (student * exchangeRate).toFixed(2)}
                    </div>
                  </p>
                )}
              </div>
            </div>
            <div className="w-[110px] h-full bg-[#7CC7E7] rounded-br-[11px] grid">
              <div className="m-auto flex flex-row">
                <AccessTimeIcon />
                {isEditing ? (
                  <div>
                    <TextField
                      value={hours}
                      size="small"
                      onChange={(e) => setHours(e.target.value)}
                      className="w-[124px]"
                      placeholder="Hours"
                      sx={{
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="overflow-auto w-[100px]">{hours}</p>
                )}
              </div>
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <Select
                  labelId="tags-select-label"
                  multiple
                  disabled={!isEditing}
                  value={selectedTags}
                  onChange={handleTagsChange}
                  renderValue={handleTagsText}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        width: 250,
                      },
                    },
                  }}
                >
                  {tagsLoading && <MenuItem>Loading...</MenuItem>}
                  {tagsError && <MenuItem>Error</MenuItem>}
                  {tagsData.map((tag) => (
                    <MenuItem key={tag._id} value={tag._id}>
                      <Checkbox checked={selectedTags.indexOf(tag._id) > -1} />
                      <ListItemText primary={tag.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!isEditing &&
                details &&
                details.historicalTags.map((tag) => (
                  <div>my Tag : {tag.name}</div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCardCRUD;
