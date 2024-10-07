import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import {ActivityCard} from "../../../components/ActivityCard";
import ImprovedSidebar from "../../../components/ImprovedSidebar";
import TheMAP from "../../../components/TheMAP";
import {useGetAllActivitiesID} from "../../../custom_hooks/activities/useGetActivities";
import { useGetAllTags, useGetAllCategoriesD } from "../../../custom_hooks/categoryandTagCRUD";
import { createActivity } from "../../../custom_hooks/activities/useCreateActivity";
import useDeleteActivity from "../../../custom_hooks/activities/deleteActivity";

export const Activities = ()=>{
   
  const [newname, setnName] = useState('');
  const [newPrice, setnPrice] = useState(10);
  const [newSpecialDiscount, setnnewSpecialDiscount] = useState(100);
  const [newDate, setnnewDate] = useState(new Date());
  const [newlatitude, setnLatitude] = useState(30.0);
  const [newlongitude, setnLongitude] = useState(31.2);
  const [newBIO, setnnewBIO] = useState(false);

  interface Activity {
    _id: string;
    Title: string;
    DateAndTime: Date;  
    Location: {
      latitude: number,
      longitude: number,
  },
    Price: number; 
    SpecialDiscount: number; 
    Category: DataStructure; 
    Tags: DataStructure[]; 
    BookingIsOpen: boolean;
    added_By: string; 
}
type DataStructure = {
  _id: string;
  name: string;
  __v: number;
}
const currentuser=location.pathname.split(`/`)[2];
const {sactivities,aloading,aerror, fetchActivities} = useGetAllActivitiesID(currentuser);
const [aactivities, setActivities] = useState<Activity[]|null>(null);

useEffect(() => {
  if(sactivities){
    setActivities(sactivities);}
},[sactivities]);

const { deleteActivity, data, loading, error } = useDeleteActivity();

const handleDelete = (id: string) => {
  deleteActivity(id);
  if (!error && !loading) {
      const pActivities = aactivities?.filter(act => act._id !== id) ?? [];
      setActivities(pActivities);
  }
};

  const handleCreate = async () => {
    if (!selectedCat) {
        console.error("Category is required");
        return;
    }

    const newActivity = {
      Title: newname,
      DateAndTime: newDate,  
      Location: {
      latitude: newlatitude,
      longitude: newlongitude,
  },
      Price: newPrice,
      SpecialDiscount: newSpecialDiscount,
      Tags: selectedTags,
      Category: selectedCat,
      BookingIsOpen: newBIO, 
      added_By: currentuser
  };
  
    try {
        await createActivity(currentuser, newActivity);
        await fetchActivities();
        setOpen(false);
    } catch (error) {
        console.error("Error creating place:", error);
    }
  
    setnName('');
    setnnewDate(new Date());
    setnnewSpecialDiscount(0);
    setnPrice(0);
    setnLatitude(31);
    setnLongitude(30);
    setnnewBIO(false);
  
  };

  const handleDateChange = (e) => {
    setnnewDate(new Date(e.target.value));
};

  const formatDate = (date) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const {
  loading: tagsLoading,
  error: tagsError,
  iddata: tagsData,
  data: tagsOptions,
} = useGetAllTags();

const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

const {
  loading: CatLoading,
  error: CatError,
  data: CatOptions,
} = useGetAllCategoriesD();

const [selectedCat, setSelectedCat] = useState<string>();

const handleCatChange = (event: SelectChangeEvent<string>) => {
  const {
      target: { value },
  } = event;

  setSelectedCat(value);
  console.log(value);

};

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

if(aloading || tagsLoading || CatLoading){
  return <div>loading</div>;
}
if(aerror || tagsError || CatError){
  return <div>
    {aerror}
    {tagsError}
    {CatError}
  </div>;
}  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  return(
    <div className="w-full h-full flex">
            <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <Box className="grid grid-cols-3">
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  value={newname}
                  onChange={(e) => setnName(e.target.value)}
                  label="Name"
                />
              </FormControl>

              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel>SpecialDiscount</InputLabel>
                <OutlinedInput
                  value={newSpecialDiscount}
                  startAdornment={<InputAdornment position="start">%</InputAdornment>}
                  onChange={(e) => setnnewSpecialDiscount(Number(e.target.value))}
                  label="Description"
              /></FormControl>

              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel>Price</InputLabel>
                <OutlinedInput
                type="number"
                value={newPrice}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                onChange={(e) => setnPrice(Number(e.target.value))}
                label="Price"
              /></FormControl>
              
                <FormControl fullWidth sx={{ marginY: 1 }} >
                  <Select
                  labelId="cat-select-label"
                  value={selectedCat}
                  onChange={handleCatChange}
                  MenuProps={{
                      PaperProps: {
                      style: {
                          maxHeight: 200,
                          width: 250,
                      },
                      },
                  }}
                  >
                  {CatOptions.map((tag) => (
                      <MenuItem key={tag._id} value={tag._id}>
                      <ListItemText primary={tag.name} />
                      </MenuItem>
                  ))}
                  </Select>
              </FormControl>

              <FormControl fullWidth sx={{ marginY: 1 }}>
                <input
                        title="date"
                        name="date"
                        value={formatDate(newDate)}
                        onChange={handleDateChange}
                        type="datetime-local"
                        className="text-[20px] py-3 border border-gray-300 rounded-md"
                        />
              </FormControl>
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
                }}>
                {tagsData.map((tag) => (
                    <MenuItem key={tag._id} value={tag._id}>
                    <Checkbox checked={selectedTags.indexOf(tag._id) > -1} />
                    <ListItemText primary={tag.name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginY: 1 }} className="col-span-3">
                  <TheMAP lat={newlatitude} long={newlongitude}
                  className="w-[100%] h-[300px]"
                  setLatitude={setnLatitude}
                  setLongitude={setnLongitude}/>
            </FormControl>

          <Button onClick={handleCreate} className="col-span-3">Add</Button>
              
        </Box>
        </Box>
      </Modal>
      <ImprovedSidebar/>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 ml-8 mb-4">
      <div className="mt-12 mx-4 w-[400px] h-[475px] rounded-[19px] bg-slate-500 cursor-pointer" 
      onClick={handleOpen}>
        <p className="text-[46px] mt-[40%] text-center">Create New Activity</p>
        </div>
        {aactivities && aactivities.map(cactivity => (
        <ActivityCard 
        activity={cactivity} onDelete={handleDelete} key={cactivity.Title} />
    ))}
    </div>
    </div>
    
);
}