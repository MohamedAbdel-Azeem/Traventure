import Navbar from "../components/navbar";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/ImprovedSidebar";
import { useParams } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";

const AdminPage = () => {
  return (
    <div>
      <NewNavbar/>
      <div
        style={{
          margin: `20px 20px 20px 100px`,
          transition: "200ms",
        }}
      >
        <Dashboard />
      </div>
    </div>
  );
};
export default AdminPage;
