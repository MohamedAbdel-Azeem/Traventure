import Navbar from "../components/navbar";
import ImprovedSidebar from "../components/ImprovedSidebar";
import TGoDashboard from "../components/TourismGovernor/TGoDashboard";
const TourismGovernorPage = () => {


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
                <TGoDashboard/>
            </div>
        </div>
    );
};

export default TourismGovernorPage;
