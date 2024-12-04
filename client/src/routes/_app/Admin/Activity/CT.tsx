import ClipLoader from "react-spinners/ClipLoader";
import CategoryTable from "./CategoryTable";
import TagTable from "./TagTable";
import { useAuth } from "../../../../custom_hooks/auth";
import { useParams } from "react-router-dom";

const CT = () => {
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
        <div>
            <div className="flex flex-col mb-[20px]">
            <CategoryTable/>
            <TagTable/>
            </div>
        </div>
     );
}
 
export default CT;