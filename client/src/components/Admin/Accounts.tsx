import './Table.css';
import TouristTable from "./TouristTable"
import Admin_TourismGovernorTable from "./Admin_TourismGovernorTable"
import ImprovedSidebar from '../ImprovedSidebar';
import TourGuide_Advertiser_SellerTable from './TourGuide_Advertiser_SellerTable';
import axios, { AxiosError } from 'axios';
import React from 'react';





interface Advertiser {
  _id: string;
  username: string;
  email: string;
  password: string; // Note: It's best not to expose passwords in a real app
  isAccepted: boolean;
  __v: number;
  hotline: string;
  websiteLink: string;
}

// Seller interface
interface Seller {
  _id: string;
  username: string;
  email: string;
  password: string; // Note: It's best not to expose passwords in a real app
  isAccepted: boolean;
  __v: number;
  description?: string; // Optional field
  name?: string; // Optional field
}

// Tour Guide interface
interface TourGuide {
  _id: string;
  username: string;
  email: string;
  password: string; // Note: It's best not to expose passwords in a real app
  isAccepted: boolean;
  previousWork: any[]; // Assuming this could be an array of any type
  __v: number;
  mobileNumber: string;
  yearsOfExperience: number;
}

// Tourist interface
interface Tourist {
  _id: string;
  username: string;
  email: string;
  password: string; // Note: It's best not to expose passwords in a real app
  mobileNumber: string;
  dateOfBirth: string; // ISO date string
  nationality: string;
  Occupation: string; // It's better to use camelCase for consistency
  __v: number;
}

// Admin interface
interface Admin {
  _id: string;
  username: string;
  password: string; // Note: It's best not to expose passwords in a real app
  __v: number;
}


interface TourismGovernor {
  _id: string;
  username: string;
  password: string; // Note: It's best not to expose passwords in a real app
  __v: number;
}

// Combine all interfaces into a single type to represent the full structure
interface DataStructure {
  advertisers: Advertiser[];
  sellers: Seller[];
  tourGuides: TourGuide[];
  tourists: Tourist[];
  admins: Admin[];
  governers: TourismGovernor[];
}


const fetch_testing = () => {
  const [data, setData] = React.useState<DataStructure | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("traventure/api/admin/all", {
          params: {
            username: "Ibra",
          },
        });
        
        // Assuming the response data structure is correct and contains a 'tourists' array
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        const axiosError = error as AxiosError;
        setError(axiosError.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};






const Accounts = () => {
    const { data } = fetch_testing();

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
