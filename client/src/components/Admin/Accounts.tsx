import './Table.css';
import TouristTable from "./TouristTable"
import Admin_TourismGovernorTable from "./Admin_TourismGovernorTable"
import ImprovedSidebar from '../ImprovedSidebar';
import TourGuide_Advertiser_SellerTable from './TourGuide_Advertiser_SellerTable';

const Accounts = () => {


    const TGCredentials = [
        { username: 'Naefu', password: 'randomPassword123', email: 'man1@example.com' },
        { username: 'TGJohnDoe1', password: 'password123', email: 'ma2@example.com' },
        { username: 'TGJaneDoe2', password: 'password4562', email: 'man3@example.com' },
        { username: 'TGJaneDoe3', password: 'password4563', email: 'man4@example.com' },
        { username: 'TGJaneDoe4', password: 'password4564', email: 'man5@example.com' },
        { username: 'TGJaneDoe5', password: 'password4565', email: 'man6@example.com' },
        { username: 'TGJaneDoe6', password: 'password4566', email: 'man7@example.com' },
        { username: 'TGJaneDoe7', password: 'password4567', email: 'man8@example.com' },
      ];

      const AdvCredentials = [
        { username: 'Naefu', password: 'randomPassword123', email: 'man1@example.com' },
        { username: 'AJohnDoe1', password: 'password123', email: 'ma2@example.com' },
        { username: 'AJaneDoe2', password: 'password4562', email: 'man3@example.com' },
        { username: 'AJaneDoe3', password: 'password4563', email: 'man4@example.com' },
        { username: 'AJaneDoe4', password: 'password4564', email: 'man5@example.com' },
        { username: 'AJaneDoe5', password: 'password4565', email: 'man6@example.com' },
        { username: 'AJaneDoe6', password: 'password4566', email: 'man7@example.com' },
        { username: 'AJaneDoe7', password: 'password4567', email: 'man8@example.com' },
      ];

      const SellerCredentials = [
        { username: 'Naefu', password: 'randomPassword123', email: 'man1@example.com' },
        { username: 'SJohnDoe1', password: 'password123', email: 'ma2@example.com' },
        { username: 'SJaneDoe2', password: 'password4562', email: 'man3@example.com' },
        { username: 'SJaneDoe3', password: 'password4563', email: 'man4@example.com' },
        { username: 'SJaneDoe4', password: 'password4564', email: 'man5@example.com' },
        { username: 'SJaneDoe5', password: 'password4565', email: 'man6@example.com' },
        { username: 'SJaneDoe6', password: 'password4566', email: 'man7@example.com' },
        { username: 'SJaneDoe7', password: 'password4567', email: 'man8@example.com' },
      ];

      const AdminuserCredentials = [
        { username: 'ANaefu', password: 'randomPassword123' },
        { username: 'AJohnDoe1', password: 'password123' },
        { username: 'AJaneDoe2', password: 'password4562' },
        { username: 'AJaneDoe3', password: 'password4563' },
        { username: 'AJaneDoe4', password: 'password4564' },
        { username: 'AJaneDoe5', password: 'password4565' },
        { username: 'AJaneDoe6', password: 'password4566' },
        { username: 'AJaneDoe7', password: 'password4567' },
      ];
      const TGouserCredentials = [
        { username: 'ANaefu', password: 'randomPassword123' },
        { username: 'AJohnDoe1', password: 'password123' },
        { username: 'AJaneDoe2', password: 'password4562' },
        { username: 'AJaneDoe3', password: 'password4563' },
        { username: 'AJaneDoe4', password: 'password4564' },
        { username: 'AJaneDoe5', password: 'password4565' },
        { username: 'AJaneDoe6', password: 'password4566' },
        { username: 'AJaneDoe7', password: 'password4567' },
      ];



    return (
    <div className="w-full flex items-center justify-center">
        <div className="w-[1500px]">
            <ImprovedSidebar/>
            <div className="my-8">
                <TouristTable />
            </div>
            <div className="my-8">
                <Admin_TourismGovernorTable data={TGouserCredentials} name="Tourism Governor"/>
            </div>
            <div className="my-8">
                <Admin_TourismGovernorTable data={AdminuserCredentials} name="Admin"/>
            </div>
            <div className="my-8">
                <TourGuide_Advertiser_SellerTable data={TGCredentials} name="Tour Guide"/>
            </div>
            <div className="my-8">
                <TourGuide_Advertiser_SellerTable data={AdvCredentials} name="Advertiser"/>
            </div>
            <div className="my-8">
                <TourGuide_Advertiser_SellerTable data={SellerCredentials} name="Seller"/>
            </div>
        </div>
    </div>
        
    );
}

export default Accounts;
