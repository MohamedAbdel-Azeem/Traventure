import Navbar from "../components/navbarlogin";
import { useState } from "react";
import GuestDashboard from "../components/Admin/GuestDashboard";
import ImprovedSidebar from "../components/Landingsidebar";
import CurrencyDropdown from "./currencyDrop";
const GuestPage = () => {
   const [content, setContent] = useState(<GuestDashboard/>);

    return (
        <div>
            <Navbar
                sideBarFlag={true}
            />
                <div className="flex">
      <ImprovedSidebar title={"Guest"}/>
      <div className="flex-1 p-4">
      <CurrencyDropdown />
       
        
      </div>
    </div>

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
export default GuestPage;
