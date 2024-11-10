import { Routes, Route } from "react-router-dom";
import CT from "../components/Activity/CT";
import Accounts from "../components/Admin/Accounts";
import Applications from "../components/Admin/Applications";
import Complaints from "../components/Admin/Complaints";
import MoreActivities from "../components/MoreActivities";
import MoreItineraries from "../components/MoreItineraries";
import MorePlaces from "../components/MorePlaces";
import ShopPage from "../components/ShopPage";
import AdminPage from "../pages/AdminPage";
import { AdminSalesPage } from "../pages/AdminSalesPage";
import NewNavbar from "../components/NewNavbar";
import CurrencyDropdown from "../components/currencyDrop";

export default function AdminRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <CurrencyDropdown />
      <Routes>
        <Route path="/:username" element={<AdminPage />} />
        <Route path="/:username/sales" element={<AdminSalesPage />} />
        <Route path="/:username/users" element={<Accounts />} />
        <Route path="/:username/shop" element={<ShopPage type="Admin" />} />
        <Route path="/:username/locations" element={<MorePlaces />} />
        <Route path="/:username/categoriesandtags" element={<CT />} />
        <Route path="/:username/complaints" element={<Complaints />} />
        <Route path="/:username/activities" element={<MoreActivities />} />
        <Route path="/:username/itineraries" element={<MoreItineraries />} />
        <Route path="/:username/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}
