import { useParams } from "react-router-dom";
import { useAuth } from "../../../custom_hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";

const TourismGovernorPage = () => {
  const { isAuthenticated, isLoading, isError } = useAuth(5);
  const { username } = useParams<{ username: string }>();
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

  return <div></div>;
};

export default TourismGovernorPage;
