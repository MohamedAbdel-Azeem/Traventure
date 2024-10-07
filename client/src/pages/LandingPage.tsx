import Navbar from "../components/navbarlogin";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/Landingsidebar";
const LandingPage = () => {
   const [content, setContent] = useState(<Dashboard/>);

    return (
        <div>
            <Navbar
                sideBarFlag={true}
            />
                <div className="flex">
      <ImprovedSidebar/>
      <div className="flex-1 p-4">
        {/* This is where you can place your main content */}
        <h1>Main Content Area</h1>
        {/* Additional components or content can go here */}
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
export default LandingPage;
