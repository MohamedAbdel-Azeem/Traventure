import Navbar from "../components/navbar";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/ImprovedSidebar";
import NewNavbar from "../components/NewNavbar";
const AdvertiserPage = () => {
   const [content, setContent] = useState(<Dashboard/>);


    return (
        <div>
            <NewNavbar/>
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

export default AdvertiserPage;
