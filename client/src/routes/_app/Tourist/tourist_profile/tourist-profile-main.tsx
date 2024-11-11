import TouristProfile from "./tourist_profile";
import readTouristProfile from "../../../../custom_hooks/readTouristProfile";
import { TouristProfileData } from "./tourist_profile_data";
import { useParams } from "react-router-dom";

export const Tourist_Profile = () => {
  const { username } = useParams();
  const { user, loading, error } = readTouristProfile(username);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-600">
          Error Fetching: {error}
        </div>
      </div>
    );
  }

  return <TouristProfile tourist={user as TouristProfileData}></TouristProfile>;
};
