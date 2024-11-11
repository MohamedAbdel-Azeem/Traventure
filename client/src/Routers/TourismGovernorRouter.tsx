import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/Navbar/NewNavbar";
import HistoricalTags from "../routes/_app/TourismGovernor/tourismgovernor_tags/HistoricalTags";
import Locations from "../routes/_app/TourismGovernor/tourismgovernor_locations/Locations";
import TourismGovernorPage from "../routes/_app/TourismGovernor/TourismGovernorPage";
import CurrencyDropdown from "../components/currencyDrop";

export default function TourismGovernorRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={<TourismGovernorPage />} />
        <Route path="/:username/historicaltags" element={<HistoricalTags />} />
        <Route path="/:username/locations" element={<Locations />} />
      </Routes>
      {/* <CurrencyDropdown /> */}
    </div>
  );
}
