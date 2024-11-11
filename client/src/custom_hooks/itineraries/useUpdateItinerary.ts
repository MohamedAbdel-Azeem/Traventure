import axios from "axios";
import { TouristProfileData } from "../../routes/_app/Tourist/tourist_profile/tourist_profile_data";
import { uploadFileToStorage } from "../../firebase/firebase_storage";

interface Itinerary {
  _id: string;
  main_Picture?: object;
  title: string;
  description: string;
  added_By: {
    profilepic: string;
    username: string;
  };
  price: number;
  starting_Date: string;
  ending_Date: string;
  rating: number;
  total: number;
  language: string;
  selectedTags?: string[];
  pickup_location: { longitude: number; latitude: number };
  dropoff_location: { longitude: number; latitude: number };
  plan: {
    place: string;
    activities: {
      activity_id: string;
      activity_duration: number;
      time_unit: string;
    }[];
  }[];
  booked_By: {
    user_id?: TouristProfileData;
  }[];
  accessibility: boolean;
}


export const UseUpdateItinerary = async (
  itineraryData: Itinerary | null,
  id: string | undefined
) => {
  try {
    if (!id) return;
    if (!itineraryData) return;
  try {
    if (itineraryData.main_Picture instanceof File) {
      itineraryData = {
        ...itineraryData,
        main_Picture: await uploadFileToStorage(itineraryData.main_Picture),
      };
    }
   
  } catch (err) {
    console.log("you should kill yourself now");
    return "errorrrrrrrrrrrrrrrrrrrrrrrrrrrrr";
  }

    
    const response = await axios.patch(
      `/traventure/api/itinerary/update/${id}`,
      itineraryData
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Error creating place");
    }
  } catch (error) {
    throw new Error(error.message || "Error creating place");
  }
};
