import { Routes, Route } from "react-router-dom";
import MorePlaces from "../components/Locations/MorePlaces";
import { TourGuide_Profile } from "../routes/_app/TourGuide/tourguide_profile/tourguide-profile-main";
import TourGuidePage from "../routes/_app/TourGuide/TourGuidePage";
import CurrencyDropdown from "../components/currencyDrop";
import NewNavbar from "../components/Navbar/NewNavbar";

export default function TourGuideRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <CurrencyDropdown />
      <Routes>
        <Route path="/:username" element={<TourGuidePage />} />
        <Route path="/:username/locations" element={<MorePlaces />} />
        <Route path="/:username/itineraries" element={<TourGuidePage />} />
        <Route path="/:username/profile" element={<TourGuide_Profile />} />
      </Routes>
    </div>
  );
}
