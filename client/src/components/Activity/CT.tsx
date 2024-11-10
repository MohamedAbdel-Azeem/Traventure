import ImprovedSidebar from "../ImprovedSidebar";
import NewNavbar from "../NewNavbar";
import CategoryTable from "./CategoryTable";
import TagTable from "./TagTable";

const CT = () => {
    return ( 
        <div>
            <NewNavbar/>
            <div className="flex flex-col mb-[20px]">
            <CategoryTable/>
            <TagTable/>
            </div>
        </div>
     );
}
 
export default CT;