import IActivity from "../activities/activity_interface";
import Place from "../places/place_interface";
import { TouristProfileData } from "../../routes/_app/tourist_profile/tourist_profile_data";

interface Itinerary {
  map(arg0: (card: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  main_Picture?: string;
  title: string;
  description: string;
  added_By: string;
  price: number;
  starting_Date: Date;
  ending_Date: Date;
  rating: number;
  total: number;
  language: string;
  pickup_location: string;
  dropoff_location: string;
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
}

export default Itinerary;
