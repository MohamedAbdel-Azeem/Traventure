import axios from "axios";
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


export const createActivity = async (ausername:string ,newActivity) => {
    try {
        const tempresponse = await axios.get<DataStructure>("/traventure/api/admin/all", {
            params: {
              username: "Ibra",
            },
          }) ;
        const allUsers = tempresponse.data;

        const idtoAddby = allUsers.advertisers.find(thing => thing.username === ausername);

        newActivity.added_By = idtoAddby?._id as string;

        const response = await axios.post("/traventure/api/activity/add", newActivity);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Error creating place");
        }
    } catch (error) {
        
        throw new Error(error.message || "Error creating place");
    }
};
