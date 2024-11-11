import CategoryTable from "./CategoryTable";
import TagTable from "./TagTable";

const CT = () => {
    return ( 
        <div>
            <div className="flex flex-col mb-[20px]">
            <CategoryTable/>
            <TagTable/>
            </div>
        </div>
     );
}
 
export default CT;