import Navbar from "../components/navbarlogin";
import { useState } from "react";
import GuestDashboard from "../components/Admin/GuestDashboard";
import ImprovedSidebar from "../components/Landingsidebar";
import NewNavbar from "./NewNavbar";
import CurrencyDropdown from "./currencyDrop";
const GuestPage = () => {
   const [content, setContent] = useState(<GuestDashboard/>);

    return (
        <div>
            <NewNavbar/>
                <div className="flex">
      <div className="flex-1 p-4">
      <CurrencyDropdown />
       
        
      </div>
    </div>

            <div
                style={{
                    transition: "200ms",
                }}
            >
                {content}
            </div>
        </div>
    );
};
export default GuestPage;
