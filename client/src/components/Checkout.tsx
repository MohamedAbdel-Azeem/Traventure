import * as React from "react";
import Radio from "@mui/material/Radio";
import { FormControlLabel, TextField } from "@mui/material";
import TheMAP from "./Maps/TheMAP";
import PromoCodeButton from "./PromoCodeButton";
import { useEffect, useState } from "react";
import EditButton from "./Buttons/EditButton";
import { GetCurrentUser } from "../custom_hooks/currentuser";
import { useSelector } from "react-redux";
import { IProduct } from "../redux/cartSlice";
import { useParams } from "react-router-dom";
import { useAuth } from "../custom_hooks/auth";
import {
  addAddress,
  editAddress,
  deleteAddress,
} from "../custom_hooks/checkout";

import BestDeleteButton from "./Buttons/BestDeleteButton";
import ClipLoader from "react-spinners/ClipLoader";
const Checkout = () => {
  const { isAuthenticated, isLoading, isError } = useAuth(4);
  const { username } = useParams();
  const [selectedValue, setSelectedValue] = useState("cod");
  const [apartment, setApartment] = useState("");
  const [additionalinfo, setAdditionalinfo] = useState("");
  const [building, setBuilding] = useState("");
  const [street, setStreet] = useState("");
  const [floor, setFloor] = useState("");
  const [onAccept, setOnAccept] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isEditing2, setEditing2] = useState(false);
  const [fearandDelight, setFearandDelight] = useState(true);
  const [latitude, setLatitude] = useState(30);
  const [longitude, setLongitude] = useState(31);
  const [subtotal, setSubtotal] = useState(7969.69);
  const { cuserdata } = GetCurrentUser(username);
  const [currentUser, setCurrentUser] = useState(cuserdata);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saved_addresses, setSavedAddresses] = useState(
    currentUser?.saved_addressess
  );
  const [currentaddress, setCurrentAddress] = useState(
    saved_addresses?.[currentIndex] ?? {}
  );
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
      setSavedAddresses(cuserdata.saved_addressess);
      setCurrentAddress(cuserdata.saved_addressess[0]);
      setFearandDelight(currentaddress?.floor);
    }
  }, [cuserdata]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (index: number) => {
    if (index === -1) {
      setSavedAddresses([
        ...saved_addresses,
        {
          latitude,
          longitude,
          street,
          buildingNumber: building,
          floor,
          apartmentNumber: apartment,
          additionalDirections: additionalinfo,
        },
      ]);
      addAddress(username ?? "", {
        latitude,
        longitude,
        street,
        buildingNumber: building,
        floor,
        apartmentNumber: apartment,
        additionalDirections: additionalinfo,
      });
      if (saved_addresses) {
        setCurrentIndex(saved_addresses.length - 1);
      }
    } else {
      editAddress(
        username ?? "",
        {
          latitude,
          longitude,
          street,
          buildingNumber: building,
          floor,
          apartmentNumber: apartment,
          additionalDirections: additionalinfo,
        },
        index
      );
    }

    setEditing(false);
    setEditing2(false);
    setCurrentAddress({
      latitude,
      longitude,
      street,
      buildingNumber: building,
      floor,
      apartmentNumber: apartment,
      additionalDirections: additionalinfo,
    });
  };
  useEffect(() => {
    if (saved_addresses) {
      setCurrentAddress(saved_addresses[currentIndex]);
    }
  }, [currentIndex]);

  const handleDelete = (index: number) => {
    deleteAddress(username ?? "", index);
    setSavedAddresses(saved_addresses?.filter((_, i) => i !== index));
    setEditing(false);
    setEditing2(false);
    if (saved_addresses) {
      setCurrentIndex(saved_addresses.length - 1);
    }
  };
  if (isLoading) {
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
        <h1>Error 403 Unauthrized access</h1>
      </div>
    );
  }
  return (
    <div
      className="h-screen flex items-center justify-center bg-gray-900"
      style={{
        backgroundImage: `url('/src/assets/mtn.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <div className="ml-[100px] h-[650px] mt-8 w-[650px] bg-gradient-to-b from-[#A855F7] to-[#6D28D9] flex flex-col rounded-[10px] overflow-auto lasttimeipromise">
        <div className="flex text-[30px] h-[68px] mt-[2px] w-[612px] justify-center items-center text-white">
          Order Summary
        </div>
        {cart.map((item) => (
          <div className="flex flex-row mt-1">
            <div
              className="h-[100px] w-[100px] flex mx-auto"
              style={{
                backgroundImage: `url('${item.imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
              <div className="w-[300px] h-[120px] text-white text-[30px] break-words overflow-auto lasttimeipromise">
                {item.name}
              </div>
              <div className="flex flex-col">
                <div className="w-[200px] h-[40px] text-white text-[20px] text-start">
                  Quantity: {item.quantity}
                </div>
                <div className="w-[200px] h-[40px] text-white text-[20px] text-start">
                  Price: {item.price.toFixed(2)}
                </div>
                <div className="w-[200px] h-[40px] text-white text-[20px] text-start">
                  Total: {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
     
          </div>
        ))}
      </div>
      <div className="mr-[90px] ml-auto mt-8 w-[529.2px] h-[589px] rounded-[10px] bg-gradient-to-t from-violet-700 to-violet-900 flex flex-col">
        {isEditing ? (
          isEditing2 ? (
            <div className="relative">
              <BestDeleteButton
                onDelete={() => handleDelete(currentIndex)}
                className="absolute z-10 top-[20px] left-[20px]"
              />
              <TheMAP
                className="w-[509.6px] h-[258.3px] mx-auto mt-[9.8px] rounded-t-[10px]"
                lat={latitude}
                long={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              />
              <div className="w-[529.2px] h-[51.1px] flex flex-row items-center">
                <button
                  onClick={() => {
                    setFearandDelight(true);
                  }}
                  className={`mr-auto ml-[98.7px] w-[149.1px] h-[30.1px] ${
                    fearandDelight ? "bg-[#430096]" : "bg-[#C89BFF]"
                  } flex rounded-[27px] text-[20px] items-center justify-center text-white`}
                >
                  <svg
                    className="mr-[10px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_334_191)">
                      <path
                        d="M18.1589 0H9.8363V1.77931H18.1589V0Z"
                        fill="white"
                      />
                      <path
                        d="M19.446 2.68262H8.55396V4.29043H19.446V2.68262Z"
                        fill="white"
                      />
                      <path
                        d="M22.1607 14.5376V27.9999H27.6207V14.5376H22.1607ZM26.6 25.4121C26.6 25.665 26.3965 25.8636 26.1489 25.8636H23.6377C23.3892 25.8636 23.1866 25.665 23.1866 25.4121V22.9013C23.1866 22.6528 23.3892 22.4493 23.6377 22.4493H26.1489C26.3965 22.4493 26.6 22.6528 26.6 22.9013V25.4121ZM26.6 19.6318C26.6 19.8847 26.3965 20.0833 26.1489 20.0833H23.6377C23.3892 20.0833 23.1866 19.8847 23.1866 19.6318V17.121C23.1866 16.8725 23.3892 16.6695 23.6377 16.6695H26.1489C26.3965 16.6695 26.6 16.8725 26.6 17.121V19.6318ZM14.0004 20.0247C12.5103 20.0247 11.2949 21.2397 11.2949 22.7298V27.9999H16.7002V22.7298C16.7007 21.2392 15.4905 20.0247 14.0004 20.0247ZM12.6949 24.4636C12.6949 24.7121 12.4967 24.9151 12.2439 24.9151C11.9954 24.9151 11.7919 24.7121 11.7919 24.4636V23.5606C11.7919 23.3121 11.9954 23.1091 12.2439 23.1091C12.4967 23.1091 12.6949 23.3121 12.6949 23.5606V24.4636Z"
                        fill="white"
                      />
                      <path
                        d="M6.74232 14.0768C6.74232 14.0768 6.74757 14.0812 6.74757 14.086C6.74757 14.0908 6.74232 14.0952 6.74232 14.0952V27.9998H10.3919V22.7297C10.3919 20.7382 12.0085 19.1212 13.9952 19.1212C15.9871 19.1212 17.6037 20.7377 17.6037 22.7297V27.9998H21.2577V5.19336H6.74232V14.0768ZM16.9628 6.52117C16.9628 6.27267 17.1653 6.06923 17.4138 6.06923H19.9251C20.1779 6.06923 20.3761 6.27267 20.3761 6.52117V9.0368C20.3761 9.2853 20.1779 9.4883 19.9251 9.4883H17.4138C17.1653 9.4883 16.9628 9.2853 16.9628 9.0368V6.52117ZM16.9628 10.9019C16.9628 10.6534 17.1653 10.4504 17.4138 10.4504H19.9251C20.1779 10.4504 20.3761 10.6534 20.3761 10.9019V13.4127C20.3761 13.6655 20.1779 13.8642 19.9251 13.8642H17.4138C17.1653 13.8642 16.9628 13.6655 16.9628 13.4127V10.9019ZM16.9628 15.2825C16.9628 15.0345 17.1653 14.831 17.4138 14.831H19.9251C20.1779 14.831 20.3761 15.0345 20.3761 15.2825V17.7938C20.3761 18.0419 20.1779 18.2453 19.9251 18.2453H17.4138C17.1653 18.2453 16.9628 18.0419 16.9628 17.7938V15.2825ZM12.2933 6.52117C12.2933 6.27267 12.4968 6.06923 12.7444 6.06923H15.2556C15.5041 6.06923 15.7067 6.27267 15.7067 6.52117V9.0368C15.7067 9.2853 15.5041 9.4883 15.2556 9.4883H12.7444C12.4968 9.4883 12.2933 9.2853 12.2933 9.0368V6.52117ZM12.2933 10.9019C12.2933 10.6534 12.4968 10.4504 12.7444 10.4504H15.2556C15.5041 10.4504 15.7067 10.6534 15.7067 10.9019V13.4127C15.7067 13.6655 15.5041 13.8642 15.2556 13.8642H12.7444C12.4968 13.8642 12.2933 13.6655 12.2933 13.4127V10.9019ZM12.2933 15.2825C12.2933 15.0345 12.4968 14.831 12.7444 14.831H15.2556C15.5041 14.831 15.7067 15.0345 15.7067 15.2825V17.7938C15.7067 18.0419 15.5041 18.2453 15.2556 18.2453H12.7444C12.4968 18.2453 12.2933 18.0419 12.2933 17.7938V15.2825ZM7.62345 6.52117C7.62345 6.27267 7.82251 6.06923 8.07539 6.06923H10.5858C10.8343 6.06923 11.0377 6.27267 11.0377 6.52117V9.0368C11.0377 9.2853 10.8343 9.4883 10.5858 9.4883H8.07539C7.82251 9.4883 7.62345 9.2853 7.62345 9.0368V6.52117ZM7.62345 10.9019C7.62345 10.6534 7.82251 10.4504 8.07539 10.4504H10.5858C10.8343 10.4504 11.0377 10.6534 11.0377 10.9019V13.4127C11.0377 13.6655 10.8343 13.8642 10.5858 13.8642H8.07539C7.82251 13.8642 7.62345 13.6655 7.62345 13.4127V10.9019ZM7.62345 15.2825C7.62345 15.0345 7.82251 14.831 8.07539 14.831H10.5858C10.8343 14.831 11.0377 15.0345 11.0377 15.2825V17.7938C11.0377 18.0419 10.8343 18.2453 10.5858 18.2453H8.07539C7.82251 18.2453 7.62345 18.0419 7.62345 17.7938V15.2825ZM0.379761 27.9998H5.83932V14.5375H0.379761V27.9998ZM1.40439 17.1205C1.40439 16.872 1.60345 16.669 1.85632 16.669H4.3667C4.6152 16.669 4.81864 16.872 4.81864 17.1205V19.6313C4.81864 19.8842 4.6152 20.0828 4.3667 20.0828H1.85632C1.60345 20.0828 1.40439 19.8842 1.40439 19.6313V17.1205ZM1.40439 22.9012C1.40439 22.6527 1.60345 22.4492 1.85632 22.4492H4.3667C4.6152 22.4492 4.81864 22.6527 4.81864 22.9012V25.412C4.81864 25.6649 4.6152 25.8635 4.3667 25.8635H1.85632C1.60345 25.8635 1.40439 25.6649 1.40439 25.412V22.9012Z"
                        fill="white"
                      />
                      <path
                        d="M10.1347 6.97266H8.52649V8.58484H10.1347V6.97266Z"
                        fill="white"
                      />
                      <path
                        d="M14.8037 6.97266H13.1963V8.58484H14.8037V6.97266Z"
                        fill="white"
                      />
                      <path
                        d="M19.4736 6.97266H17.8662V8.58484H19.4736V6.97266Z"
                        fill="white"
                      />
                      <path
                        d="M10.1347 11.3535H8.52649V12.9613H10.1347V11.3535Z"
                        fill="white"
                      />
                      <path
                        d="M14.8037 11.3535H13.1963V12.9613H14.8037V11.3535Z"
                        fill="white"
                      />
                      <path
                        d="M19.4736 11.3535H17.8662V12.9613H19.4736V11.3535Z"
                        fill="white"
                      />
                      <path
                        d="M10.1347 15.7344H8.52649V17.3422H10.1347V15.7344Z"
                        fill="white"
                      />
                      <path
                        d="M14.8037 15.7344H13.1963V17.3422H14.8037V15.7344Z"
                        fill="white"
                      />
                      <path
                        d="M19.4736 15.7344H17.8662V17.3422H19.4736V15.7344Z"
                        fill="white"
                      />
                      <path
                        d="M25.697 17.5728H24.0896V19.1806H25.697V17.5728Z"
                        fill="white"
                      />
                      <path
                        d="M25.697 23.353H24.0896V24.9608H25.697V23.353Z"
                        fill="white"
                      />
                      <path
                        d="M3.91562 17.5728H2.30737V19.1806H3.91562V17.5728Z"
                        fill="white"
                      />
                      <path
                        d="M3.91562 23.353H2.30737V24.9608H3.91562V23.353Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_334_191">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Apartment
                </button>
                <button
                  onClick={() => {
                    setFearandDelight(false);
                    setFloor(null);
                    setApartment(null);
                  }}
                  className={`mr-[143.9px] ml-auto w-[99px] h-[30.1px] ${
                    !fearandDelight ? "bg-[#430096]" : "bg-[#C89BFF]"
                  } flex rounded-[27px] text-[20px] items-center justify-center text-white`}
                >
                  <svg
                    className="mr-[5px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 25 26"
                    fill="none"
                  >
                    <path
                      d="M3.18177 24.3425C2.96141 24.3425 2.78593 24.1678 2.78593 23.9484V10.5947C2.78593 10.3753 2.96141 10.2006 3.18177 10.2006C3.40213 10.2006 3.5776 10.3753 3.5776 10.5947V23.9484C3.5776 24.1678 3.40213 24.3425 3.18177 24.3425ZM21.8146 24.3425C21.5942 24.3425 21.4188 24.1678 21.4188 23.9484V10.5947C21.4188 10.3753 21.5942 10.2006 21.8146 10.2006C22.035 10.2006 22.2104 10.3753 22.2104 10.5947V23.9484C22.2104 24.1678 22.035 24.3425 21.8146 24.3425Z"
                      fill="white"
                    />
                    <path
                      d="M23.7448 12.3985C23.4387 12.3985 23.1449 12.2888 22.9164 12.0857L12.4982 2.91234L2.08404 12.0857C1.56578 12.5407 0.774108 12.4919 0.317061 11.976C0.207438 11.8538 0.123183 11.7112 0.0691511 11.5565C0.0151194 11.4018 -0.00762039 11.2379 0.00224222 11.0744C0.0121048 10.9109 0.0543748 10.7509 0.126616 10.6038C0.198858 10.4566 0.299642 10.3251 0.423162 10.2169L11.6698 0.312291C11.8992 0.111037 12.1945 0 12.5002 0C12.806 0 13.1013 0.111037 13.3307 0.312291L24.5773 10.2209C24.8262 10.4403 24.9772 10.745 24.9976 11.0781C25.018 11.4113 24.9078 11.7322 24.6834 11.98C24.4426 12.2482 24.1039 12.3985 23.7448 12.3985ZM12.4982 1.99014C12.592 1.99014 12.6859 2.02264 12.7593 2.08764L23.4387 11.4966C23.6224 11.6591 23.9284 11.6388 24.0876 11.456C24.1692 11.3625 24.21 11.2447 24.2018 11.1228C24.1937 11.0009 24.1406 10.8872 24.0468 10.8059L12.8042 0.901366C12.7199 0.826833 12.611 0.785672 12.4982 0.785672C12.3854 0.785672 12.2765 0.826833 12.1921 0.901366L0.945501 10.81C0.851643 10.8913 0.798593 11.005 0.790431 11.1269C0.786229 11.2176 0.808911 11.3076 0.855654 11.3855C0.902398 11.4635 0.971141 11.5261 1.05333 11.5655C1.13552 11.6049 1.22753 11.6194 1.31792 11.6071C1.40831 11.5949 1.49308 11.5564 1.5617 11.4966L12.237 2.0917C12.3105 2.02264 12.4043 1.99014 12.4982 1.99014ZM15.7587 24.3425C15.5384 24.3425 15.3629 24.1678 15.3629 23.9484V14.6613H9.63347V23.9484C9.63347 24.1678 9.458 24.3425 9.23764 24.3425C9.01728 24.3425 8.8418 24.1678 8.8418 23.9484V14.2673C8.8418 14.0479 9.01728 13.8732 9.23764 13.8732H15.7587C15.9791 13.8732 16.1546 14.0479 16.1546 14.2673V23.9484C16.1546 24.1678 15.9791 24.3425 15.7587 24.3425Z"
                      fill="white"
                    />
                    <path
                      d="M14.7549 11.911H10.2415C10.0211 11.911 9.84568 11.7363 9.84568 11.5169V7.02368C9.84568 6.8043 10.0211 6.62961 10.2415 6.62961H14.7549C14.9752 6.62961 15.1507 6.8043 15.1507 7.02368V11.5169C15.1507 11.7363 14.9752 11.911 14.7549 11.911ZM10.6373 11.1228H14.359V7.41775H10.6373V11.1228Z"
                      fill="white"
                    />
                    <path
                      d="M12.4982 11.911C12.2778 11.911 12.1023 11.7363 12.1023 11.5169V7.02368C12.1023 6.8043 12.2778 6.62961 12.4982 6.62961C12.7185 6.62961 12.894 6.8043 12.894 7.02368V11.5169C12.894 11.7363 12.7185 11.911 12.4982 11.911Z"
                      fill="white"
                    />
                    <path
                      d="M14.7549 9.66436H10.2415C10.0211 9.66436 9.84568 9.48966 9.84568 9.27028C9.84568 9.05091 10.0211 8.87621 10.2415 8.87621H14.7549C14.9752 8.87621 15.1507 9.05091 15.1507 9.27028C15.1507 9.48966 14.9752 9.66436 14.7549 9.66436ZM23.8427 26H1.15362C0.933259 26 0.757785 25.8253 0.757785 25.6059V23.9484C0.757785 23.729 0.933259 23.5543 1.15362 23.5543H23.8427C24.0631 23.5543 24.2386 23.729 24.2386 23.9484V25.6059C24.2386 25.8253 24.0631 26 23.8427 26ZM1.54538 25.2119H23.4469V24.3425H1.54538V25.2119Z"
                      fill="white"
                    />
                  </svg>
                  House
                </button>
              </div>
              <TextField
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                label="Street"
                variant="outlined"
                sx={{
                  width: "509.6px",
                  height: "48.3px",
                  marginLeft: "9.8px",
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "14px",
                    padding: "0 9.8px",
                    height: "48.3px",
                    boxSizing: "border-box",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    textAlign: "center",
                  },
                  "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                    fontSize: "14px",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                  },
                }}
              />

              {fearandDelight ? (
                <div className="w-[509.6px] h-[48.3px] flex flex-row ml-[9.8px] justify-between mt-[9.1px]">
                  <TextField
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    label="Building"
                    variant="outlined"
                    sx={{
                      width: "155.4px",
                      height: "48.3px",
                      "& .MuiInputBase-input": {
                        padding: "0 9.8px",
                        height: "48.3px",
                        boxSizing: "border-box",
                        color: "white",
                        fontSize: "14px",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        textAlign: "center",
                      },
                      "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                        fontSize: "14px",
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                          borderRadius: "7px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                          borderRadius: "7px",
                        },
                      },
                    }}
                  />
                  <TextField
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    label="Floor"
                    variant="outlined"
                    sx={{
                      width: "155.4px",
                      height: "48.3px",
                      "& .MuiInputBase-input": {
                        padding: "0 9.8px",
                        height: "48.3px",
                        boxSizing: "border-box",
                        color: "white",
                        fontSize: "14px",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        textAlign: "center",
                      },
                      "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                        fontSize: "14px",
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                          borderRadius: "7px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                          borderRadius: "7px",
                        },
                      },
                    }}
                  />
                  <TextField
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    label="Apartment"
                    variant="outlined"
                    sx={{
                      width: "155.4px",
                      height: "48.3px",
                      "& .MuiInputBase-input": {
                        color: "white",
                        fontSize: "14px",
                        padding: "0 9.8px",
                        height: "48.3px",
                        boxSizing: "border-box",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        textAlign: "center",
                      },
                      "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                        fontSize: "14px",
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                          borderRadius: "7px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                          borderRadius: "7px",
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <TextField
                  label="Building"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  variant="outlined"
                  sx={{
                    width: "509.6px",
                    height: "48.3px",
                    marginLeft: "9.8px",
                    marginTop: "9.1px",
                    "& .MuiInputBase-input": {
                      padding: "0 9.8px",
                      height: "48.3px",
                      boxSizing: "border-box",
                      color: "white",
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      textAlign: "center",
                    },
                    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                      fontSize: "14px",
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                        borderRadius: "7px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                        borderRadius: "7px",
                      },
                    },
                  }}
                />
              )}
              <TextField
                value={additionalinfo}
                onChange={(e) => setAdditionalinfo(e.target.value)}
                label="Additional Instructions"
                variant="outlined"
                multiline
                rows={3}
                sx={{
                  width: "509.6px",
                  marginLeft: "10px",
                  marginTop: "9.1px",
                  "& .MuiInputBase-input": {
                    padding: "0 10px",
                    boxSizing: "border-box",
                    color: "white",
                    fontSize: "19px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    textAlign: "center",
                  },
                  "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                    marginTop: "22px",
                    fontSize: "19px",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                      borderRadius: "7px",
                    },
                  },
                }}
              />
              <div className="h-[34.3px] w-[509.6px] justify-between flex ml-[9.8px] mt-[8px]">
                <button
                  onClick={() => setEditing2(false)}
                  className="w-[140.7px] h-[34.3px] rounded-[7.7px] border-[0.7px] border-[#652795] text-[18.9px]"
                  style={{
                    background:
                      "linear-gradient(to right, #DBC3FF 0%, #A855F7 47%, #C390FB 100%)",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSubmit(currentIndex);
                  }}
                  className="w-[140.7px] h-[34.3px] rounded-[7.7px] border-[0.7px] border-[#652795] text-[18.9px]"
                  style={{
                    background:
                      "linear-gradient(to right, #DBC3FF 0%, #A855F7 47%, #C390FB 100%)",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <p className="text-[20.3px] text-black flex items-center justify-start my-auto ml-8 mb-12">
                Addresses
              </p>
              <button
                onClick={() => {
                  setEditing2(true);
                  setLatitude(30);
                  setLongitude(30);
                  setStreet("");
                  setBuilding("");
                  setFloor("");
                  setApartment("");
                  setAdditionalinfo("");
                  setFearandDelight(false);
                  setCurrentIndex(-1);
                }}
                className="border-white rounded-[7px] border-[1px] absolute top-[20px] right-[20px] text-[22px] text-white h-[40px] w-[70px] flex items-center justify-center"
              >
                Add
              </button>
              <div className="flex flex-col w-[529.2px] h-[572px] gap-3">
                {saved_addresses?.map((address, index) => (
                  <div className="text-white text-[20px] border-white rounded-[7px] border-[1px] w-[500px] h-[77px] flex mx-auto cursor-pointer">
                    <div
                      className="flex flex-row"
                      onClick={() => {
                        setEditing(false);
                        setLatitude(address.latitude);
                        setLongitude(address.longitude);
                        setStreet(address.street);
                        setBuilding(address.buildingNumber);
                        setFloor(address.floor);
                        setApartment(address.apartmentNumber);
                        setAdditionalinfo(address.additionalDirections);
                        setFearandDelight(address.floor);
                        setCurrentIndex(index);
                      }}
                    >
                      {!address.floor ? (
                        <svg
                          className="mr-[5px] my-auto ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="60"
                          height="60"
                          viewBox="0 0 25 26"
                          fill="none"
                        >
                          <path
                            d="M3.18177 24.3425C2.96141 24.3425 2.78593 24.1678 2.78593 23.9484V10.5947C2.78593 10.3753 2.96141 10.2006 3.18177 10.2006C3.40213 10.2006 3.5776 10.3753 3.5776 10.5947V23.9484C3.5776 24.1678 3.40213 24.3425 3.18177 24.3425ZM21.8146 24.3425C21.5942 24.3425 21.4188 24.1678 21.4188 23.9484V10.5947C21.4188 10.3753 21.5942 10.2006 21.8146 10.2006C22.035 10.2006 22.2104 10.3753 22.2104 10.5947V23.9484C22.2104 24.1678 22.035 24.3425 21.8146 24.3425Z"
                            fill="white"
                          />
                          <path
                            d="M23.7448 12.3985C23.4387 12.3985 23.1449 12.2888 22.9164 12.0857L12.4982 2.91234L2.08404 12.0857C1.56578 12.5407 0.774108 12.4919 0.317061 11.976C0.207438 11.8538 0.123183 11.7112 0.0691511 11.5565C0.0151194 11.4018 -0.00762039 11.2379 0.00224222 11.0744C0.0121048 10.9109 0.0543748 10.7509 0.126616 10.6038C0.198858 10.4566 0.299642 10.3251 0.423162 10.2169L11.6698 0.312291C11.8992 0.111037 12.1945 0 12.5002 0C12.806 0 13.1013 0.111037 13.3307 0.312291L24.5773 10.2209C24.8262 10.4403 24.9772 10.745 24.9976 11.0781C25.018 11.4113 24.9078 11.7322 24.6834 11.98C24.4426 12.2482 24.1039 12.3985 23.7448 12.3985ZM12.4982 1.99014C12.592 1.99014 12.6859 2.02264 12.7593 2.08764L23.4387 11.4966C23.6224 11.6591 23.9284 11.6388 24.0876 11.456C24.1692 11.3625 24.21 11.2447 24.2018 11.1228C24.1937 11.0009 24.1406 10.8872 24.0468 10.8059L12.8042 0.901366C12.7199 0.826833 12.611 0.785672 12.4982 0.785672C12.3854 0.785672 12.2765 0.826833 12.1921 0.901366L0.945501 10.81C0.851643 10.8913 0.798593 11.005 0.790431 11.1269C0.786229 11.2176 0.808911 11.3076 0.855654 11.3855C0.902398 11.4635 0.971141 11.5261 1.05333 11.5655C1.13552 11.6049 1.22753 11.6194 1.31792 11.6071C1.40831 11.5949 1.49308 11.5564 1.5617 11.4966L12.237 2.0917C12.3105 2.02264 12.4043 1.99014 12.4982 1.99014ZM15.7587 24.3425C15.5384 24.3425 15.3629 24.1678 15.3629 23.9484V14.6613H9.63347V23.9484C9.63347 24.1678 9.458 24.3425 9.23764 24.3425C9.01728 24.3425 8.8418 24.1678 8.8418 23.9484V14.2673C8.8418 14.0479 9.01728 13.8732 9.23764 13.8732H15.7587C15.9791 13.8732 16.1546 14.0479 16.1546 14.2673V23.9484C16.1546 24.1678 15.9791 24.3425 15.7587 24.3425Z"
                            fill="white"
                          />
                          <path
                            d="M14.7549 11.911H10.2415C10.0211 11.911 9.84568 11.7363 9.84568 11.5169V7.02368C9.84568 6.8043 10.0211 6.62961 10.2415 6.62961H14.7549C14.9752 6.62961 15.1507 6.8043 15.1507 7.02368V11.5169C15.1507 11.7363 14.9752 11.911 14.7549 11.911ZM10.6373 11.1228H14.359V7.41775H10.6373V11.1228Z"
                            fill="white"
                          />
                          <path
                            d="M12.4982 11.911C12.2778 11.911 12.1023 11.7363 12.1023 11.5169V7.02368C12.1023 6.8043 12.2778 6.62961 12.4982 6.62961C12.7185 6.62961 12.894 6.8043 12.894 7.02368V11.5169C12.894 11.7363 12.7185 11.911 12.4982 11.911Z"
                            fill="white"
                          />
                          <path
                            d="M14.7549 9.66436H10.2415C10.0211 9.66436 9.84568 9.48966 9.84568 9.27028C9.84568 9.05091 10.0211 8.87621 10.2415 8.87621H14.7549C14.9752 8.87621 15.1507 9.05091 15.1507 9.27028C15.1507 9.48966 14.9752 9.66436 14.7549 9.66436ZM23.8427 26H1.15362C0.933259 26 0.757785 25.8253 0.757785 25.6059V23.9484C0.757785 23.729 0.933259 23.5543 1.15362 23.5543H23.8427C24.0631 23.5543 24.2386 23.729 24.2386 23.9484V25.6059C24.2386 25.8253 24.0631 26 23.8427 26ZM1.54538 25.2119H23.4469V24.3425H1.54538V25.2119Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="mr-[10px] my-auto ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="60"
                          height="60"
                          viewBox="0 0 28 28"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_334_191)">
                            <path
                              d="M18.1589 0H9.8363V1.77931H18.1589V0Z"
                              fill="white"
                            />
                            <path
                              d="M19.446 2.68262H8.55396V4.29043H19.446V2.68262Z"
                              fill="white"
                            />
                            <path
                              d="M22.1607 14.5376V27.9999H27.6207V14.5376H22.1607ZM26.6 25.4121C26.6 25.665 26.3965 25.8636 26.1489 25.8636H23.6377C23.3892 25.8636 23.1866 25.665 23.1866 25.4121V22.9013C23.1866 22.6528 23.3892 22.4493 23.6377 22.4493H26.1489C26.3965 22.4493 26.6 22.6528 26.6 22.9013V25.4121ZM26.6 19.6318C26.6 19.8847 26.3965 20.0833 26.1489 20.0833H23.6377C23.3892 20.0833 23.1866 19.8847 23.1866 19.6318V17.121C23.1866 16.8725 23.3892 16.6695 23.6377 16.6695H26.1489C26.3965 16.6695 26.6 16.8725 26.6 17.121V19.6318ZM14.0004 20.0247C12.5103 20.0247 11.2949 21.2397 11.2949 22.7298V27.9999H16.7002V22.7298C16.7007 21.2392 15.4905 20.0247 14.0004 20.0247ZM12.6949 24.4636C12.6949 24.7121 12.4967 24.9151 12.2439 24.9151C11.9954 24.9151 11.7919 24.7121 11.7919 24.4636V23.5606C11.7919 23.3121 11.9954 23.1091 12.2439 23.1091C12.4967 23.1091 12.6949 23.3121 12.6949 23.5606V24.4636Z"
                              fill="white"
                            />
                            <path
                              d="M6.74232 14.0768C6.74232 14.0768 6.74757 14.0812 6.74757 14.086C6.74757 14.0908 6.74232 14.0952 6.74232 14.0952V27.9998H10.3919V22.7297C10.3919 20.7382 12.0085 19.1212 13.9952 19.1212C15.9871 19.1212 17.6037 20.7377 17.6037 22.7297V27.9998H21.2577V5.19336H6.74232V14.0768ZM16.9628 6.52117C16.9628 6.27267 17.1653 6.06923 17.4138 6.06923H19.9251C20.1779 6.06923 20.3761 6.27267 20.3761 6.52117V9.0368C20.3761 9.2853 20.1779 9.4883 19.9251 9.4883H17.4138C17.1653 9.4883 16.9628 9.2853 16.9628 9.0368V6.52117ZM16.9628 10.9019C16.9628 10.6534 17.1653 10.4504 17.4138 10.4504H19.9251C20.1779 10.4504 20.3761 10.6534 20.3761 10.9019V13.4127C20.3761 13.6655 20.1779 13.8642 19.9251 13.8642H17.4138C17.1653 13.8642 16.9628 13.6655 16.9628 13.4127V10.9019ZM16.9628 15.2825C16.9628 15.0345 17.1653 14.831 17.4138 14.831H19.9251C20.1779 14.831 20.3761 15.0345 20.3761 15.2825V17.7938C20.3761 18.0419 20.1779 18.2453 19.9251 18.2453H17.4138C17.1653 18.2453 16.9628 18.0419 16.9628 17.7938V15.2825ZM12.2933 6.52117C12.2933 6.27267 12.4968 6.06923 12.7444 6.06923H15.2556C15.5041 6.06923 15.7067 6.27267 15.7067 6.52117V9.0368C15.7067 9.2853 15.5041 9.4883 15.2556 9.4883H12.7444C12.4968 9.4883 12.2933 9.2853 12.2933 9.0368V6.52117ZM12.2933 10.9019C12.2933 10.6534 12.4968 10.4504 12.7444 10.4504H15.2556C15.5041 10.4504 15.7067 10.6534 15.7067 10.9019V13.4127C15.7067 13.6655 15.5041 13.8642 15.2556 13.8642H12.7444C12.4968 13.8642 12.2933 13.6655 12.2933 13.4127V10.9019ZM12.2933 15.2825C12.2933 15.0345 12.4968 14.831 12.7444 14.831H15.2556C15.5041 14.831 15.7067 15.0345 15.7067 15.2825V17.7938C15.7067 18.0419 15.5041 18.2453 15.2556 18.2453H12.7444C12.4968 18.2453 12.2933 18.0419 12.2933 17.7938V15.2825ZM7.62345 6.52117C7.62345 6.27267 7.82251 6.06923 8.07539 6.06923H10.5858C10.8343 6.06923 11.0377 6.27267 11.0377 6.52117V9.0368C11.0377 9.2853 10.8343 9.4883 10.5858 9.4883H8.07539C7.82251 9.4883 7.62345 9.2853 7.62345 9.0368V6.52117ZM7.62345 10.9019C7.62345 10.6534 7.82251 10.4504 8.07539 10.4504H10.5858C10.8343 10.4504 11.0377 10.6534 11.0377 10.9019V13.4127C11.0377 13.6655 10.8343 13.8642 10.5858 13.8642H8.07539C7.82251 13.8642 7.62345 13.6655 7.62345 13.4127V10.9019ZM7.62345 15.2825C7.62345 15.0345 7.82251 14.831 8.07539 14.831H10.5858C10.8343 14.831 11.0377 15.0345 11.0377 15.2825V17.7938C11.0377 18.0419 10.8343 18.2453 10.5858 18.2453H8.07539C7.82251 18.2453 7.62345 18.0419 7.62345 17.7938V15.2825ZM0.379761 27.9998H5.83932V14.5375H0.379761V27.9998ZM1.40439 17.1205C1.40439 16.872 1.60345 16.669 1.85632 16.669H4.3667C4.6152 16.669 4.81864 16.872 4.81864 17.1205V19.6313C4.81864 19.8842 4.6152 20.0828 4.3667 20.0828H1.85632C1.60345 20.0828 1.40439 19.8842 1.40439 19.6313V17.1205ZM1.40439 22.9012C1.40439 22.6527 1.60345 22.4492 1.85632 22.4492H4.3667C4.6152 22.4492 4.81864 22.6527 4.81864 22.9012V25.412C4.81864 25.6649 4.6152 25.8635 4.3667 25.8635H1.85632C1.60345 25.8635 1.40439 25.6649 1.40439 25.412V22.9012Z"
                              fill="white"
                            />
                            <path
                              d="M10.1347 6.97266H8.52649V8.58484H10.1347V6.97266Z"
                              fill="white"
                            />
                            <path
                              d="M14.8037 6.97266H13.1963V8.58484H14.8037V6.97266Z"
                              fill="white"
                            />
                            <path
                              d="M19.4736 6.97266H17.8662V8.58484H19.4736V6.97266Z"
                              fill="white"
                            />
                            <path
                              d="M10.1347 11.3535H8.52649V12.9613H10.1347V11.3535Z"
                              fill="white"
                            />
                            <path
                              d="M14.8037 11.3535H13.1963V12.9613H14.8037V11.3535Z"
                              fill="white"
                            />
                            <path
                              d="M19.4736 11.3535H17.8662V12.9613H19.4736V11.3535Z"
                              fill="white"
                            />
                            <path
                              d="M10.1347 15.7344H8.52649V17.3422H10.1347V15.7344Z"
                              fill="white"
                            />
                            <path
                              d="M14.8037 15.7344H13.1963V17.3422H14.8037V15.7344Z"
                              fill="white"
                            />
                            <path
                              d="M19.4736 15.7344H17.8662V17.3422H19.4736V15.7344Z"
                              fill="white"
                            />
                            <path
                              d="M25.697 17.5728H24.0896V19.1806H25.697V17.5728Z"
                              fill="white"
                            />
                            <path
                              d="M25.697 23.353H24.0896V24.9608H25.697V23.353Z"
                              fill="white"
                            />
                            <path
                              d="M3.91562 17.5728H2.30737V19.1806H3.91562V17.5728Z"
                              fill="white"
                            />
                            <path
                              d="M3.91562 23.353H2.30737V24.9608H3.91562V23.353Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_334_191">
                              <rect width="28" height="28" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                      <div className="flex flex-col justify-between">
                        <div className="w-[100px] text-start">
                          {!address.floor ? "House" : "Apartment"}
                        </div>
                        <div className="w-[350px] text-start">
                          {address.street} {address.buildingNumber}
                        </div>
                      </div>
                    </div>
                    <div
                      className="h-[75px] w-[50px] ml-auto items-center justify-center flex border-l-[1px]"
                      onClick={() => {
                        setEditing2(true);
                        setLatitude(address.latitude);
                        setLongitude(address.longitude);
                        setStreet(address.street);
                        setBuilding(address.buildingNumber);
                        setFloor(address.floor);
                        setApartment(address.apartmentNumber);
                        setAdditionalinfo(address.additionalDirections);
                        setFearandDelight(address.floor);
                        setCurrentIndex(index);
                      }}
                    >
                      Edit
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div>
            <div className="w-[529.2px] h-[49px] flex">
              <p className="text-[24px] text-white flex items-center justify-start my-auto mx-auto">
                Checkout
              </p>
            </div>
            <div className="h-[204.4px] w-[488.6px] bg-violet-300 text-black mx-auto rounded-[10px] mb-4">
              <p className="text-[20px] text-black flex items-center justify-start my-auto ml-4">
                Shipping
              </p>
              {!(saved_addresses?.length === 0) ? (
                <div className="h-[171.5px] flex flex-row relative">
                  <div className="flex flex-col ml-[30px] my-auto">
                    <p className="text-[17px] text-black mb-0">
                      {currentaddress?.street}
                    </p>
                    <p className="text-[17px] text-black mb-0">
                      Building: {currentaddress?.buildingNumber}
                    </p>
                    {fearandDelight ? (
                      <p className="text-[17px] text-black">
                        Floor {currentaddress?.floor}, Apt.
                        {currentaddress?.apartmentNumber}
                      </p>
                    ) : (
                      <></>
                    )}
                    <p className="text-[14px] w-[280px] break-words text-black overflow-auto h-[60px] lasttimeipromise">
                      {currentaddress?.additionalDirections}
                    </p>
                  </div>
                  <div className="absolute right-[190px] top-[4px]">
                    <EditButton
                      handleEditClick={() => {
                        setEditing(true);
                        setEditing2(false);
                      }}
                    />
                  </div>
                  <iframe
                    title="map"
                    className="rounded-[7px] my-auto"
                    src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                    width="157.5px"
                    height="157.5px"
                  ></iframe>
                </div>
              ) : (
                <div className="h-[171.5px] flex flex-row relative">
                  <button
                    onClick={() => {
                      setEditing(true);
                      setEditing2(false);
                    }}
                    className="text-white text-[23px] border-white rounded-[7px] border-[1px] w-[395px] h-[61px] flex mx-auto my-auto items-center justify-center"
                  >
                    Add a new address to continue
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-row justify-center relative">
              <div className="flex flex-col w-[244.3px] h-[170px] bg-violet-200 rounded-l-[10px]">
                <div className="flex mx-auto w-[240px] h-[32.9px] rounded-l-[10px] ">
                  <p className="text-[17px] text-black flex items-center justify-start my-auto ml-4">
                    Payment
                  </p>
                </div>
                <div className="flex mx-auto h-[137.2px]">
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
                        width: "212px",
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
                        width: "212px",
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
                        width: "212px",
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
                </div>
              </div>
              <div className="absolute">
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
              <div className="flex flex-col w-[244.3px] h-[170px] bg-violet-500 rounded-r-[10px]">
                <div className="flex mx-auto w-[240px] h-[32.9px] rounded-r-[10px]">
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

                    <div className="absolute w-[250px] h-[60px] bottom-[-23px] left-[-490px] transform translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-[16px] rounded-[16px] px-4 shadow-lg">
                      Promo codes apply a 10% discount and can't be reused
                    </div>
                  </div>
                </div>
                <PromoCodeButton
                  onAccept={setOnAccept}
                  className="mt-[7.7px] mx-auto h-[120px]"
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
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
