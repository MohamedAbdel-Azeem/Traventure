import React, { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Button, Checkbox, FormControl, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import useUpdatePlace from "../custom_hooks/places/useUpdatePlace";
import  Place  from "../custom_hooks/places/place_interface";
import TheMAP from "./TheMAP";
import { useGetHTags } from "../custom_hooks/useCreateHistoricalTag";
interface LocationCardCRUDProps {
    id: string,
    onDelete: (id: string) => void;
    className?: string;
    wholeLocation:Place|null;
}

const currentuser=location.pathname.split(`/`)[2];
const LocationCardCRUD: React.FC<LocationCardCRUDProps> = (
    { id, onDelete, className, wholeLocation:details }) => {
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
    const [image, setImage] = useState('');
    console.log("+++++++++++++++++++++++++++++++++++++++++"+details?.historicalTags[0]);
    const [selectedTags, setSelectedTags] = useState<string[]>(details?.historicalTags || []);
    const [apiBody, setApiBody] = useState<Place | null>(details);
    useUpdatePlace(id,apiBody);
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
        console.log(selectedTags);
      };
      
      
      const handleTagsText = (value: string[]) => {
        const valueNames = tagsData
          .filter((tag) => value.includes(tag._id))
          .map((tag) => tag.name);
        return valueNames.join(", ");
      };



    const handleEditClick = () => {
        const filteredImages = images.filter(image => image !== '');
        setImages(filteredImages);
        setIsEditing(!isEditing);
        setApiBody({
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
            added_By:currentuser,
            historicalTags: [],
        });
    };
    const handleDeleteClick = () => {
        onDelete(id);
    };
    const handleImageChange = (index:number, newValue:string) => {
        if (newValue === '') {
            const updatedImages = images.filter((_, i) => i !== index);
            setImages(updatedImages);
          }else {
        const updatedImages = [...images];
        updatedImages[index] = newValue;
        setImages(updatedImages);}
      };
    return ( 
    <div>
        <div className={`w-[422px] h-[422px] bg-[#D9D9D9] rounded-[11px] m-4 ${className}`}>
        <div className="w-[422px] h-[121px] relative">
        {isEditing ? (<div className="flex flex-col">
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
                        <TextField
                        onChange={(e) => setImage(e.target.value)}/>
                        <Button 
                        onClick={() => setImages([...images,image])}
                        >Add Image</Button>
                        </div>
                 </div>
                ) : (
                <div className="w-full h-full object-cover rounded-t-[11px] relative">

                    <div className="flex bg-[#333333] w-full h-full object-cover overflow-auto whitespace-nowrap">
                        {images?.map(cimage => (<img className="pr-[10px]" src={cimage} alt={locationName}/>
                        ))}
                    </div>


                    </div>
                )}

                <div className="absolute top-[60px] right-[10px]">
                <button title="Edit" className="editBtn" onClick={handleEditClick}>
                <svg height="1em" viewBox="0 0 512 512">
                  <path
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                  </path>
                </svg>
                </button> 
                </div>

        <button className="bin-button absolute top-[10px] right-[10px]" title="Delete" onClick={handleDeleteClick}
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
            <div className="w-[422px] h-[30px]">
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
                                padding: '4px'
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
                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                            padding: '0px'
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
                            <TheMAP lat={latitude} long={longitude}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}/>
                    </div>
                        ) : ( 
                        <div className="text-[16px] h-full overflow-auto">
                            <iframe title="map" className="h-full rounded-bl-[11px]" src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                            width="311px" height="211px"
                            ></iframe>
                        </div>
                        )}
                </div>
                <div className="flex flex-col">
                <div className="w-[111px] h-full bg-[#B03131] flex flex-col">
                <div className="m-auto"><ConfirmationNumberIcon/>{isEditing ? (
                    <div>
                    <TextField
                        value={native}
                        size="small"
                        onChange={(e) => setNative(Number(e.target.value))}
                        className="w-[124px]"
                        placeholder="native"
                        sx={{
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                                padding: '3.6px',
                            },
                            '& .MuiInputBase-input::placeholder': {
                                textAlign: 'center',
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
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                                padding: '3.6px',
                            },
                            '& .MuiInputBase-input::placeholder': {
                                textAlign: 'center',
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
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                                padding: '3.6px',
                            },
                            '& .MuiInputBase-input::placeholder': {
                                textAlign: 'center',
                            },
                        }}
                    />
                    </div>
                        ) : (
                            <p className="overflow-auto w-[100px]">
                                <div>Native:{native}</div>
                                <div>Foreign:{foreign}</div>
                                <div>Student:{student}</div>
                        </p>
                        )}</div>
                </div>
                <div className="w-[110px] h-full bg-[#7CC7E7] rounded-br-[11px] grid">
                
                <div className="m-auto flex flex-row"><AccessTimeIcon/>{isEditing ? (
                            <div><TextField
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



                            </div>
                        ) : (
                            <p className="overflow-auto w-[100px]">
                            {hours}
                            </p>
                        )}</div>
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
                {tagsData.map((tag) => (
                    <MenuItem key={tag._id} value={tag._id}>
                    <Checkbox checked={selectedTags.indexOf(tag._id) > -1} />
                    <ListItemText primary={tag.name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
                </div>
                </div>
                

            </div>
        </div>
    </div>
        
     );
}
 
export default LocationCardCRUD;