import TourGuideProfile from "./tourguide_profile";
import { useParams } from "react-router-dom";
import { ITourGuide } from "./ITourGuide";
import { useGetTourGuide } from "../../../../custom_hooks/tourGuideGetUpdate";
import { useAuth } from "../../../../custom_hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";

export const TourGuide_Profile = () => {
  const { username } = useParams();
  const { user, loading, error } = useGetTourGuide(username);
  const { isAuthenticated, isLoading, isError } = useAuth(2);
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
  if (!user)
    return (
      <>
        <div>No user found</div>
      </>
    );

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
  return <TourGuideProfile tourGuide={user as ITourGuide}></TourGuideProfile>;
};
