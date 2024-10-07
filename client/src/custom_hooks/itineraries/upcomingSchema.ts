import IActivity from "../activities/activity_interface";
import Place from "../places/place_interface";
import Itinerary from "./itinerarySchema";

export interface upcoming{
    itineraries: Itinerary[];
    activities: IActivity[];
    places: Place[];
}