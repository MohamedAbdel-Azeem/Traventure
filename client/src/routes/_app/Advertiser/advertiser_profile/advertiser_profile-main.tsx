import AdvertiserProfile from "./advertiser_profile";
import { useParams } from "react-router-dom";
import { useGetAdvertiser } from "../../../../custom_hooks/advertisercustomhooks";
import { IAdvertiser } from "./IAdvertiser";
export const Advertiser_Profile = () => {
  // add calling the custom hook for data here
  const { username } = useParams();
  const { user, loading, error } = useGetAdvertiser(username);

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

  if (!user)
    return (
      <>
        <div>No user found</div>
      </>
    );

  return (
    <>
      <AdvertiserProfile advertiser={user as IAdvertiser}></AdvertiserProfile>
    </>
  );
};
