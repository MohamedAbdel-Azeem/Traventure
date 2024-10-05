import React, { useState } from "react";
import LocationCardCRUD from "./LocationCardCRUD";
import ImprovedSidebar from "./ImprovedSidebar";
import useGetPlace from "../custom_hooks/places/useGetPlace"
import  Place  from "../custom_hooks/places/place_interface";
import {usedeletePlaces} from "../custom_hooks/places/useDeletePlace";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";
import useCreatePlace from "../custom_hooks/places/useCreatePlace";

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
        <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Native Price"
                type="number"
                value={nativePrice}
                onChange={(e) => setNativePrice(Number(e.target.value))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Foreign Price"
                type="number"
                value={foreignPrice}
                onChange={(e) => setForeignPrice(Number(e.target.value))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Student Price"
                type="number"
                value={studentPrice}
                onChange={(e) => setStudentPrice(Number(e.target.value))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Hours"
                type="string"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Latitude"
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(Number(e.target.value))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Longitude"
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(Number(e.target.value))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Image"
                type="string"
                value={image}
                onChange={(e) => {setImages([...images,(e.target.value)])}}
                fullWidth
                margin="normal"
              />
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
