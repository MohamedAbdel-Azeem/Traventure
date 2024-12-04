import ClipLoader from "react-spinners/ClipLoader";
import Dashboard from "../../../components/Dashboard";
import {useAuth } from "../../../custom_hooks/auth"
import { useParams } from "react-router-dom";
const AdminPage = () => {
  const { isAuthenticated, isLoading, isError } = useAuth(3);
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
      <div
        style={{
          margin: `20px 20px 20px 100px`,
          transition: "200ms",
        }}
      >
        <Dashboard />
      </div>
  );
};
export default AdminPage;
