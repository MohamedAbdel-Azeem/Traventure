import Navbar from "../components/navbar";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/ImprovedSidebar";
import NewNavbar from "../components/NewNavbar";
import CurrencyDropdown from "../components/currencyDrop";
const TouristPage = () => {
    const navbarHeight = 64;

    
    return (
        <div>
              <NewNavbar />
            <CurrencyDropdown />
           
            <div
            
                style={{
                    //margin: `20px 20px 20px 100px`,
                    transition: "200ms",
                }}
            >
                <Dashboard type="Tourist"/>
            </div>
        </div>
    );
};
export default TouristPage;
