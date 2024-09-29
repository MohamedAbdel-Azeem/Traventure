import Navbar from "../components/navbar";
import { useState } from "react";
import ImprovedSidebar from "../components/ImprovedSidebar";
import TGoDashboard from "../components/TourismGovernor/TGoDashboard";
const TourismGovernorPage = () => {
   const [content, setContent] = useState(<TGoDashboard/>);


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
                {content}
            </div>
        </div>
    );
};

export default TourismGovernorPage;
