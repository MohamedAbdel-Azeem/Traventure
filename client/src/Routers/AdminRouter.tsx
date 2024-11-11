import { Routes, Route } from "react-router-dom";
import CT from "../routes/_app/Admin/Activity/CT";
import Accounts from "../routes/_app/Admin/user_management/Accounts";
import Applications from "../routes/_app/Admin/users_applications/Applications";
import Complaints from "../components/users_complaints/Complaints";
import MoreActivities from "../components/Activities/MoreActivities";
import MoreItineraries from "../components/Itinerary/MoreItineraries";
import MorePlaces from "../components/Locations/MorePlaces";
import ShopPage from "../components/Shop/ShopPage";
import AdminPage from "../routes/_app/Admin/AdminPage";
import { AdminSalesPage } from "../routes/_app/Admin/admin_sales/AdminSalesPage";
import NewNavbar from "../components/Navbar/NewNavbar";
import CurrencyDropdown from "../components/currencyDrop";
import ItineraryDetailsTourist from "../components/Itinerary/ItineraryDetailsTourist";

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
        <Route path="/:username/itineraries/tourist-itinerary/:id" element={<ItineraryDetailsTourist/>}/>
        <Route path="/:username/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}
