import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TouristProfileData } from "./tourist_profile_data";
import { usePatchUserProfile } from "../../../custom_hooks/updateTouristProfile";

// type TouristSchemaType = {
//   username: string;
//   email: string;
//   password: string;
//   mobileNumber: string;
//   dob: string; // Adjusted to string for easier handling of dates
//   nationality: string;
//   occupation: string;
//   profilePicture: string;
//   wallet: number;
// };

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
  const response = usePatchUserProfile(apiBody, apiUsername);

  //  tourist = usePatchUserProfile(tourist, tourist.username).response as TouristProfileData;

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
    console.log("Saved data:", data);
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

  return (
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
                <p className="text-gray-800 text-lg">{currentTourist.email}</p>
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
              onClick={handleLogout}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TouristProfile;
