import * as React from "react";
import Radio from "@mui/material/Radio";
import { FormControlLabel, TextField } from "@mui/material";
import TheMAP from "./Maps/TheMAP";
import PromoCodeButton from "./PromoCodeButton";

const Checkout = () => {
  const [selectedValue, setSelectedValue] = React.useState("cod");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardDate, setCardDate] = React.useState("");
  const [cardSecurity, setCardSecurity] = React.useState("");
  const [onAccept, setOnAccept] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    value = value.replace(/(.{4})/g, "$1 ").trim(); // Insert space every 4 digits
    setCardNumber(value);
  };

  const handleCardDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    value = value.replace(/(.{2})/g, "$1/").trim(); // Insert slash every 2 digits
    if (value.length > 5) value = value.slice(0, 5); // Limit to MM/YY format
    setCardDate(value);
  };

  const handleCardSecurityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (value.length > 3) value = value.slice(0, 3); // Limit to 3 digits
    setCardSecurity(value);
  };


  return (
    <div className=" ml-8 mt-8 w-[756px] h-[892px] rounded-[24px] bg-gradient-to-r from-[#A855F7] to-[#6D28D9] flex flex-col">
      <div className="w-[756px] h-[70px] flex">
        <p className="text-[29px] text-black flex items-center justify-start my-auto ml-12">
          Checkout
        </p>
      </div>
      <div className="flex mx-auto w-[698px] h-[47px] rounded-l-[38px] bg-gradient-to-r from-[#DBC3FF] to-[#A855F7]">
        <p className="text-[22px] text-black flex items-center justify-start my-auto ml-6">
          Shipping
        </p>
      </div>
      <div className="h-[245px] flex flex-row">
        <div className="flex flex-col ml-[58px] my-auto">
          <p className="text-[22px] text-white">Al Thawra St.</p>
          <p className="text-[22px] text-white">Building 8673</p>
          <p className="text-[22px] text-white">Floor 4, Apt. 11</p>
          <p className="text-[20px] text-white">
            Do not ring the door bell, try using the back door instead.
          </p>
        </div>
        <iframe
          title="map"
          className="rounded-[10px] my-auto ml-auto mr-[58px]"
          src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${30}!3d${31}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
          width="225px"
          height="225px"
        ></iframe>
      </div>
      <div className="flex mx-auto w-[698px] h-[47px] rounded-r-[38px] bg-gradient-to-r from-[#DBC3FF] to-[#A855F7]">
        <p className="text-[22px] text-black flex items-center justify-start my-auto ml-6">
          Payment
        </p>
      </div>
      <div className="flex ml-[50px] h-[138px]">
        <div className="my-auto gap-[13px] flex flex-col">
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
                }}
              />
            }
            sx={{
              width: "304px",
              height: "49px",
              backgroundColor: "white",
              borderRadius: "10px",
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
                }}
              />
            }
            sx={{
              width: "304px",
              height: "49px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            label="COD (Cash on Delivery)"
          />
        </div>
        <div
          className={`my-auto gap-[13px] flex flex-col ${
            selectedValue.includes("cod") ? "hidden" : ""
          }`}
        >
          <TextField
            id="ccn"
            type="tel"
            inputMode="numeric"
            inputProps={{ maxLength: 19, pattern: "[0-9s]{13,19}" }}
            placeholder="XXXX XXXX XXXX XXXX"
            required
            variant="outlined"
            value={cardNumber}
            onChange={handleCardNumberChange}
            onKeyPress={(event) => {
              if (!/[0-9\s]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            sx={{
              width: "350px",
              height: "49px",
              "& .MuiInputBase-input": {
                textAlign: "center",
                padding: "0 14px",
                height: "49px",
                boxSizing: "border-box",
              },
              "& .MuiInputBase-input::placeholder": {
                textAlign: "center",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius: "10px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                  borderRadius: "10px",
                },
              },
            }}
          />
          <div className="flex flex-row gap-[10px]">
            <TextField
              id="exp-date"
              type="tel"
              inputMode="numeric"
              inputProps={{ maxLength: 5, pattern: "[0-9/]*" }}
              placeholder="MM/YY"
              required
              variant="outlined"
              value={cardDate}
              onChange={handleCardDateChange}
              onKeyPress={(event) => {
                if (!/[0-9/]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              sx={{
                width: "210px",
                height: "49px",
                borderRadius: "30px",
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  padding: "0 14px",
                  height: "49px",
                  boxSizing: "border-box",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: "10px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                    borderRadius: "10px",
                  },
                },
              }}
            />
            <TextField
              id="cvv"
              type="tel"
              inputMode="numeric"
              inputProps={{ maxLength: 3, pattern: "[0-9]*" }}
              placeholder="CVV"
              required
              variant="outlined"
              value={cardSecurity}
              onChange={handleCardSecurityChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              sx={{
                width: "129px",
                height: "49px",
                borderRadius: "30px",
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  padding: "0 14px",
                  height: "49px",
                  boxSizing: "border-box",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: "10px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                    borderRadius: "10px",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex mx-auto w-[698px] h-[47px] rounded-l-[38px] bg-gradient-to-r from-[#A855F7] to-[#DBC3FF]">
        <p className="text-[22px] text-black flex items-center justify-start my-auto ml-6">
          Promo Code
        </p>
        <div className="relative group h-[30px] w-[30px] mr-auto ml-[30px] my-auto cursor-pointer">
          <svg
            className="h-[30px] w-[30px] mr-auto ml-[30px] my-auto cursor-pointer"
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
          <div className="absolute w-[250px] h-[60px] bottom-[-23px] left-[-60px] transform translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-[16px] rounded-[16px] px-4 shadow-lg">
            Promo codes apply a 10% discount and can't be reused
          </div>
        </div>
      </div>
      <PromoCodeButton
        onAccept={setOnAccept}
        className="ml-[19px] w-[648px] mt-[11px]"
      />
      <line className="bg-white size-5 h-[1px] w-[698px] flex mx-auto mt-[10px]" />
      <div className="w-[698px] h-[121px] grid grid-cols-2 mx-auto my-[3px]">
        <div className="mr-auto">
          <p className="text-[21px] text-white justify-start flex">Subtotal:</p>
          <p className="text-[21px] text-white justify-start flex">Shipping:</p>
          <p className="text-[21px] text-white justify-start flex">Tax:</p>
        </div>
        <div className="ml-auto">
          <p className="text-[21px] text-white justify-end flex">EGP 6000.09</p>
          <p className="text-[21px] text-white justify-end flex">EGP 900.60</p>
          <p className="text-[21px] text-white justify-end flex">EGP 69.00</p>
        </div>
      </div>
      <div>
        <div className="bg-gradient-to-r from-[#DBC3FF] to-[#A855F7] rounded-tl-[24px] rounded-br-[24px] h-[91px] w-[726px] flex flex-row mx-auto mt-[2px]">
          <p className="text-[30px] text-black my-auto ml-2">EGP 6969.69</p>
          <button className="my-auto ml-auto mr-[14px] w-[270px] h-[66px] bg-gradient-to-r from-[#A855F7] via-[#DBC3FF] to-[#C390FB] border-[#652795] border-[1px] rounded-[11px] text-[30px]">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
