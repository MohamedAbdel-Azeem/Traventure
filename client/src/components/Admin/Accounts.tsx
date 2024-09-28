import './Table.css';
import CollapsibleTable from "./ImprovedTable"
import ImprovedSidebar from './ImprovedSidebar';

const Accounts = () => {
    return (
    <div className="w-full flex items-center justify-center">
        <div className="w-[1500px]">
            <ImprovedSidebar/>
            <div className="mt-8">
                <CollapsibleTable />
            </div>
        </div>
    </div>
        
    );
}

export default Accounts;
