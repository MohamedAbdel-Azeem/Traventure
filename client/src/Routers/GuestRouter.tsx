import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/Navbar/NewNavbar";
import GuestMoreActivities from "../routes/_app/Guest/guest_activity/GuestMoreActivities";
import GuestMoreItineraries from "../routes/_app/Guest/guest_itinerary/GuestMoreItineraries";
import GuestMorePlaces from "../routes/_app/Guest/guest_places/GuestMorePlaces";
import GuestPage from "../routes/_app/Guest/GuestPage";
import GuestShop from "../routes/_app/Guest/guest_shop/GuestShop";
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
