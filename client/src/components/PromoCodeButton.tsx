import { TextField } from "@mui/material";
import { useCheckPromoCode } from "../custom_hooks/promo_codes/promocodecustomhooks";
import { useState } from "react";

interface PromoCodeButtonProps {
  onAccept: (accepted: boolean) => void;
}

const PromoCodeButton = ({ onAccept }: PromoCodeButtonProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleApplyCode = async () => {
    try {
      const res = await useCheckPromoCode(promoCode);
      if (res) {
        onAccept(true);
        setError(false);
        setErrorText("");
      } else {
        onAccept(false);
        setError(true);
        setErrorText("Invalid promo code.");
      }
    } catch (err) {
      onAccept(false);
      setError(true);
      setErrorText("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-8 ml-8 w-[500px] h-[150px] rounded-[16px] bg-gradient-to-r from-[#A855F7] to-[#6D28D9]">
      <div className="relative grid grid-cols-2">
        <p className="w-[250px] h-[80px] text-[24px] text-black flex items-center justify-center mb-0">
          Promo Code
        </p>
        <div className="relative group h-[30px] w-[30px] ml-auto mr-[30px] my-auto cursor-pointer">
          <svg
            className="h-[30px] w-[30px] ml-auto mr-[30px] my-auto cursor-pointer"
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
          <div className="absolute w-[250px] h-[60px] bottom-[-20px] right-[160px] transform translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-[16px] rounded-[16px] px-4 shadow-lg">
            Promo codes apply a 10% discount and can't be reused
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mb-1">
        <TextField
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          error={error}
          sx={{
            marginLeft: "20px",
            width: "280px",
            height: "50px",
            borderRadius: "4px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "& .MuiInput-input": {
              height: "100%",
              padding: "10px 12px",
              fontSize: "16px",
            },
            backgroundColor: "#FFFFFF",
          }}
          placeholder="Enter Promo Code"
        />
        <button
          onClick={handleApplyCode}
          className="ml-auto mr-[26px] w-[150px] h-[50px] bg-[#000000] rounded-[12px] text-[#FFFFFF] font-normal text-[18px]"
        >
          Apply Code
        </button>
      </div>
    </div>
  );
};

export default PromoCodeButton;
