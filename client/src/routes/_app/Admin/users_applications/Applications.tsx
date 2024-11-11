
import { ApplicantTable } from "./ApplicantTable";


const Applications = () => {

    return (
      <div className="flex flex-col gap-6">
        <ApplicantTable type="tourGuide" />
        <ApplicantTable type="seller" />
        <ApplicantTable type="advertiser" />
      </div>
    );
}
 
export default Applications;