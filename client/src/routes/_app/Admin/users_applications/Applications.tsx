import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../../../../custom_hooks/auth";
import { ApplicantTable } from "./ApplicantTable";
import { useParams } from "react-router-dom";

const Applications = () => {
  const { isAuthenticated, isLoading, isError } = useAuth(3);
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
  return (
    <div className="flex flex-col gap-6">
      <ApplicantTable type="tourGuide" />
      <ApplicantTable type="seller" />
      <ApplicantTable type="advertiser" />
    </div>
  );
};

export default Applications;
