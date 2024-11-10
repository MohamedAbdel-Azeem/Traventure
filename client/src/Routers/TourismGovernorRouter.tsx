import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";
import HistoricalTags from "../components/HistoricalTags";
import Locations from "../components/Locations";
import TourismGovernorPage from "../pages/TourismGovernorPage";
import CurrencyDropdown from "../components/currencyDrop";

export default function TourismGovernorRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <CurrencyDropdown />
      <Routes>
        <Route path="/:username" element={<TourismGovernorPage />} />
        <Route path="/:username/historicaltags" element={<HistoricalTags />} />
        <Route path="/:username/locations" element={<Locations />} />
      </Routes>
    </div>
  );
}
