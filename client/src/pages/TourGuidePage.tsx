import Navbar from "../components/navbar";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/Admin/ImprovedSidebar";
const TourGuidePage = () => {
   const [content, setContent] = useState(<Dashboard/>);


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

export default TourGuidePage;
