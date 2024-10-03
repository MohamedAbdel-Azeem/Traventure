import axios, { AxiosError } from "axios";
import React from "react";
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

interface DataStructure {
  advertisers: Advertiser[];
  sellers: Seller[];
  tourGuides: TourGuide[];
  tourists: Tourist[];
  admins: Admin[];
  governers: TourismGovernor[];
}


export const deleteUsers = async (username: string, type: string) => {
  const response = await fetch(`traventure/api/admin/delete/user/${username}/tourist`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  alert(`${username} deleted successfully.`);

};




export const useGetAllUsers = () => {
    const [data, setData] = React.useState<DataStructure | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("traventure/api/admin/all", {
            params: {
              username: "SeifTarek",
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