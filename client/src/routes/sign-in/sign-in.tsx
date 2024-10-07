import React, { useState, useEffect } from "react";
import image1 from "../../assets/splash/s2.jpeg";
import image2 from "../../assets/splash/s1.jpg";
import image3 from "../../assets/splash/s3.jpg";
import image4 from "../../assets/splash/s4.jpg";
import image5 from "../../assets/splash/s5.jpg";
import useLoginGuest from "../../custom_hooks/useLoginGuest";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import BlockedAccountPopup from "../../components/BlockedAccountPopup";


const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const [apiBody, setBody] = useState<object | null>(null);
  const [showBlockedPopup, setShowBlockedPopup] = useState<boolean>(false); // State for popup
  const navigate = useNavigate();

  const images = [image1, image2, image3, image4, image5];

  const { data, loading, err} = useLoginGuest(apiBody);

  useEffect(() => {
    if (data === null) return;
    if (data.type === "seller" || data.type === "advertiser" || data.type === "tourguide") {
      if (data.user.isAccepted === false) {
        setShowBlockedPopup(true);
        return;
      }
    }
    // Assuming that data.type and data.user._id are valid
    navigate(`/${data.type}/${data.user.username}`);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    setBody({ username: username, password: password });


  };

  const closePopup = () => {
    setShowBlockedPopup(false); // Close the popup
  };

  useEffect(() => {
    function handleError() {
      if(err === null) return;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err,
      });
    }
  
    handleError();
  }, [err]);

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('src/assets/mtn.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-2xl w-full max-w-2xl h-auto md:h-[90vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="flex flex-col justify-center items-center p-4 md:p-6 space-y-4 min-h-full">
          <div className="flex flex-col items-center">
            <img
              src="src/assets/logo.png"
              alt="Logo"
              className="w-30 h-30 md:w-30 md:h-30 mb-2 md:mb-4 object-contain"
            />
            <h2 className="text-2xl md:text-3xl font-extrabold text-purple-600 mb-2 text-center leading-snug">
              Welcome Back!
            </h2>
            <p className="text-gray-600 text-center mb-2">
              Sign in to your account and explore the possibilities.
            </p>
            <hr className="w-full border-t-2 border-purple-500 mb-2" />
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4 pb-4">
            <div>
              <label className="block text-gray-700 font-semibold text-base mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-base mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105 shadow-lg"
            >
              {loading ? (
                  <ClipLoader size={20} color="#ffffff" /> // Show spinner while loading
                ) : (
                  "Sign In"
                )}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="text-center">
              New here?{" "}
              <a
                href="/register"
                className="text-purple-700 hover:text-purple-600 underline"
              >
                Create an account
              </a>
              <br />
              <br />
              <a
                href="/forgot-password"
                className="text-purple-700 hover:text-purple-600 underline"
              >
                Forgot your password?
              </a>
              <br></br>
              <br></br>
              <a
                href="/guest-page"
                className="text-purple-700 hover:text-purple-600 underline"
              >
                Enter as Guest
              </a>
            </div>
          </form>
        </div>

        <div className="relative hidden md:flex flex-col">
          <img
            src={images[currentImageIndex]}
            alt="Sign In Illustration"
            className={`object-cover w-full h-full rounded-r-lg transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"
              }`}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-purple-600 opacity-30"></div>
        </div>
      </div>

      {/* Blocked Account Popup */}
      {showBlockedPopup && <BlockedAccountPopup onClose={closePopup} />}
    </div>
  );
};

export default SignIn;
