import AdvertiserProfile from "./advertiser_profile";
import { useParams } from "react-router-dom";
import { useGetAdvertiser } from "../../../../custom_hooks/advertisercustomhooks";
import { IAdvertiser } from "./IAdvertiser";
import { useAuth } from "../../../../custom_hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
export const Advertiser_Profile = () => {
  // add calling the custom hook for data here
  const { username } = useParams<{ username: string }>();
  const { user, loading, error } = useGetAdvertiser(username);
  const { isAuthenticated, isLoading, isError } = useAuth(1);
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
