import { Routes, Route, Navigate } from "react-router-dom";
import MorePlaces from "../components/Locations/MorePlaces";
import { TourGuide_Profile } from "../routes/_app/TourGuide/tourguide_profile/tourguide-profile-main";
import TourGuidePage from "../routes/_app/TourGuide/TourGuidePage";
import CurrencyDropdown from "../components/currencyDrop";
import NewNavbar from "../components/Navbar/NewNavbar";
import ItineraryDetails from "../routes/_app/TourGuide/tourguide_Itinerary/ItineraryDetails";
import {isAccessTokenPresent} from "../components/Protection/authUtils";

export default function TourGuideRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={isAccessTokenPresent() ?<TourGuidePage />:<Navigate to="/" />} />
        <Route path="/:username/locations" element={isAccessTokenPresent() ?<MorePlaces />:<Navigate to="/" />} />
        <Route path="/:username/itineraries" element={isAccessTokenPresent() ?<TourGuidePage />:<Navigate to="/" />} />
        <Route path="/:username/itineraries/itinerary/:id" element={isAccessTokenPresent() ?<ItineraryDetails/>:<Navigate to="/" />}/>
        <Route path="/:username/profile" element={isAccessTokenPresent() ?<TourGuide_Profile />:<Navigate to="/" />} />
      </Routes>
      <CurrencyDropdown />
    </div>
  );
}
