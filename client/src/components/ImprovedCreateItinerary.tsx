import TheMAP from "./TheMAP";
import ImageUploader from "./ImageUploader";
import { act, useEffect, useState } from "react";
import {  MenuItem, Select, TextField, Input, ListItemText, Checkbox, Stack, Chip, Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetAllTags } from "../custom_hooks/categoryandTagCRUD";
import { SelectChangeEvent } from "@mui/material/Select";
import BestDeleteButton from "./BestDeleteButton";
import {useGetPlace} from "../custom_hooks/places/useGetPlace";
import { useGetAllActivitiesTitleAndId } from "../custom_hooks/activities/useGetActivitiesTitlesAndID";
import { UseCreateItineraryforME } from "../custom_hooks/itineraries/createItinerary";
import { v4 as uuidv4 } from 'uuid';
const ImprovedCreateItinerary = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [pickupLocation, setPickupLocation] = useState<string>('dsadsadad');
    const [dropoffLocation, setDropoffLocation] = useState<string>('dsadsadad');
    const [latitude, setLatitude] = useState(30);
    const [longitude, setLongitude] = useState(31);
    const [dlatitude, setDLatitude] = useState(30);
    const [dlongitude, setDLongitude] = useState(31);
    const [image, setImage] = useState<File | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [accessibility, setAccessibility] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [language, setLanguage] = useState<string>('ar');
    const [placestogo, setPlacestogo] = useState<PlacetoGo[]>([]);


      function returnallexceptactivityname (input:ActivitytoGo[]){
        return input.map((activity:ActivitytoGo) => ({
                activity_id: activity.activityname,
                activity_duration: activity.activity_duration,
                time_unit: activity.time_unit,
                }));
      }
interface MyICCRUDP {
    main_Picture?: File | null;
    title: string;
    description: string;
    added_By: string;
    price: number;
    starting_Date: string;
    ending_Date: string;
    rating: number;
    total: number;
    language: string;
    selectedTags?: string[];
    pickup_location: string;
    dropoff_location: string;
    plan: {
        place?: string;
        activities: {
        activity_id?: string;
        activity_duration: number;
        time_unit: string;
        }[];
    }[];
    accesibility: boolean;
}

type PlacetoGo = {
    placeid: string;
    place: string;
    placename: string;
    activities: ActivitytoGo[];
    };   

type ActivitytoGo = {
    activityid: string
    activityname: string;
    activity_duration: number;
    time_unit: string;
}
    const {
        places: apiPlaces,
        gloading: placeLoading,
        gerror: placeError,
      } = useGetPlace();

      const {activities: activities , loading : activityLoading , error : activityError}=useGetAllActivitiesTitleAndId();

    const {
        loading: tagsLoading,
        error: tagsError,
        iddata: tagsOptions,
      } = useGetAllTags();



    const [selectedTags, setSelectedTags] = useState<string[]>(tagsOptions.map((tag) => tag._id));

    const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
        const {
          target: { value },
        } = event;
        setSelectedTags(typeof value === "string" ? value.split(",") : value);
      };
    const handleTagsText = (value: string[]) => {
        const valueNames = tagsOptions
          .filter((tag) => value.includes(tag._id))
          .map((tag) => tag.name);
        return valueNames.join(", ");
      };

      useEffect(() => {
        console.log("Selected Tags:", selectedTags);
      }, [selectedTags]);
    

      
 const alltags = (value: string[]) => {
    const valueNames = tagsOptions
      .filter((tag) => value.includes(tag._id))
      .map((tag) => tag.name);
    return valueNames;
  };
  const handleDelete = (tagToDelete: string) => () => {
    const tagIdToDelete = tagsOptions.find((tag) => tag.name === tagToDelete)?._id;
    if (tagIdToDelete) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagIdToDelete));
    }
  };

    const handleChange = (event: SelectChangeEvent) => {
        setAccessibility(event.target.value === "true");
    };
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        setPrice(value);
      }
    };

    const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLanguage(event.target.value as string);
      };
    

      const [expanded, setExpanded] = useState<string | false>(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);


      const handleOChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        if (!isDropdownOpen) {
          setExpanded(isExpanded ? panel : false);
        }
      };
    
      const handleDropdownOpen = () => {
        setIsDropdownOpen(true);
      };
    
      const handleDropdownClose = () => {
        setIsDropdownOpen(false);
      };
    
      const handleActivityNameChange = (
        e: string,
        placeidN: string,
        activityidN: string
      ) => (
        setPlacestogo((prevPlacestogo) =>
            prevPlacestogo.map((placetogonew) =>
              placetogonew.placeid === placeidN
                ? {
                    ...placetogonew,
                    activities: placetogonew.activities.map((activity) =>
                      activity.activityid === activityidN
                        ? { ...activity, activityname: e}
                        : activity
                    )
                  }
                : placetogonew
            )
          )
        );
        const handleAddPlace = () => {
            setPlacestogo([...placestogo, 
                {placeid:uuidv4(),place:"", placename:"", activities:[]}]);
        }

            const handleAddActivity = (placeid: string) => () => {
                setPlacestogo((prevPlacestogo) =>
                prevPlacestogo.map((placetogo) =>
                    placetogo.placeid === placeid
                    ? {
                        ...placetogo,
                        activities: [
                            ...placetogo.activities,
                            { activityid: uuidv4(), activityname: "", activity_duration: 0, time_unit: "" }
                        ]
                        }
                    : placetogo
                )
                );
            };

            const handleActivityTimeChange = (
                e: string,
                placeidN: string,
                activityidN: string
              ) => (
                setPlacestogo((prevPlacestogo) =>
                    prevPlacestogo.map((placetogonew) =>
                      placetogonew.placeid === placeidN
                        ? {
                            ...placetogonew,
                            activities: placetogonew.activities.map((activity) =>
                              activity.activityid === activityidN
                                ? { ...activity, activity_duration: parseInt(e)}
                                : activity
                            )
                          }
                        : placetogonew
                    )
                  )
                );
                const handleActivityUnitChange = (
                    e: string,
                    placeidN: string,
                    activityidN: string
                  ) => (
                    setPlacestogo((prevPlacestogo) =>
                        prevPlacestogo.map((placetogonew) =>
                          placetogonew.placeid === placeidN
                            ? {
                                ...placetogonew,
                                activities: placetogonew.activities.map((activity) =>
                                  activity.activityid === activityidN
                                    ? { ...activity, time_unit: e}
                                    : activity
                                )
                              }
                            : placetogonew
                        )
                      )
                    );

                const handlePlaceNameChange = (e: string, placeidN: string) => (
                    console.log(e),
                    setPlacestogo((prevPlacestogo) => 
                        prevPlacestogo.map((placetogonew) => 
                            placetogonew.placeid === placeidN
                                ? {
                                    ...placetogonew, placename: e, place: e
                                }
                                : placetogonew
                        )
                    )
                    );
        
                    const itineraryData = {
                        added_By: "672354deb87528da028f398e",
                        title: title,
                        description: description,
                        main_Picture: image,
                        accesibility: accessibility,
                        price: price,
                        starting_Date: startDate?.toISOString() || "",
                        ending_Date: endDate?.toISOString() || "",
                        rating: 0,
                        total: 0,
                        pickup_location: pickupLocation,
                        dropoff_location: dropoffLocation,
                        language: language,
                        selectedTags: selectedTags,
                        plan: placestogo.map((place) => ({
                          place: place.placename,
                          activities: returnallexceptactivityname(place.activities),
                        })),
                      };
    return (
        <div className="w-full h-full">  
            <div className="mx-auto my-[300px] w-[1156px] h-[717px] bg-[#1D1B1B] rounded-[26px] flex flex-col">
                <div className="grid grid-cols-2 mx-[25px]">
                    <div className="w-[545px] h-[601px] mt-[33px]">
                        <div className="w-[545px] h-[110px] grid grid-cols-2 gap-7">
                            <div className="w-[545px] h-[64px] bg-[#D9D9D9] rounded-[9px] col-span-2">
                                <TextField 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-[545px] h-[155px] rounded-[9px] text-[39px]"
                                    multiline
                                    maxRows={4}
                                    placeholder="Title"
                                    variant="outlined"
                                    InputProps={{
                                        style: { fontSize: '22px',borderRadius: '9px',},
                                        classes: {input: 'lasttimeipromise'},
                                      }}
                                />
                            </div>
                            <div className="w-[545px] h-[155px] bg-[#D9D9D9] rounded-[9px] col-span-2">
                                <TextField 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="w-[545px] rounded-[9px]"
                                    multiline
                                    maxRows={4}
                                    placeholder="Description"
                                    variant="outlined"
                                    
                                    InputProps={{
                                        style: { fontSize: '20px', borderRadius: '9px',height: '155px'},
                                        classes: {input: 'lasttimeipromise'},
                                      }}
                                />
                            </div>
                            <div className="w-[260px] h-[50px] bg-[#D9D9D9] rounded-[9px] relative">
                                <div className="bg-[#D9D9D9] w-[139px] h-[24px] absolute top-[-23px] left-[10px] rounded-t-[9px]">
                                    <p className="text-[16px] text-black text-center">Price</p>
                                </div>
                               <TextField
                                    required
                                    type="number"
                                    className="w-[260px] rounded-[9px] z-10"
                                    InputProps={{
                                        style: { fontSize: '18px', borderRadius: '9px', height: '50px' },
                                    }}
                                    placeholder="Price"
                                    variant="outlined"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <div className="w-[260px] h-[50px] bg-[#D9D9D9] rounded-[9px] ml-auto relative">

                                <div className="bg-[#D9D9D9] w-[139px] h-[24px] absolute top-[-23px] left-[10px] rounded-t-[9px]">
                                    <p className="text-[16px] text-black text-center">Accessibility</p>
                                </div>
                                    <Select
                                        value={accessibility.toString()}
                                        label="Accessibility"
                                        onChange={handleChange}
                                        sx={{height: '50px', fontSize: '18px', borderRadius: '9px', width: '260px'}}
                                    >
                                        <MenuItem value="true">Accessible</MenuItem>
                                        <MenuItem value="false">Inaccessible</MenuItem>
                                    </Select>
                            </div>
                            <div className="w-[260px] h-[50px] bg-[#D9D9D9] rounded-[9px] relative">
                                <div className="bg-[#D9D9D9] w-[139px] h-[24px] absolute top-[-23px] left-[10px] rounded-t-[9px]">
                                    <p className="text-[16px] text-black text-center">Start Date</p>
                                </div>
                                <TextField
                                variant="outlined"
                                className="w-[260px] rounded-[9px]"
                                InputProps={{
                                    style: { fontSize: '18px', borderRadius: '9px', height: '50px' },
                                }}
                                onChange={(e) => setStartDate(new Date(e.target.value))}
                                 type="date">
                                 </TextField>
                                 <p className="text-[26px] text-center text-white absolute top-[2px] right-[-24px]">→</p>
                            </div>
                            <div className="w-[260px] h-[50px] bg-[#D9D9D9] rounded-[9px] ml-auto relative">
                                <div className="bg-[#D9D9D9] w-[139px] h-[24px] absolute top-[-23px] left-[10px] rounded-t-[9px]">
                                    <p className="text-[16px] text-black text-center">End Date</p>
                                </div>
                                <TextField
                                variant="outlined"
                                className="w-[260px] rounded-[9px]"
                                InputProps={{
                                    style: { fontSize: '18px', borderRadius: '9px', height: '50px' },
                                }}
                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                 type="date">
                                 </TextField>
                            </div>
                            <div className="w-[259px] h-[232px] bg-[#D9D9D9] rounded-[9px] relative">
                                <div className="bg-[#D9D9D9] w-[139px] h-[24px] absolute top-[-23px] left-[10px] rounded-t-[9px]">
                                    <p className="text-[16px] text-black text-center">Pick up Location</p>
                                </div>
                            <TheMAP
                                id="map1"
                                className="w-[259px] h-[232px] rounded-[9px]"
                                lat={latitude}
                                long={longitude}
                                setLatitude={setLatitude}
                                setLongitude={setLongitude}
                            />
                                 <p className="text-[26px] text-center text-white absolute top-[90px] right-[-24px]">→</p>
                            </div>
                            <div className="w-[259px] h-[232px] bg-[#D9D9D9] rounded-[9px] ml-auto relative">
                                <div className="bg-[#D9D9D9] w-[139px] h-[24px] absolute top-[-23px] left-[10px] rounded-t-[9px]">
                                    <p className="text-[16px] text-black text-center">Drop off Location</p>
                                </div>
                            <TheMAP
                                id="map2"
                                className="w-[259px] h-[232px] rounded-[9px]"
                                lat={dlatitude}
                                long={dlongitude}
                                setLatitude={setDLatitude}
                                setLongitude={setDLongitude}
                            />
                            </div>
                        </div>
                    </div>

                    <div className="w-[545px] h-[601px] mt-[33px] ml-auto">
                        <div className="w-[542px] h-[110px] grid grid-cols-2 gap-7">
                            <div className="w-[542px] h-[230px] bg-[#D9D9D9] rounded-[9px] col-span-2">
                                <ImageUploader 
                                    OutsideClassName="w-[542px] h-[247px] rounded-[9px]"
                                    setSelectedImage={setImage}
                                    selectedImage={image}
                                />
                            </div>
                            <div className="w-[542px] h-[183px] bg-[#D9D9D9] rounded-[9px] flex flex-col gap-2 col-span-3">

                                <div className="w-[217px] h-[48px] bg-[#717171] rounded-[9px] ml-3 mt-2">
                                    <p className="text-[26px] text-center text-white">Manage Places</p>
                                </div>

                                <div className="w-[518px] h-[46px] bg-[#413B3b] rounded-[9px] mx-auto">
                                    <p className="text-[18px] text-center text-white">The great place to place all of Luxembourg</p>
                                </div>
                                <div className="w-[518px] h-[46px] bg-[#413B3b] rounded-[9px] mx-auto">
                                    <p className="text-[18px] text-center text-white">The great place to place all of Luxembourg</p>
                                </div>
                            </div>
                            <div className="w-[542px] h-[50px] grid grid-cols-2 rounded-[9px] col-span-w">
                                <div className="w-[260px] h-[50px] bg-[#D9D9D9] rounded-[9px] relative">
                                <div className="bg-[#D9D9D9] w-[139px] h-[24px] absolute top-[-23px] left-[10px] rounded-t-[9px]">
                                    <p className="text-[16px] text-black text-center">Tags</p>
                                </div>
                                    <Select
                                    sx={{height: '50px', fontSize: '18px', borderRadius: '9px', width: '260px'}}
                                    multiple
                                    value={selectedTags}
                                    onChange={handleTagsChange}
                                    input={<Input />}
                                    renderValue={handleTagsText}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 250,
                                                width: 139,
                                            },
                                        },
                                    }}
                                    >
                                    {tagsOptions.map((tag) => (
                                        <MenuItem key={tag._id} value={tag._id}>
                                        <Checkbox checked={selectedTags.indexOf(tag._id) > -1} />
                                        <ListItemText primary={tag.name} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </div>
                                <div className="w-[260px] h-[50px] bg-[#D9D9D9] rounded-[9px] ml-auto relative">
                                <div className="bg-[#D9D9D9] w-[139px] h-[24px] absolute top-[-23px] left-[10px] rounded-t-[9px]">
                                    <p className="text-[16px] text-black text-center">Language</p>
                                </div>
                                    <Select
                                    value={language}
                                    label="Language"
                                    onChange={handleLanguageChange}
                                    sx={{height: '50px', fontSize: '18px', borderRadius: '9px', width: '260px'}}
                                    >
                                        <MenuItem value="Egyptian">Egyptian</MenuItem>
                                        <MenuItem value="American">American</MenuItem>
                                        <MenuItem value="Quebecan">Quebecan</MenuItem>
                                        <MenuItem value="Dutch">Dutch</MenuItem>
                                        <MenuItem value="Mexican">Mexican</MenuItem>
                                    </Select>
                                </div>
                                <div className=" mt-3 lasttimeipromise col-span-2 grid grid-cols-4 w-[542px] h-[85px] overflow-auto gap-2">
                                {alltags(selectedTags).map((tag) => (
                                    <>
                                    <Stack direction="row" spacing={1} key={tag}>
                                    <Chip
                                        sx={{ 
                                            fontSize: '18px', 
                                            width: '130px', 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            backgroundColor: '#D9D9D9',
                                            color: '#0000000'
                                        }}
                                        label={<span style={{ flexGrow: 1, textAlign: 'left' }}>{tag}</span>} 
                                        onDelete={handleDelete(tag)} 
                                    />
                                    </Stack>
                                    </>
                                        ))}
                                    <div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="w-[300px] ml-auto mt-auto mb-[12px] flex flex-row">
                    <button className="w-[142px] h-[47px] bg-[#D9D9D9] mx-2 rounded-[34px]"
                    onClick={() => UseCreateItineraryforME(itineraryData)}
                    >
                    <p className="text-[28px] text-center">Submit</p>
                    </button>
                    <button className="w-[142px] h-[47px] bg-[#D9D9D9] mx-2 rounded-[34px]">
                    <p className="text-[28px] text-center">Cancel</p>
                    </button>
                </div>
            </div>

            <div className="mx-auto my-[300px] w-[1156px] h-[717px] bg-[#1D1B1B] rounded-[26px] flex">
                <div className="mx-auto my-auto w-[1042px] h-[613px] bg-[#D9D9D9] rounded-[9px] flex flex-col overflow-auto lasttimeipromise">
                    <div className="
                        w-[883px] 
                        h-[66px] 
                        bg-[#413B3B] 
                        rounded-[15px] 
                        my-4
                        mx-auto
                        flex
                    ">
                        <Button className="w-full"
                            onClick={handleAddPlace}
                        >
                            <p className="text-[20px] text-start my-auto ml-2 text-white mr-auto">+ Add New Place
                            </p>
                        </Button>
                    </div>
            
                    {placestogo.map((placetogo) => (
                        <Accordion
                        key={placetogo.placeid}
                        disableGutters
                        expanded={expanded === `panel${placetogo.placeid}`}
                        onChange={handleOChange(`panel${placetogo.placeid}`)}
                        sx={{ width: '883px', backgroundColor: 'transparent', borderRadius: '15px', borderColor: 'transparent', boxShadow: 'none', marginLeft: 'auto', marginRight: 'auto' }}
                        >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ minHeight: 'unset', backgroundColor: '#413B3B', borderRadius: '15px', '&.Mui-expanded': { minHeight: 'unset' }, marginBottom: '8px' }}
                        >

                        <Select
                            value={placetogo.placename}
                            label="Places"
                            onChange={(e) =>
                                handlePlaceNameChange(e.target.value, placetogo.placeid)
                            }
                            onOpen={handleDropdownOpen}
                            onClose={handleDropdownClose}
                            sx={{height: '58px', fontSize: '18px', borderRadius: '15px', width: '200px', color: 'white' }}
                        >
                        {apiPlaces && apiPlaces.map((place) => (
                            <MenuItem key={place._id} value={place._id}>
                                {place.name}
                            </MenuItem>
                        ))}
                        </Select>
                        <BestDeleteButton
                            className="ml-auto mr-2 my-auto"
                            onDelete={() => 
                                setPlacestogo((prevPlacestogo) => 
                                    prevPlacestogo.filter((placetogonew) => placetogonew.placeid !== placetogo.placeid)
                                )
                            }
                        />
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ borderRadius: '15px', borderColor: 'transparent', boxShadow: 'none', marginBottom: '16px' }}
                        >
                             <div className="w-[867px] h-[58px] bg-[#413B3B] rounded-[15px] flex flex-row my-4">
                            <Button className="w-full"
                             onClick={handleAddActivity(placetogo.placeid)}
                            >
                            <p className="text-[20px] text-start my-auto text-white mr-auto">+ Add Activity</p>
                            </Button>
                            </div>
                            {placetogo.activities.map((currentactivity) => (
                           
                            <div
                            key={currentactivity.activityid}
                            className="w-[867px] h-[58px] bg-[#413B3B] rounded-[15px] flex flex-row my-4">
                    <Select
                        value={currentactivity.activityname}
                        label="Activity"
                        onChange={(e) =>
                            handleActivityNameChange(e.target.value, placetogo.placeid, currentactivity.activityid)
                        }
                        sx={{height: '58px', fontSize: '18px', borderRadius: '15px', width: '200px', color: 'white' }}
                    >
                        {activities.map((activity) => (
                            <MenuItem key={activity._id} value={activity._id}>
                                {activity.Title}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                    value={currentactivity.activity_duration}
                    onChange={(e) =>
                        handleActivityTimeChange(e.target.value, placetogo.placeid, currentactivity.activityid)
                    }
                    required
                    type="number"
                    className="w-[200px]"
                    InputProps={{
                        style: { fontSize: '18px', borderRadius: '9px', height: '50px', marginTop: 'auto', marginBottom: 'auto', marginLeft : '24px', color: 'white' }
                    }}
                    placeholder="Time"
                    variant="outlined"  
                    />
                    <TextField
                    value={currentactivity.time_unit}
                    onChange={(e) =>
                        handleActivityUnitChange(e.target.value, placetogo.placeid, currentactivity.activityid)
                    }
                    required
                    className="w-[260px]"
                    InputProps={{
                        style: { fontSize: '18px', borderRadius: '9px', height: '50px', marginTop: 'auto', marginBottom: 'auto', marginLeft : '24px', color: 'white' }
                    }}
                    placeholder="Days? Really?"
                    variant="outlined"  
                    />
                    <BestDeleteButton
                        className="ml-auto mr-2 my-auto"
                        onDelete={() =>
                            setPlacestogo((prevPlacestogo) => 
                                prevPlacestogo.map((placetogonew) => 
                                    placetogonew.placeid === placetogo.placeid
                                        ? {
                                            ...placetogonew,
                                            activities: [
                                                ...placetogonew.activities.filter((activity) => activity.activityid !== currentactivity.activityid)
                                            ]
                                        }
                                        : placetogonew
                                )
                            )
                        }
                    />
                </div>
                            ))}
                        </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div> 
     );
}
 
export default ImprovedCreateItinerary;
