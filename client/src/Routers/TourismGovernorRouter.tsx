import { Routes, Route, Navigate } from "react-router-dom";
import NewNavbar from "../components/Navbar/NewNavbar";
import HistoricalTags from "../routes/_app/TourismGovernor/tourismgovernor_tags/HistoricalTags";
import Locations from "../routes/_app/TourismGovernor/tourismgovernor_locations/Locations";
import TourismGovernorPage from "../routes/_app/TourismGovernor/TourismGovernorPage";
import CurrencyDropdown from "../components/currencyDrop";
import {isAccessTokenPresent} from "../components/Protection/authUtils";

export default function TourismGovernorRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={isAccessTokenPresent() ?<TourismGovernorPage />:<Navigate to="/" />} />
        <Route path="/:username/historicaltags" element={isAccessTokenPresent() ?<HistoricalTags />:<Navigate to="/" />} />
        <Route path="/:username/locations" element={isAccessTokenPresent() ?<Locations />:<Navigate to="/" />} />
      </Routes>
      <CurrencyDropdown />
    </div>
  );
}
