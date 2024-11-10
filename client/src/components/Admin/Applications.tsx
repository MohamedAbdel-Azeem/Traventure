
import ImprovedSidebar from "../ImprovedSidebar";
import NewNavbar from "../NewNavbar";
import { ApplicantTable } from "./ApplicantTable";


const Applications = () => {

    return (
      <div className="flex flex-col gap-6">
        <NewNavbar/>
        <ApplicantTable type="tourGuide" />
        <ApplicantTable type="seller" />
        <ApplicantTable type="advertiser" />
      </div>
    );
}
 
export default Applications;