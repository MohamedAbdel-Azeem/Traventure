import axios from "axios";
import Place from "./place_interface";
  
interface TourismGovernor {
    _id: string;
    username: string;
    password: string;
    __v: number;
  }
  
  interface DataStructure {
    governors: TourismGovernor[];
  }



export const createPlace = async (newCard: Place) => {
    try {
        const response = await axios.post("/traventure/api/place/add", newCard);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Error creating place");
        }
    } catch (error) {
        throw new Error(error.message || "Error creating place");
    }
};



export const createPlaceID = async (ausername:string ,newPlace) => {
    try {
        const tempresponse = await axios.get<DataStructure>("/traventure/api/admin/all", {
            params: {
              username: "Ibra",
            },
          }) ;
        const allUsers = tempresponse.data;

        const idtoAddby = allUsers.governors.find(thing => thing.username === ausername);
        newPlace.added_By = idtoAddby?._id as string;

        console.log(newPlace);
        const response = await axios.post("/traventure/api/place/add", newPlace);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Error creating place");
        }
    } catch (error) {
        
        throw new Error(error.message || "Error creating place");
    }
};