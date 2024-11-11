import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/Navbar/NewNavbar";
import GuestMoreActivities from "../routes/_app/Guest/guest_activity/GuestMoreActivities";
import GuestMoreItineraries from "../routes/_app/Guest/guest_itinerary/GuestMoreItineraries";
import GuestMorePlaces from "../routes/_app/Guest/guest_places/GuestMorePlaces";
import GuestPage from "../routes/_app/Guest/GuestPage";
import GuestShop from "../routes/_app/Guest/guest_shop/GuestShop";
import CurrencyDropdown from "../components/currencyDrop";
import ItineraryDetailsTourist from "../components/Itinerary/ItineraryDetailsTourist";

export default function GuestRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/guest-page" element={<GuestPage />} />
        <Route path="/more-itineraries" element={<GuestMoreItineraries />} />
        <Route
          path="/:username/itineraries/tourist-itinerary/:id"
          element={<ItineraryDetailsTourist />}
        />
        <Route path="/more-places" element={<GuestMorePlaces />} />
        <Route path="/more-activities" element={<GuestMoreActivities />} />
        <Route path="/shop" element={<GuestShop type={"Tourist"} />} />
      </Routes>
      {/* <CurrencyDropdown /> */}
    </div>
  );
}
