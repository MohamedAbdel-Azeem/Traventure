import Navbar from "../components/navbar";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/ImprovedSidebar";
import { useParams } from "react-router-dom";

const AdminPage = () => {
  const [content, setContent] = useState(<Dashboard />);
  const { id } = useParams();
  return (
    <div>
      <Navbar sideBarFlag={true} />
      <ImprovedSidebar/>
      <div
        style={{
          margin: `20px 20px 20px 100px`,
          transition: "200ms",
        }}
      >
        {content}
      </div>
    </div>
  );
};
export default AdminPage;
