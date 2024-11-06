import Navbar from "../components/navbar";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/ImprovedSidebar";
import CurrencyDropdown from "../components/currencyDrop";
const TouristPage = () => {

    
    return (
        <div>
            <Navbar
                sideBarFlag={true}
            />
            <ImprovedSidebar/>

            <CurrencyDropdown />
            <div
            
                style={{
                    margin: `20px 20px 20px 100px`,
                    transition: "200ms",
                }}
            >
                <Dashboard type="Tourist"/>
            </div>
        </div>
    );
};
export default TouristPage;
