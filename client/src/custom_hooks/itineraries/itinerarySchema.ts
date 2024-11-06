import IActivity from "../activities/activity_interface";
import Place from "../places/place_interface";
import { TouristProfileData } from "../../routes/_app/tourist_profile/tourist_profile_data";


interface TagStructure {
  _id: string;
  name: string;
  __v: number;
}


interface Itinerary {
  map(
    arg0: (card: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  _id: string;
  main_Picture?: string;
  title: string;
  description: string;
  added_By: string;
  price: number;
  starting_Date: string;
  ending_Date: string;
  rating: number;
  total: number;
  language: string;
  selectedTags?: TagStructure[];
  pickup_location: { longitude: number; latitude: number };
  dropoff_location: { longitude: number; latitude: number };
  plan: {
    place?: Place;
    activities: {
      activity_id?: IActivity;
      activity_duration: number;
      time_unit: string;
    }[];
  }[];
  booked_By: {
    user_id?: TouristProfileData;
  }[];
  accesibility: boolean;
  bookingActivated: boolean;
  inappropriate: boolean;
}

export default Itinerary;
