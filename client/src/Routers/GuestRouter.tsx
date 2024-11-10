import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";
import GuestMoreActivities from "../components/GuestMoreActivities";
import GuestMoreItineraries from "../components/GuestMoreItineraries";
import GuestMorePlaces from "../components/GuestMorePlaces";
import GuestPage from "../components/GuestPage";
import GuestShop from "../components/GuestShop";
import CurrencyDropdown from "../components/currencyDrop";

export default function GuestRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <CurrencyDropdown />
      <Routes>
        <Route path="/guest-page" element={<GuestPage />} />
        <Route path="/more-itineraries" element={<GuestMoreItineraries />} />
        <Route path="/more-places" element={<GuestMorePlaces />} />
        <Route path="/more-activities" element={<GuestMoreActivities />} />
        <Route path="/shop" element={<GuestShop type={"Tourist"} />} />
      </Routes>
    </div>
  );
}
