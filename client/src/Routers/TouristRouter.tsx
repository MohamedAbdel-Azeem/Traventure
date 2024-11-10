import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";
import Bookings from "../components/Bookings";
import FlightsPage from "../components/flightsPage";
import HotelsPage from "../components/hotelsPage";
import MoreItineraries from "../components/MoreItineraries";
import MorePlaces from "../components/MorePlaces";
import ShopPage from "../components/ShopPage";
import TouristPage from "../pages/TouristPage";
import { TouristPurchases } from "../pages/TouristPurchases";
import { Tourist_Profile } from "../routes/_app/tourist_profile/tourist-profile-main";
import MoreActivities from "../components/MoreActivities";
import ComplaintsTable from "../components/Admin/ComplaintsTable";
import CurrencyDropdown from "../components/currencyDrop";

export default function TouristRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <CurrencyDropdown />
      <Routes>
        <Route path="/:username" element={<TouristPage />} />
        <Route path="/:username/shop" element={<ShopPage type="Tourist" />} />
        <Route path="/:username/locations" element={<MorePlaces />} />
        <Route path="/:username/itineraries" element={<MoreItineraries />} />
        <Route path="/:username/activities" element={<MoreActivities />} />
        <Route path="/:username/complaints" element={<ComplaintsTable />} />
        <Route path="/:username/profile" element={<Tourist_Profile />} />
        <Route path="/:username/bookings" element={<Bookings />} />
        <Route path="/:username/purchases" element={<TouristPurchases />} />
        <Route path="/:username/flights" element={<FlightsPage />} />
        <Route path="/:username/hotels" element={<HotelsPage />} />
      </Routes>
    </div>
  );
}
