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
        setErrorText("");
        Swal.fire({
          title: "Success",
          text: "Promo code applied successfully.",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#000000",
        });
      } else {
        onAccept(false);
        setError(true);
        setErrorText("Invalid promo code.");
        Swal.fire({
          title: "Error",
          text: "Invalid promo code.",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#000000",
        });
      }
    } catch (err) {
      onAccept(false);
      setError(true);
      setErrorText("An error occurred. Please try again.");
    }
  };

  return (
    <div className={`w-[448px] h-[43px] rounded-[16px] ${className}`}>
      <div className="flex mb-1">
        <TextField
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          error={error}
          sx={{
            marginLeft: "20px",
            width: "423px",
            height: "43px",
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
          className=" ml-[55px] w-[170px] h-[43px] bg-[#000000] rounded-[16px] text-[#FFFFFF] font-normal text-[18px]"
        >
          Apply Code
        </button>
      </div>
    </div>
  );
};

export default PromoCodeButton;
