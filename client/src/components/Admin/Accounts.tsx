import './Table.css';
import TouristTable from "./TouristTable"
import Admin_TourismGovernorTable from "./Admin_TourismGovernorTable"
import ImprovedSidebar from '../ImprovedSidebar';
import TourGuide_Advertiser_SellerTable from './TourGuide_Advertiser_SellerTable';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useGetAllUsers } from '../../custom_hooks/tourist';

const Accounts = () => {
    const { data } = useGetAllUsers();

    return (
    <div className="w-full flex items-center justify-center">
        <div className="w-[1500px]">
        <ImprovedSidebar title="Admin"/>
            <div className="my-8">
                <TouristTable />
            </div>
            <div className="my-8">
                <Admin_TourismGovernorTable dataG={data?.governers} dataA={data?.admins} name="Tourism Governor"/>
            </div>
            <div className="my-8">
                <Admin_TourismGovernorTable dataG={data?.governers} dataA={data?.admins} name="Admin"/>
            </div>
            <div className="my-8">
                <TourGuide_Advertiser_SellerTable dataT={data?.tourGuides} dataS={data?.sellers} dataA={data?.advertisers} name="Tour Guide"/>
            </div>
            <div className="my-8">
                <TourGuide_Advertiser_SellerTable dataT={data?.tourGuides} dataS={data?.sellers} dataA={data?.advertisers} name="Advertiser"/>
            </div>
            <div className="my-8">
                <TourGuide_Advertiser_SellerTable dataT={data?.tourGuides} dataS={data?.sellers} dataA={data?.advertisers} name="Seller"/>
            </div>
        </div>
    </div>
        
    );
}

export default Accounts;
