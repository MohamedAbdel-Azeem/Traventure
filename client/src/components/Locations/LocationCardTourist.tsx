import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Button, TextField } from "@mui/material";
import useUpdatePlace from "../../custom_hooks/places/useUpdatePlace";
import Place from "../../custom_hooks/places/place_interface";
import TheMAP from "../Maps/TheMAP";
import { useSelector } from "react-redux";
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
  const [apiBody, setApiBody] = useState<Place | null>(details);

  useUpdatePlace(id, apiBody);
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
                      Native: {currentCurrency}{" "}
                      {(native * exchangeRate).toFixed(2)}
                    </div>
                    <div>
                      Foreign: {currentCurrency}{" "}
                      {(foreign * exchangeRate).toFixed(2)}
                    </div>
                    <div>
                      Student: {currentCurrency}{" "}
                      {(student * exchangeRate).toFixed(2)}
                    </div>
                  </p>
                )}
              </div>
            </div>
            <div className="w-[110px] h-full bg-[#7CC7E7] rounded-br-[11px] grid">
              <div className="m-auto flex flex-row">
                <AccessTimeIcon />
                {isEditing ? (
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
                ) : (
                  <p className="overflow-auto w-[100px]">{hours}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCardTourist;
