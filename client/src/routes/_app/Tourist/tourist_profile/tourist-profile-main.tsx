import TouristProfile from "./tourist_profile";
import readTouristProfile from "../../../../custom_hooks/readTouristProfile";
import { TouristProfileData } from "./tourist_profile_data";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../custom_hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";

export const Tourist_Profile = () => {
  const { username } = useParams();
  const { user, loading, error } = readTouristProfile(username);
  const { isAuthenticated, isLoading, isError } = useAuth(4);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#f86c6b" loading={true} size={150} />
      </div>
    );
  }
  if (isError || isAuthenticated !== username) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Error 403 Unauthorized access</h1>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={30} color="#ffffff" />
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
