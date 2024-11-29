import axios, { AxiosError } from "axios";
import React from "react";
interface Advertiser {
  _id: string;
  username: string;
  email: string;
  password: string;
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
  password: string;
  isAccepted: boolean;
  __v: number;
  description?: string;
  name?: string;
}

// Tour Guide interface
interface TourGuide {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAccepted: boolean;
  previousWork: any[];
  __v: number;
  mobileNumber: string;
  yearsOfExperience: number;
}

// Tourist interface
interface Tourist {
  _id: string;
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  dateOfBirth: string;
  nationality: string;
  Occupation: string;
  __v: number;
}

// Admin interface
interface Admin {
  _id: string;
  username: string;
  password: string;
  __v: number;
}

interface TourismGovernor {
  _id: string;
  username: string;
  password: string;
  __v: number;
}

interface DataStructure {
  advertisers: Advertiser[];
  sellers: Seller[];
  tourGuides: TourGuide[];
  tourists: Tourist[];
  admins: Admin[];
  governors: TourismGovernor[];
}


export const deleteUsers = async (username: string, type: string) => {
  const response = await fetch(`/traventure/api/admin/delete/user/${username}/tourist`, {
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
          const response = await axios.get("/traventure/api/admin/all", {
            params: {
              username: "SeifTarek",
            },
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
      console.log(data);
    }, []);
  
    return { data, loading, error };
  };