import { TextField } from "@mui/material";
import React, { useState } from "react";
// import sendMail from "../../../server/utils/functions/email_sender";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
const generateRandomCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let code = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    code += letters[randomIndex];
  }

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    code += numbers[randomIndex];
  }
  return code;
};

    function sendCode(email: string, Code: string) {
  const textHtml = `<h1>Here is the recovery code you requested: <strong>${Code}</strong></h1> <br> <p>If you haven't requested a recovery code you might want to change your password</p> <br> <p>Thank you for being a part of our community.</p>`;
//   sendMail(email, "Recovery Code!", textHtml);
}

  const recoveryCode = generateRandomCode();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[400px] h-[307px] bg-gradient-to-r from-[#A855F7] to-[#6D28D9] flex flex-col rounded-[22px]">
        <p className="w-[400px] h-[82px] flex justify-center text-[28px] text-white text-center items-center">
          Forgot Password
        </p>
        <TextField
          label="Email"
          className="w-[318px] h-[52px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          sx={{
            display: "flex",
            marginX: "auto",
            "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
              fontSize: "20px",
              color: "white",
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
        <button
          className="bg-[#707070] w-[318px] h-[52px] mt-[13px] flex mx-auto text-white text-center items-center justify-center text-[20px] rounded-[4px]"
          onClick={() => sendCode(email, recoveryCode)}
        >
          Send
        </button>
        <div className="w-[400px] h-[55px] flex flex-row items-center">
          <p className="text-white text-[18px] mb-[0px] ml-auto">
            Don't have an account?
          </p>
          <a
            className="text-black hover:text-slate-600 underline text-[18px] mb-[0px] ml-2 mr-auto"
            href="/register"
          >
            Sign up now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
