import Navbar from "../components/navbarlogin";
import { useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import ImprovedSidebar from "../components/Landingsidebar";
const GuestPage = () => {
   const [content, setContent] = useState(<Dashboard/>);

    return (
        <div>
            <Navbar
                sideBarFlag={true}
            />
                <div className="flex">
      <ImprovedSidebar title={"Guest"}/>
      <div className="flex-1 p-4">
       
        
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
