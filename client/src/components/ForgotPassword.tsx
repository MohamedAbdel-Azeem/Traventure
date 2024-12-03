import { TextField } from "@mui/material";
import { set } from "date-fns";
import React, { useState } from "react";
import Swal from "sweetalert2";
// import sendMail from "../../../server/utils/functions/email_sender";
import {updatepassword} from "../custom_hooks/changepassowrd";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [codesent, setcodeSent] = useState("");
  const [iscodesent, setisCodeSent] = useState(0); 
  const [error, setError] = useState("");

  const generateRandomCode = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let code = "";

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      code += letters[randomIndex];
    }

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      code += numbers[randomIndex];
    }
    console.log(code);
    return code;
  };

  function sendCode(email: string) {
    setisCodeSent(1);
    const Code = generateRandomCode();
    setcodeSent(Code);
    const textHtml = `<h1>Here is the recovery code you requested: <strong>${Code}</strong></h1> <br> <p>If you haven't requested a recovery code you might want to change your password</p> <br> <p>Thank you for being a part of our community.</p>`;
    //   sendMail(email, "Recovery Code!", textHtml);
  }
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(password)) {
      return "Password must contain at least one letter and one number";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationError = validatePassword(newPassword);
    setError(validationError);
  };



const handleSubmit = () => {
  const validationError = validatePassword(password);
  if (validationError) {
    setError(validationError);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: validationError,
    });
  } else {
    updatepassword(email, password);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Your password has been changed successfully!",
    });
  }
};


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[400px] h-[307px] bg-gradient-to-r from-[#A855F7] to-[#6D28D9] flex flex-col rounded-[22px]">
        {iscodesent == 0 ? (
          <div>
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
                "& .MuiInputBase-input": {
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
              onClick={() => sendCode(email)}
            >
              Send
            </button>
            <div className="w-[400px] h-[55px] flex flex-row items-center">
              <p className="text-white text-[18px] mb-[0px] ml-auto">
                Don't have an account?
              </p>
              <a
                className="text-black hover:text-slate-100 underline text-[18px] mb-[0px] ml-2 mr-auto"
                href="/register"
              >
                Sign up now
              </a>
            </div>
          </div>
        ) : iscodesent === 1 ? (
          <div>
            <p className="w-[400px] h-[82px] flex justify-center text-[28px] text-white text-center items-center">
              Enter Recovery Code
            </p>
            <TextField
              label="Code"
              className="w-[318px] h-[52px]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              variant="outlined"
              sx={{
                display: "flex",
                marginX: "auto",
                marginTop: "20px",
                "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                  fontSize: "20px",
                  color: "white",
                },
                "& .MuiInputBase-input": {
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
              onClick={() => {
                if (code === codesent) {
                  setisCodeSent(2);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The code you entered is incorrect",
                  });
                }
              }}
            >
              Send
            </button>
          </div>
        ) : (
          <div>
            <p className="w-[400px] h-[82px] flex justify-center text-[28px] text-white text-center items-center">
              Enter New Password
            </p>
            <TextField
              label="Password"
              className="w-[318px] h-[52px]"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              sx={{
                display: "flex",
                marginX: "auto",
                marginTop: "20px",
                "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                  fontSize: "20px",
                  color: "white",
                },
                "& .MuiInputBase-input": {
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
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <button
              className="bg-[#707070] w-[318px] h-[52px] mt-[13px] flex mx-auto text-white text-center items-center justify-center text-[20px] rounded-[4px]"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        )}
        <a
          className="text-black hover:text-slate-100 underline text-[18px] mx-auto mr-auto mt-auto mb-[20px]"
          href="/"
        >
          Return to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
