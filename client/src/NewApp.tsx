import React from "react";
import axios, { AxiosError } from "axios";
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
  
  // Combine all interfaces into a single type to represent the full structure
  interface DataStructure {
    advertisers: Advertiser[];
    sellers: Seller[];
    tourGuides: TourGuide[];
    tourists: Tourist[];
    admins: Admin[];
  }
const fetch_testing = () => {
    const [data, setData] = React.useState<DataStructure | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/traventure/api/admin/all", {
                    params: {
                        username: "SeifTarek",
                    }
                });
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
}
const NewApp =()=>{
    const { data, loading, error } = fetch_testing();

    return ( 
    <div>
        {data?.advertisers?.map(
            request => (
            <div key="request">
                {request.username}
            </div>
            ))}
    </div>
    );
}
 
export default NewApp;