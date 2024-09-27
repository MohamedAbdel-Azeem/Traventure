import './Table.css';
import CollapsibleTable from "./ImprovedTable"
import ImprovedSidebar from './ImprovedSidebar';

const Tourists = () => {
    return (
    <div className="w-full flex items-center justify-center">
        <div className="w-[1500px]">
        <ImprovedSidebar/>
            <CollapsibleTable />
        </div>
    </div>
        
    );
}

export default Tourists;
