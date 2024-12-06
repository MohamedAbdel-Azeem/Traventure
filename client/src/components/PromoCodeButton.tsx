import { TextField } from "@mui/material";
import { useCheckPromoCode } from "../custom_hooks/promo_codes/promocodecustomhooks";
import { useState } from "react";
import Swal from "sweetalert2";
interface PromoCodeButtonProps {
  onAccept: (accepted: boolean) => void;
  className?: string;
}

const PromoCodeButton = ({ onAccept, className }: PromoCodeButtonProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleApplyCode = async () => {
    try {
      const res = await useCheckPromoCode(promoCode);
      if (res) {
        onAccept(true);
        setError(false);
        setErrorText("Code Accepted");
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
    <div className={`w-[212px] rounded-[16px] ${className}`}>
      <div className="flex flex-col gap-[9px]">
        <TextField
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          error={error}
          sx={{
            height: "34px",
            borderRadius: "4px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "& .MuiInput-input": {
              height: "100%",
              fontSize: "16px",
            },
            backgroundColor: "#FFFFFF",
          }}
          placeholder="Enter Promo Code"
        />
        <button
          onClick={handleApplyCode}
          className="h-[34px] bg-gradient-to-r from-violet-400 to-violet-600 hover:bg-gradient-to-l rounded-[6px] font-normal text-[20px] text-black"
        >
          Apply
        </button>
        <p className="text-red-900 text-center">{errorText}</p>
      </div>
    </div>
  );
};

export default PromoCodeButton;
