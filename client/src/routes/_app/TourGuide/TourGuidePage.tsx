import { useParams } from "react-router-dom";
import { useAuth } from "../../../custom_hooks/auth";
import Itineraries from "./tourguide_Itinerary/Itineraries";
import ClipLoader from "react-spinners/ClipLoader";

const TourGuidePage = () => {
  const { isAuthenticated, isLoading, isError } = useAuth(2);
  const { username } = useParams<{ username: string }>();
    if (isLoading) {
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <ClipLoader color="#f86c6b" loading={true} size={150} />
          </div>
        );
      }
      if (isError || isAuthenticated !== username) {
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <h1>Error 403 Unauthrized access</h1>
          </div>
        );
      }
  return (
    <div>
      <div
        style={{
          transition: "200ms",
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>My Itineraries</h1>
        <Itineraries />
      </div>
    </div>
  );
};
export default TourGuidePage;
