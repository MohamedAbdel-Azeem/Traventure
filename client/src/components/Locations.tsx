import React, { useState } from "react";
import LocationCardCRUD from "./LocationCardCRUD";
import ImprovedSidebar from "./ImprovedSidebar";
import useGetPlace from "../custom_hooks/places/useGetPlace"
import  Place  from "../custom_hooks/places/place_interface";
import {usedeletePlaces} from "../custom_hooks/places/useDeletePlace";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import useCreatePlace from "../custom_hooks/places/useCreatePlace";
import TheMAP from "./TheMAP";
import ItineraryCardCRUD from "./ItineraryCardCRUD";

const Locations = () => {
    const [open, setOpen] = React.useState(false);
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
    const [images, setImages] = useState<string[]>([]);
    const [apiBody, setApiBody] = useState<Place | null>(null);

    useCreatePlace(apiBody);

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
    const { places } = useGetPlace();
    const [newcards, setNewcards] = useState(places);
 
    const handleCreate = () => {
      setImages([...images,image])
        const newCard = {
          id: Date.now().toString(),
          name,
          description,
          ticket_price: {
            native: nativePrice,
            foreign: foreignPrice,
            student: studentPrice,
          },
          opening_hrs:hours,
          location: {
            latitude,
            longitude,
          },
          pictures: images,
        };
        
        setApiBody(newCard);
        setOpen(false);
      };
    console.log(newcards);


      const handleDelete = (id: string) => {
        usedeletePlaces(id);
      };
    
    React.useEffect(() => {
        if (places) {
            setNewcards(places);
        }
      }, [places]);

    return ( 
    <div className="flex justify-center">
        <ImprovedSidebar title="Admin"/>
    <div className="grid grid-cols-3 mt-10"><Modal
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
                  <TheMAP lat={latitude} long={longitude}
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

<Button onClick={handleCreate}>Add</Button>
              
              
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
