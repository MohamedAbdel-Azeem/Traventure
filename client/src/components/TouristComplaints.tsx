import ImprovedSidebar from "../components/ImprovedSidebar";
import ComplaintsTable from "../components/Admin/ComplaintsTable";  
import NewNavbar from "./NewNavbar";

const TouristComplaints = () => {
    return ( 
        <div>
            <NewNavbar/>
            <ComplaintsTable/>
        </div>
     );
}
 
export default TouristComplaints;