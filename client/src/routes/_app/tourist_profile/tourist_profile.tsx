import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TouristProfileData } from "./tourist_profile_data";
import { patchUserProfile } from "../../../custom_hooks/updateTouristProfile";

import RedeemPopup from "../../../components/RedeemPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import BadgePopup from "../../../components/BadgePopup";
import { redeemPoints } from "../../../custom_hooks/touristpoints/redeemPoints";

import { handleDeleteAccount } from "../../../custom_hooks/usedeleterequest";

interface TouristProfileProps {
  tourist: TouristProfileData;
}

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfBirth: z.string().refine((val) => {
    const today = new Date();
    const dob = new Date(val);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, "You must be 18 years or older"),
  Occupation: z.string().min(1, "Occupation is required"),
});
export type TouristProfileUpdate = z.infer<typeof schema>;

const TouristProfile: React.FC<TouristProfileProps> = ({ tourist }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [currentTourist, setCurrentTourist] = useState(tourist);
  const [apiBody, setApiBody] = useState({});
  const [apiUsername, setApiUsername] = useState("");
  const response = patchUserProfile(apiBody, apiUsername);
  const [isRedeemPopupOpen, setIsRedeemPopupOpen] = useState(false);
  const [isBadgePopupOpen, setIsBadgePopupOpen] = useState(false);

  // Function to open the popup
  const handleRedeemClick = () => {
    setIsRedeemPopupOpen(true);
  };

  // Function to close the popup
  const handleCloseRedeemPopup = () => {
    setIsRedeemPopupOpen(false);
  };

  const handleBadgeClick = () => {
    setIsBadgePopupOpen(true);
  };

  // Function to close the badge popup
  const handleCloseBadgePopup = () => {
    setIsBadgePopupOpen(false);
  };

  //  tourist = patchUserProfile(tourist, tourist.username).response as TouristProfileData;

  // Define the Zod schema for form validation
  // Initialize useForm with default values from props
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TouristProfileData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: currentTourist.username,
      email: currentTourist.email,
      mobileNumber: currentTourist.mobileNumber,
      nationality: currentTourist.nationality,
      dateOfBirth: currentTourist.dateOfBirth,
      Occupation: currentTourist.Occupation,
    },
  });

  // Handle form submission (save edited data)
  const onSubmit = (data: TouristProfileData) => {
    setIsEditing(false);
    setApiBody(data);
    setApiUsername(data.username);

    setCurrentTourist(data);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChangeSubmit = (data: AddContactLeadFormType) => {
    const { oldPassword, newPassword } = data;
    editpassword(currentTourist.username, oldPassword, newPassword)
      .then(() => {
        setSuccessMessage("Password changed successfully!");
        setPasswordModalOpen(false);

        Swal.fire({
          title: "Password Changed Successfully",
          text: "Password has been changed",
          icon: "success",
        });
      })
      .catch((error) => {
        const errorMessage = error.message || "Failed to change password.";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await handleDeleteAccount(
          currentTourist._id,
          currentTourist.username,
          "tourist",
          currentTourist.wallet || 0
        );
        if (res === "success") {
          Swal.fire("Deleted!", "Your account has been deleted.", "success");
          navigate("/");
        } else {
          Swal.fire("Error", "Failed to delete account", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your account is safe :)", "error");
      }
    });
  };

  const [walletBalance, setWalletBalance] = useState(currentTourist.wallet);
  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-900"
        style={{
          backgroundImage: `url('/src/assets/mtn.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-8 backdrop-blur-lg bg-opacity-90">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-6">
                <img
                  src={currentTourist.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-purple-500"
                />
                <div className="text-left">
                  {isEditing ? (
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="mt-1 text-lg text-gray-600 p-3 border border-gray-300 rounded-md w-full"
                        />
                      )}
                    />
                  ) : (
                    <h2 className="text-4xl font-extrabold text-purple-700">
                      {currentTourist.username}
                    </h2>
                  )}
                  {errors.username && (
                    <p className="text-red-600">{errors.username.message}</p>
                  )}
                </div>
              </div>
              <button
                className="flex items-center justify-center bg-yellow-500 p-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-200"
                onClick={handleBadgeClick}
              >
                <FontAwesomeIcon
                  icon={faAward}
                  className="text-white text-5xl"
                />
              </button>
              {isBadgePopupOpen && (
                <BadgePopup
                  points={tourist.totalLoyaltyPoints}
                  onClose={handleCloseBadgePopup}
                />
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">
                  Email:
                </label>
                {isEditing ? (
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className="text-lg p-3 border border-gray-300 rounded-md"
                      />
                    )}
                  />
                ) : (
                  <p className="text-gray-800 text-lg">
                    {currentTourist.email}
                  </p>
                )}
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">
                  Mobile Number:
                </label>
                {isEditing ? (
                  <Controller
                    name="mobileNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="text-lg p-3 border border-gray-300 rounded-md"
                      />
                    )}
                  />
                ) : (
                  <p className="text-gray-800 text-lg">
                    {currentTourist.mobileNumber}
                  </p>
                )}
                {errors.mobileNumber && (
                  <p className="text-red-600">{errors.mobileNumber.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">
                  Nationality:
                </label>
                {isEditing ? (
                  <Controller
                    name="nationality"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="text-lg p-3 border border-gray-300 rounded-md"
                      />
                    )}
                  />
                ) : (
                  <p className="text-gray-800 text-lg">
                    {currentTourist.nationality}
                  </p>
                )}
                {errors.nationality && (
                  <p className="text-red-600">{errors.nationality.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">
                  Date of Birth:
                </label>
                {isEditing ? (
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="text-lg p-3 border border-gray-300 rounded-md"
                      />
                    )}
                  />
                ) : (
                  <p className="text-gray-800 text-lg">
                    {currentTourist.dateOfBirth.split("T00:00:00.000Z")}
                  </p>
                )}
                {errors.dateOfBirth && (
                  <p className="text-red-600">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">
                  Occupation:
                </label>
                {isEditing ? (
                  <Controller
                    name="Occupation"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="text-lg p-3 border border-gray-300 rounded-md"
                      />
                    )}
                  />
                ) : (
                  <p className="text-gray-800 text-lg">
                    {currentTourist.Occupation}
                  </p>
                )}
                {errors.Occupation && (
                  <p className="text-red-600">{errors.Occupation.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">
                  Points:
                </label>
                <div className="flex flex-row items-center mt-1 space-x-20">
                  {/* <p className="text-gray-800 text-lg">{currentTourist.points}</p>             lma t7ot fel database uncomment this line!!!*/}
                  <p className="text-gray-800 text-lg">
                    {currentTourist.currentLoyaltyPoints}
                  </p>
                  <button
                    onClick={handleRedeemClick}
                    className="bg-green-500 text-white text-sm py-1 px-2 rounded hover:bg-green-600 transition duration-200 -mt-2"
                  >
                    Redeem
                  </button>
                </div>

                {isRedeemPopupOpen && (
                  <RedeemPopup
                    points={currentTourist.currentLoyaltyPoints}
                    username={currentTourist.username}
                    onClose={handleCloseRedeemPopup}
                  />
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center items-center bg-purple-50 py-3 px-4 rounded-lg shadow-md border border-purple-200 max-w-md mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <label className="text-xl font-semibold text-purple-700">
                    Wallet Balance:
                  </label>
                  <p className="text-4xl font-bold text-purple-900">
                    ${currentTourist.wallet}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200 mr-auto"
              >
                Delete Account
              </button>
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={toggleEdit}
                    className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleEdit}
                  className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
                >
                  Edit Profile
                </button>
              )}

              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Log Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TouristProfile;
