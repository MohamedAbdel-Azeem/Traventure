import Navbar from "../components/navbar";
import ImprovedSidebar from "../components/ImprovedSidebar";
import Itineraries from "../components/Itineraries";

const TourGuidePage = () => {
    return (
        <div>
            <Navbar sideBarFlag={true} />
            <ImprovedSidebar/>
            <div
                style={{
                    margin: `20px 20px 20px 100px`,
                    transition: "200ms",
                }}
            >
                <h1 style={{ fontSize: '2.5em' }}>My Itineraries</h1>
                <Itineraries />
            </div>
        </div>
    );
};
export default TourGuidePage;