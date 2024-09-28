import './Table.css';
import TouristTable from "./TouristTable"
import AdminTable from "./AdminTable"
import ImprovedSidebar from './ImprovedSidebar';

const Accounts = () => {
    return (
    <div className="w-full flex items-center justify-center">
        <div className="w-[1500px]">
            <ImprovedSidebar/>
            <div className="my-8">
                <TouristTable />
            </div>
            <div className="my-8">
                <AdminTable />
            </div>
        </div>
    </div>
        
    );
}

export default Accounts;
