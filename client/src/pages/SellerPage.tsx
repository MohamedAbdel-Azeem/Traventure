import Navbar from "../components/navbar";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/ImprovedSidebar";
const SellerPage = () => {


    return (
        <div>
            <Navbar
                sideBarFlag={true}
            />
            <ImprovedSidebar/>
            <div
                style={{
                    margin: `20px 20px 20px 100px`,
                    transition: "200ms",
                }}
            >
                <Dashboard/>
            </div>
        </div>
    );
};

export default SellerPage;
