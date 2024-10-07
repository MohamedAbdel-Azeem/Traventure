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
  
  
  interface DataStructure {
    advertisers: Advertiser[];
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
