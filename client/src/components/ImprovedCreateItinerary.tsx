import TheMAP from "./TheMAP";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, TextField, FormControl, Input, ListItemText, Checkbox, FormLabel, Stack, Chip, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { set } from "date-fns";
import { useGetAllTags } from "../custom_hooks/categoryandTagCRUD";
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectChangeEvent } from "@mui/material/Select";
const ImprovedCreateItinerary = () => {
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
    

    return (
        <div className="w-full h-full">  
            <div className="mx-auto my-[300px] w-[1156px] h-[717px] bg-[#1D1B1B] rounded-[26px] flex flex-col">
                <div className="grid grid-cols-2 mx-[25px]">
                    <div className="w-[545px] h-[601px] mt-[33px]">
                        <div className="w-[545px] h-[110px] grid grid-cols-2 gap-7">
                            <div className="w-[545px] h-[64px] bg-[#D9D9D9] rounded-[9px] col-span-2">
                                <TextField 
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
                                        value={accessibility}
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
                                        <MenuItem value="ar">Egyptian</MenuItem>
                                        <MenuItem value="en">American</MenuItem>
                                        <MenuItem value="fr">Quebecan</MenuItem>
                                        <MenuItem value="de">Dutch</MenuItem>
                                        <MenuItem value="es">Mexican</MenuItem>
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
                                            backgroundColor: '#D9D9D9', // Custom background color
                                            color: '#0000000' // Custom text color
                                        }}
                                        label={<span style={{ flexGrow: 1, textAlign: 'left' }}>{tag}</span>} 
                                        onDelete={handleDelete(tag)} 
                                    />
                                    </Stack>
                                    {/* <div key={tag} className="w-[150px] h-[44px] bg-[#D9D9D9] rounded-[65px]">
                                        <p className="text-[24px] text-center">{tag}</p>
                                    </div> */}
                                    </>
                                        ))}
                                    <div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="w-[300px] ml-auto  mt-auto mb-[12px]">
                    <button className="w-[142px] h-[47px] bg-[#D9D9D9] rounded-[34px]">
                    <p className="text-[28px] text-center">Submit</p>
                    </button>
                    <button className="w-[142px] h-[47px] bg-[#D9D9D9] rounded-[34px]">
                    <p className="text-[28px] text-center">Cancel</p>
                    </button>
                </div>
            </div>

            <div className="mx-auto my-[300px] w-[1156px] h-[717px] bg-[#1D1B1B] rounded-[26px] flex">
                <div className="mx-auto my-auto w-[1042px] h-[613px] bg-[#D9D9D9] rounded-[26px]">
                  <div className="w-[883px] h-[122px] bg-[#413B3B] rounded-[26px] mx-auto" >
                    <Accordion
                    sx={{ width: '883px', height: '122px', backgroundColor: '#413B3B00', borderRadius: '26px', borderColor: 'transparent', boxShadow: 'none' }}
                    >
                        <AccordionSummary>
                        <div className="w-[883px] h-[122px] bg-[#413B3B00] rounded-[26px] flex">
                            <p className="text-[24px] text-start ml-2 text-white my-auto">Place 1</p>
                        </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex flex-col gap-1">
                                <div className="w-[867px] h-[58px] bg-[#413B3B] rounded-[15px] flex"><p className="text-[20px] text-start my-auto ml-2 mr-24 text-white">Activity 1</p>
                            <TextField
                                required
                                type="number"
                                className="w-[260px]"
                                InputProps={{
                                    style: { fontSize: '18px', borderRadius: '9px', height: '50px', marginTop: 'auto', marginBottom: 'auto', marginRight: '24px', color: 'white' }
                                }}
                                placeholder="Time"
                                variant="outlined"  
                            />
                            <TextField
                                required
                                className="w-[260px]"
                                InputProps={{
                                    style: { fontSize: '18px', borderRadius: '9px', height: '50px', marginTop: 'auto', marginBottom: 'auto', color: 'white' }
                                }}
                                placeholder="Days? Really?"
                                variant="outlined"  
                            />
                            <button className="bin-button ml-auto mr-2 my-auto" title="Delete">
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
                                <div className="w-[867px] h-[58px] bg-[#413B3B] rounded-[15px] flex"><p className="text-[20px] text-start my-auto ml-2 mr-24 text-white">Activity 1</p>
                            <TextField
                                required
                                type="number"
                                className="w-[260px]"
                                InputProps={{
                                    style: { fontSize: '18px', borderRadius: '9px', height: '50px', marginTop: 'auto', marginBottom: 'auto', marginRight: '24px', color: 'white' }
                                }}
                                placeholder="Time"
                                variant="outlined"  
                            />
                            <TextField
                                required
                                className="w-[260px]"
                                InputProps={{
                                    style: { fontSize: '18px', borderRadius: '9px', height: '50px', marginTop: 'auto', marginBottom: 'auto', color: 'white' }
                                }}
                                placeholder="Days? Really?"
                                variant="outlined"  
                            />
                            <button className="bin-button ml-auto mr-2 my-auto" title="Delete">
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
                                <div className="w-[867px] h-[58px] bg-[#413B3B] rounded-[15px] flex"><p className="text-[20px] text-start my-auto ml-2 mr-24 text-white">Activity 1</p>
                            <TextField
                                required
                                type="number"
                                className="w-[260px]"
                                InputProps={{
                                    style: { fontSize: '18px', borderRadius: '9px', height: '50px', marginTop: 'auto', marginBottom: 'auto', marginRight: '24px', color: 'white' }
                                }}
                                placeholder="Time"
                                variant="outlined"  
                            />
                            <TextField
                                required
                                className="w-[260px]"
                                InputProps={{
                                    style: { fontSize: '18px', borderRadius: '9px', height: '50px', marginTop: 'auto', marginBottom: 'auto', color: 'white' }
                                }}
                                placeholder="Days? Really?"
                                variant="outlined"  
                            />
                            <button className="bin-button ml-auto mr-2 my-auto" title="Delete">
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
                            </div>

                        </AccordionDetails>
                    </Accordion>
                  </div>
                    
                </div>
            </div>
        </div> 
     );
}
 
export default ImprovedCreateItinerary;
