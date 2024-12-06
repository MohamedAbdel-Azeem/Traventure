import { Routes, Route, Navigate } from "react-router-dom";
import CT from "../routes/_app/Admin/Activity/CT";
import Accounts from "../routes/_app/Admin/user_management/Accounts";
import Applications from "../routes/_app/Admin/users_applications/Applications";
import MoreActivities from "../components/Activities/MoreActivities";
import MoreItineraries from "../components/Itinerary/MoreItineraries";
import MorePlaces from "../components/Locations/MorePlaces";
import AdminPage from "../routes/_app/Admin/AdminPage";
import { AdminSalesPage } from "../routes/_app/Admin/admin_sales/AdminSalesPage";
import NewNavbar from "../components/Navbar/NewNavbar";
import CurrencyDropdown from "../components/currencyDrop";
import ItineraryDetailsTourist from "../components/Itinerary/ItineraryDetailsTourist";
import { isAccessTokenPresent } from "../components/Protection/authUtils";
import AdminComplaints from "../routes/_app/Admin/AdminComplaints";
import AdminShopPage from "../routes/_app/Admin/AdminShoppage";
import { AdminRevenuePage } from "../routes/_app/Admin/admin_sales/AdminRevenuePage";
import { AdminUsersNumPage } from "../routes/_app/Admin/admin_sales/AdminUsersNumPage";
import { AdminStats } from "../routes/_app/Admin/admin_sales/AdminStats";
export default function AdminRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route
          path="/:username"
          element={isAccessTokenPresent() ? <AdminPage /> : <Navigate to="/" />}
        />
        <Route
          path="/:username/sales"
          element={
            isAccessTokenPresent() ? <AdminStats /> : <Navigate to="/" />
          }
        />
        <Route
          path="/:username/users"
          element={isAccessTokenPresent() ? <Accounts /> : <Navigate to="/" />}
        />
        <Route
          path="/:username/shop"
          element={
            isAccessTokenPresent() ? <AdminShopPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/:username/locations"
          element={
            isAccessTokenPresent() ? <MorePlaces /> : <Navigate to="/" />
          }
        />
        <Route
          path="/:username/categoriesandtags"
          element={isAccessTokenPresent() ? <CT /> : <Navigate to="/" />}
        />
        <Route
          path="/:username/complaints"
          element={
            isAccessTokenPresent() ? <AdminComplaints /> : <Navigate to="/" />
          }
        />
        <Route
          path="/:username/activities"
          element={
            isAccessTokenPresent() ? <MoreActivities /> : <Navigate to="/" />
          }
        />
        <Route
          path="/:username/itineraries"
          element={
            isAccessTokenPresent() ? <MoreItineraries /> : <Navigate to="/" />
          }
        />
        <Route
          path="/:username/itineraries/tourist-itinerary/:id"
          element={
            isAccessTokenPresent() ? (
              <ItineraryDetailsTourist />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/:username/applications"
          element={
            isAccessTokenPresent() ? <Applications /> : <Navigate to="/" />
          }
        />
        <Route
          path="/:username/Revenue"
          element={
            isAccessTokenPresent() ? <AdminRevenuePage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/:username/usersstats"
          element={
            isAccessTokenPresent() ? <AdminUsersNumPage /> : <Navigate to="/" />
          }
        />
      </Routes>
      {/* <CurrencyDropdown /> */}
    </div>
  );
}
