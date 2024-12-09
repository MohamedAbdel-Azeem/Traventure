import * as React from "react";
import Radio from "@mui/material/Radio";
import { FormControlLabel, TextField } from "@mui/material";
import PromoCodeButton from "../PromoCodeButton";
import { useEffect, useState } from "react";
import { GetCurrentUser } from "../../../../custom_hooks/currentuser";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../../custom_hooks/auth";
import {
  useGetActivityID,
  Activityd,
} from "../../../../custom_hooks/activities/useGetActivity";
import ClipLoader from "react-spinners/ClipLoader";
import useBookItinerary from "../../../../custom_hooks/itineraries/bookItinerary";
import useBookActivity from "../../../../custom_hooks/activities/bookActivity";
import { useGetItineraryID } from "../../../../custom_hooks/itineraries/useGetItinerary";
import ItineraryCardToruist from "../../../../components/Itinerary/ItineraryCardToruist";
import { ActivityCardTourist } from "../../../../components/Activities/ActivityCardTourist";
const EventCheckout = () => {
  const { isAuthenticated, isLoading, isError } = useAuth(4);
  const { username, id, type } = useParams();
  interface TagStructure {
    _id: string;
    name: string;
    __v: number;
  }
  const [selectedValue, setSelectedValue] = useState("cod");
  const [onAccept, setOnAccept] = useState(false);
  const [PromoCode, setPromoCode] = useState("");
  const { cuserdata } = GetCurrentUser(username ?? "");
  const [currentUser, setCurrentUser] = useState(cuserdata);
  const { itinerary } = useGetItineraryID(id);
  const { activity, loading } = useGetActivityID(id);
  const [currentactivity, setCurrentActivity] = useState<Activityd>(activity);
  const [subtotal, setSubtotal] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [rating, setRating] = useState(0);
  const [language, setLanguage] = useState("");
  const [main_Picture, setMain_Picture] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagStructure[]>([]);
  const [starting_Date, setStarting_date] = useState(
    "2025-11-16T00:00:00.000Z"
  );
  const [ending_Date, setEnding_Date] = useState("2025-11-16T00:00:00.000Z");
  const [accessibility, setAccessibility] = useState(false);
  const [bookingActivated, setBookingActivated] = useState(false);
  const [inappropriate, setInappropriate] = useState(false);
  const [pickupLocation, setPickupLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [dropoffLocation, setDropoffLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    if (activity) {
      console.log(activity);
      setCurrentActivity(activity);
      setSubtotal(activity?.Price);
    }
  }, [activity]);

  useEffect(() => {
    if (itinerary) {
      console.log(itinerary);
      setSubtotal(itinerary?.price ?? 0);
      setTitle(itinerary?.title ?? "");
      setDescription(itinerary?.description ?? "");
      setPrice(itinerary?.price ?? 0);
      setTotal(itinerary?.total ?? 0);
      setRating(itinerary?.rating ?? 0);
      setLanguage(itinerary?.language ?? "");
      setMain_Picture(itinerary?.main_Picture ?? "");
      setStarting_date((itinerary?.starting_Date ?? "").toString());
      setEnding_Date((itinerary?.ending_Date ?? "").toString());
      setSelectedTags(itinerary?.selectedTags ?? []);
      setAccessibility(itinerary?.accessibility ?? false);
      setBookingActivated(itinerary?.bookingActivated ?? false);
      setInappropriate(itinerary?.inappropriate ?? false);
      setPickupLocation(
        itinerary?.pickup_location ?? {
          longitude: 0,
          latitude: 0,
        }
      );
      setDropoffLocation(
        itinerary?.dropoff_location ?? {
          longitude: 0,
          latitude: 0,
        }
      );
    }
  }, [itinerary]);

  useEffect(() => {
    if (cuserdata) {
      setCurrentUser(cuserdata);
    }
  }, [cuserdata]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const { bookItinerary } = useBookItinerary();
  const { bookActivity } = useBookActivity();
  const handleBooking = async (id: string) => {
    try {
      if (type?.includes("itinerary")) {
        await bookItinerary(id, username, subtotal, PromoCode, selectedValue);
      } else {
        await bookActivity(
          id,
          username,
          subtotal,
          currentactivity?.SpecialDiscount,
          PromoCode,
          selectedValue
        );
      }
    } catch (error) {
      console.error("Error booking itinerary  :", error);
    }
  };

  if (
    isLoading ||
    loading ||
    (type?.includes("itinerary") ? !itinerary : !currentactivity)
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#f86c6b" loading={true} size={150} />
      </div>
    );
  }
  if (isError || isAuthenticated !== username) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Error 403 Unauthorized access</h1>
      </div>
    );
  }
  return (
    <div
      className="h-screen flex items-start justify-center bg-gray-900 gap-[100px]"
      style={{
        backgroundImage: `url('/src/assets/mtn.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <div className="mt-[120px]">
        {type?.includes("itinerary") ? (
          <ItineraryCardToruist
            className="w-[450px]"
            key={id}
            _id={id ?? ""}
            title={title}
            description={description}
            price={price}
            starting_Date={starting_Date}
            ending_Date={ending_Date}
            rating={rating}
            total={total}
            language={language}
            pickup_location={pickupLocation}
            dropoff_location={dropoffLocation}
            selectedTags={selectedTags}
            main_Picture={main_Picture}
            accesibility={accessibility}
            bookingActivated={bookingActivated}
            inappropriate={inappropriate}
          />
        ) : (
          <>
            <ActivityCardTourist
              key={currentactivity._id}
              activity={currentactivity}
            />
          </>
        )}
      </div>

      <div className="w-[529.2px] mt-[70px] h-[550px] rounded-[10px] bg-gradient-to-b from-[#A855F7] to-[#6D28D9] flex flex-col">
        <div>
          <div className="w-[529.2px] h-[49px] flex">
            <p className="text-[24px] text-white flex items-center justify-start my-auto mx-auto">
              Checkout
            </p>
          </div>
          <div className="flex flex-col justify-center items-center relative">
            <div className="flex flex-col w-[480px] h-[180px] bg-violet-200 rounded-t-[10px]">
              <div className="flex mx-auto w-[480px] h-[33px] rounded-l-[10px] ">
                <p className="text-[17px] text-black flex items-start justify-start my-auto ml-4">
                  Payment
                </p>
              </div>
              <div className="flex mx-4 h-[137.2px]">
                <div className="my-auto gap-[9px] flex flex-col">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedValue === "creditcard"}
                        onChange={handleChange}
                        value="creditcard"
                        name="paymentMethod"
                        sx={{
                          color: "#000000",
                          "&.Mui-checked": {
                            color: "#000000",
                          },
                          transform: "scale(0.75)",
                        }}
                      />
                    }
                    sx={{
                      width: "250px",
                      height: "34px",
                      marginX: "auto",
                      backgroundColor: "white",
                      borderRadius: "7px",
                      "& .MuiFormControlLabel-label": {
                        fontSize: "15px",
                      },
                    }}
                    label="Credit Card"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedValue === "cod"}
                        onChange={handleChange}
                        value="cod"
                        name="paymentMethod"
                        sx={{
                          color: "#000000",
                          "&.Mui-checked": {
                            color: "#000000",
                          },
                          transform: "scale(0.75)",
                        }}
                      />
                    }
                    sx={{
                      width: "250px",
                      height: "34px",
                      marginX: "auto",
                      backgroundColor: "white",
                      borderRadius: "7px",
                      "& .MuiFormControlLabel-label": {
                        fontSize: "15px",
                      },
                    }}
                    label="COD (Cash on Delivery)"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedValue === "wallet"}
                        onChange={handleChange}
                        value="wallet"
                        name="paymentMethod"
                        sx={{
                          color: "#000000",
                          "&.Mui-checked": {
                            color: "#000000",
                          },
                          transform: "scale(0.75)",
                        }}
                      />
                    }
                    sx={{
                      width: "250px",
                      height: "34px",
                      marginX: "auto",
                      backgroundColor: "white",
                      borderRadius: "7px",
                      "& .MuiFormControlLabel-label": {
                        fontSize: "15px",
                      },
                    }}
                    label="Wallet"
                  />
                </div>
                {selectedValue === "wallet" ? (
                  <div className="flex h-[120px] justify-center items-center bg-purple-50 px-4 rounded-lg shadow-md border border-purple-200 max-w-md mx-auto my-auto">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <label className="text-xl font-semibold text-purple-700">
                          Wallet Balance:
                        </label>
                        <p className="text-4xl font-bold text-purple-900">
                          ${currentUser?.wallet}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <> </>
                )}
              </div>
            </div>
            <div className="absolute bottom-[165px] h-[200px flex flex-col]">
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
              <div className="bg-violet-200 h-[8.5px] w-[12px]" />
              <div className="bg-violet-500 h-[8.5px] w-[12px]" />
            </div>
            <div className="flex flex-col w-[480px] h-[170px] bg-violet-500 rounded-b-[10px]">
              <div className="flex mx-auto w-[240px] h-[32.9px] rounded-r-[10px]  mt-[10px]">
                <p className="text-[17px] text-black flex items-center justify-start my-auto ml-auto mr-4">
                  Promo Code
                </p>
                <div className="relative group h-[21px] w-[21px] cursor-pointer">
                  <svg
                    className="h-[20px] w-[20px] top-[6px] left-[-10px] absolute"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#000000"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                    ></path>
                    <path
                      fill="#FFFFFF"
                      d="M216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                    ></path>
                  </svg>

                  <div className="absolute w-[250px] h-[60px] bottom-[-23px] left-[-100px] transform translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-[16px] rounded-[16px] px-4 shadow-lg">
                    Promo codes apply a 10% discount and can't be reused
                  </div>
                </div>
              </div>
              <PromoCodeButton
                setPromoCodeAgain={setPromoCode}
                onAccept={setOnAccept}
                className="mt-[7.7px] mx-auto h-[120px] w-[300px]"
              />
            </div>
          </div>

          <line className="bg-white size-3.5 h-[0.7px] w-[488.6px] flex mx-auto mt-[10px] mb-[5px]" />
          <div className="w-[488.6px] h-[46.9px] grid grid-cols-2 mx-auto my-[0.7px]">
            <div className="mr-auto">
              <p className="text-[18px] text-white justify-start flex mb-[0px]">
                Subtotal:
              </p>
              {onAccept ? (
                <p className="text-[18px] text-white justify-start flex">
                  Discount:
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="ml-auto">
              <p className="text-[18px] text-white justify-end flex mb-[0px]">
                {type?.includes("itinerary")
                  ? subtotal.toFixed(2)
                  : subtotal - currentactivity?.SpecialDiscount}
              </p>

              {onAccept ? (
                <p className="text-[18px] text-white justify-end flex">
                  -
                  {type?.includes("itinerary")
                    ? (subtotal * 0.1).toFixed(2)
                    : (
                        (subtotal - currentactivity?.SpecialDiscount) *
                        0.1
                      ).toFixed(2)}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-r from-[#DBC3FF] to-[#A855F7] rounded-tl-[10px] rounded-br-[10px] h-[63.7px] w-[508.2px] flex flex-row mx-auto mt-[11px]">
              <p className="text-[21px] text-black my-auto ml-2">
                {(onAccept
                  ? type?.includes("itinerary")
                    ? subtotal * 0.9
                    : (subtotal - currentactivity?.SpecialDiscount) * 0.9
                  : type?.includes("itinerary")
                  ? subtotal
                  : (subtotal - currentactivity?.SpecialDiscount) * 1.0
                ).toFixed(2)}
              </p>
              <button
                className={`my-auto ml-auto mr-[9.8px] w-[189px] h-[46.2px] ${
                  selectedValue === "wallet" && currentUser?.wallet < subtotal
                    ? "bg-[#7d1919]"
                    : "bg-gradient-to-t  hover:bg-gradient-to-b from-[#A855F7] via-[#bb7bff] to-[#c49ffc]"
                }  border-[#652795] border-[0.7px] rounded-[7.7px] text-[21px]`}
                onClick={() => handleBooking(id ?? "")}
                disabled={
                  selectedValue === "wallet" && currentUser?.wallet < subtotal
                }
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCheckout;
