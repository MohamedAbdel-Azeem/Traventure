import TourGuideProfile from "./tourguide_profile";
import { useParams } from "react-router-dom";
import { ITourGuide } from "./ITourGuide";
import { useGetTourGuide } from "../../../../custom_hooks/tourGuideGetUpdate";

export const TourGuide_Profile = () => {
  const { username } = useParams();
  const { user, loading, error } = useGetTourGuide(username);

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
