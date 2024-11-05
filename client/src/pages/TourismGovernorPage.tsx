import Navbar from "../components/navbar";
import ImprovedSidebar from "../components/ImprovedSidebar";
import TGoDashboard from "../components/TourismGovernor/TGoDashboard";
import NewNavbar from "../components/NewNavbar";
const TourismGovernorPage = () => {


    return (
        <div>
            
           <NewNavbar/>
           <Navbar/>
            <div
                style={{
                    margin: `20px 20px 20px 100px`,
                    transition: "200ms",
                }}
            >
                <TGoDashboard/>
            </div>
        </div>
    );
};

export default TourismGovernorPage;
