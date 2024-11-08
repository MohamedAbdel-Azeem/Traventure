import React, { useState } from "react";
import LocationCardCRUD from "./LocationCardCRUD";
import ImprovedSidebar from "./ImprovedSidebar";
import {useGetPlace, useGetPlaceID} from "../custom_hooks/places/useGetPlace";
import Place from "../custom_hooks/places/place_interface";
import { useDeletePlaces } from "../custom_hooks/places/useDeletePlace";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Checkbox, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import TheMAP from "./TheMAP";
import { createPlaceID } from "../custom_hooks/places/placeService";
import { useGetHTags } from "../custom_hooks/useCreateHistoricalTag";
import NewNavbar from "./NewNavbar";

const Locations = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const currentuser=location.pathname.split(`/`)[2];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nativePrice, setNativePrice] = useState(10);
  const [foreignPrice, setForeignPrice] = useState(100);
  const [studentPrice, setStudentPrice] = useState(5);
  const [hours, setHours] = useState("9:00→5:00");
  const [latitude, setLatitude] = useState(30.0);
  const [longitude, setLongitude] = useState(31.2);
  const [image, setImage] = useState<string>('');
  const [newcards, setNewcards] = useState<Place[] | null>(null);
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

  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
  };

  const {
    loading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useGetHTags();



  const { idplaces, idgloading, idgerror, fetchPlacesID } = useGetPlaceID(currentuser);
  React.useEffect(() => {
    if (idplaces) {
        setNewcards(idplaces);
    }
}, [idplaces]);
console.log(newcards);
const handleCreate = async () => {
  const newCard = {
      id: Date.now().toString(),
      name,
      description,
      added_By: currentuser,
      historicalTags: selectedTags||[],
      ticket_price: {
          native: nativePrice,
          foreign: foreignPrice,
          student: studentPrice,
      },
      opening_hrs: hours,
      location: {
          latitude,
          longitude,
      },
      pictures: [image],
  };
  try {
      await createPlaceID(currentuser, newCard);
      await fetchPlacesID();
      setOpen(false);
  } catch (error) {
      console.error("Error creating place:", error);
  }

  setName('');
  setDescription('');
  setImage('');
  setNativePrice(0);
  setStudentPrice(0);
  setForeignPrice(0);

};

const { deletePlace, error: deleteError, loading: deleteLoading } = useDeletePlaces();

const handleDelete = (id: string) => {
    deletePlace(id);
    if (!deleteError && !deleteLoading) {
        const updatedCards = newcards?.filter(card => card._id !== id) ?? [];
        setNewcards(updatedCards);
    }
};


    return ( 
    <div className="flex justify-center">
        <NewNavbar/>
    <div className="grid grid-cols-3 mt-20">
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <Box className="grid grid-cols-2">
              <FormControl fullWidth sx={{ marginY: 1 }}><InputLabel>Name</InputLabel>
                <OutlinedInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                />
              </FormControl>

              <FormControl fullWidth sx={{ marginY: 1 }}><InputLabel>Description</InputLabel>
                <OutlinedInput
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label="Description"
              /></FormControl>

              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel>Native Price</InputLabel>
                <OutlinedInput
                type="number"
                value={nativePrice}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                onChange={(e) => setNativePrice(Number(e.target.value))}
                label="Native Price"
              /></FormControl>
              
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel>Foreign Price</InputLabel>
                <OutlinedInput
                type="number"
                value={foreignPrice}
                startAdornment={<InputAdornment position="start">EGP</InputAdornment>}
                onChange={(e) => setForeignPrice(Number(e.target.value))}
                label="Foreign Price"
              /></FormControl>
              
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel>Student Price</InputLabel>
                <OutlinedInput
                type="number"
                value={studentPrice}
                startAdornment={<InputAdornment position="start">₫</InputAdornment>}
                onChange={(e) => setStudentPrice(Number(e.target.value))}
                label="Student Price"
              /></FormControl>
              
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel>Hours</InputLabel>
                <OutlinedInput
                label="Hours"
                type="string"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              /></FormControl>
              <FormControl fullWidth sx={{ marginY: 1 }}  className="col-span-2">
                <div>
                  <TheMAP
                  id="create map"
                  lat={latitude} long={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}/>
                </div>
                </FormControl>

              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel>Image</InputLabel>
                <OutlinedInput
                label="Image"
                type="string"
                value={image}
                onChange={(e) => {setImage(e.target.value)}}
              /></FormControl>
              
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <Select
                labelId="tags-select-label"
                multiple
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
          <Button className="col-span-2" onClick={handleCreate}>Add</Button>
              
        </Box>
        </Box>
      </Modal>
    <div className="flex w-[422px] h-[422px] bg-[#D9D9D9] rounded-[11px] m-4 hover:bg-[#c0c0c0] transition duration-300 cursor-pointer" onClick={handleOpen}>
                    <p className="m-auto text-[40px]">
                        Create New Place
                    </p>
                </div>
            {newcards?.map(card => (
                <LocationCardCRUD
                wholeLocation={card}
                key={card._id}
                id={card._id ?? ""}
                onDelete={handleDelete}
                className="hover:bg-[#f0f0f0] transition duration-300"
            />
            ))}
        </div>

    </div>
    
     );
}
 
export default Locations;
