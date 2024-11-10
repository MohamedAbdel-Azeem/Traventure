import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";
import MorePlaces from "../components/MorePlaces";
import { TourGuide_Profile } from "../routes/_app/tourguide_profile/tourguide-profile-main";
import TourGuidePage from "../pages/TourGuidePage";
import CurrencyDropdown from "../components/currencyDrop";

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
