import Navbar from "../components/navbar";
import ImprovedSidebar from "../components/ImprovedSidebar";
import Itineraries from "../components/Itineraries";
import NewNavbar from "../components/NewNavbar";

const TourGuidePage = () => {
    return (
        <div>
           
            <NewNavbar/>
            <div
                style={{
                  
                    transition: "200ms",
                }}>
                <h1 style={{ fontSize: '2.5em' }}>My Itineraries</h1>
                <Itineraries />
            </div>
        </div>
    );
};
export default TourGuidePage;