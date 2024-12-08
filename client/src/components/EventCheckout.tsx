import * as React from "react";
import Radio from "@mui/material/Radio";
import { FormControlLabel, TextField } from "@mui/material";
import PromoCodeButton from "./PromoCodeButton";
import { useEffect, useState } from "react";
import EditButton from "./Buttons/EditButton";
import { GetCurrentUser } from "../custom_hooks/currentuser";
import { useSelector } from "react-redux";
import { IProduct } from "../redux/cartSlice";
import { useLocation, useParams } from "react-router-dom";
// import { useAuth } from "../custom_hooks/auth";
import {
  addAddress,
  editAddress,
  deleteAddress,
} from "../custom_hooks/checkout";

import ClipLoader from "react-spinners/ClipLoader";
import ItineraryCardToruist from "./Itinerary/ItineraryCardToruist";
import { useGetItineraryID } from "../custom_hooks/itineraries/useGetItinerary";
import { TouristProfileData } from "../routes/_app/Tourist/tourist_profile/tourist_profile_data";
import { IActivity } from "../custom_hooks/activities/activity_interface";
import Place from "../custom_hooks/places/place_interface";
const EventCheckout = () => {
  //   const { isAuthenticated, isLoading, isError } = useAuth(4);
  //   const { username } = useParams();
  const { itinerary, loading, error } = useGetItineraryID(
    "67275f9513bcb818687c62ee"
  );
  interface TagStructure {
    _id: string;
    name: string;
    __v: number;
  }

  interface Itinerary {
    _id: string;
    main_Picture?: string;
    title: string;
    description: string;
    added_By: string;
    price: number;
    starting_Date: string;
    ending_Date: string;
    rating: number;
    total: number;
    language: string;
    selectedTags?: TagStructure[];
    pickup_location: { longitude: number; latitude: number };
    dropoff_location: { longitude: number; latitude: number };
    plan: {
      place: Place;
      activities: IActivity[];
    }[];
    booked_By: {
      user_id?: TouristProfileData;
    }[];
    accesibility: boolean;
  }
  const [itineraryd, setItinerary] = useState<Itinerary | null>(itinerary);

  useEffect(() => {
    console.log(itinerary);
    if (itinerary) {
      setItinerary(itinerary);
    }
  }, [itinerary]);

  const username = "hamadageh2";
  const [selectedValue, setSelectedValue] = useState("cod");
  const [onAccept, setOnAccept] = useState(false);
  const [subtotal, setSubtotal] = useState(7969.69);
  const { cuserdata } = GetCurrentUser(username);
  const [currentUser, setCurrentUser] = useState(cuserdata);
  const cart = useSelector((state) => state.cart) as IProduct[];

  useEffect(() => {
    const newSubtotal = cart
      .map((product) => product.price * product.quantity)
      .reduce((total, price) => total + price, 0);
    setSubtotal(newSubtotal);
  }, [cart]);

  useEffect(() => {
    if (cuserdata) {
      setCurrentUser(cuserdata);
    }
  }, [cuserdata]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader color="#f86c6b" loading={true} size={150} />
        </div>
      );
    }
    if (error) {
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
      <ItineraryCardToruist
        key={"67275f9513bcb818687c62ee"}
        _id={"67275f9513bcb818687c62ee"}
        title={itineraryd?.title}
        description={itineraryd?.description}
        added_By={itineraryd?.added_By}
        price={itineraryd?.price}
        starting_Date={itineraryd?.starting_Date}
        ending_Date={itineraryd?.ending_Date}
        rating={itineraryd?.rating}
        total={itineraryd?.total}
        language={itineraryd?.language}
        pickup_location={itineraryd?.pickup_location}
        dropoff_location={itineraryd?.dropoff_location}
        plan={itineraryd?.plan}
        selectedTags={itineraryd?.selectedTags}
        main_Picture={itineraryd?.main_Picture}
        booked_By={itineraryd?.booked_By}
        accesibility={itineraryd?.accesibility}
        bookingActivated={itineraryd?.bookingActivated}
        inappropriate={itineraryd?.inappropriate}
      />
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
                {subtotal.toFixed(2)}
              </p>

              {onAccept ? (
                <p className="text-[18px] text-white justify-end flex">
                  -{(subtotal * 0.1).toFixed(2)}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-r from-[#DBC3FF] to-[#A855F7] rounded-tl-[10px] rounded-br-[10px] h-[63.7px] w-[508.2px] flex flex-row mx-auto mt-[11px]">
              <p className="text-[21px] text-black my-auto ml-2">
                {(onAccept ? subtotal * 0.9 : subtotal * 1.0).toFixed(2)}
              </p>
              <button className="my-auto ml-auto mr-[9.8px] w-[189px] h-[46.2px] bg-gradient-to-t hover:bg-gradient-to-b from-[#A855F7] via-[#bb7bff] to-[#c49ffc] border-[#652795] border-[0.7px] rounded-[7.7px] text-[21px]">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCheckout;
