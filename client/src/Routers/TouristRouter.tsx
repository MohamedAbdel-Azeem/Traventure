import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/Navbar/NewNavbar";
import Bookings from "../routes/_app/Tourist/tourist_bookings/Bookings";
import FlightsPage from "../routes/_app/Tourist/tourist_flights/flightsPage";
import HotelsPage from "../routes/_app/Tourist/tourist_hotels/hotelsPage";
import MoreItineraries from "../components/Itinerary/MoreItineraries";
import MorePlaces from "../components/Locations/MorePlaces";
import ShopPage from "../components/Shop/ShopPage";
import TouristPage from "../routes/_app/Tourist/TouristPage";
import { TouristPurchases } from "../routes/_app/Tourist/tourist_purchases/TouristPurchases";
import { Tourist_Profile } from "../routes/_app/Tourist/tourist_profile/tourist-profile-main";
import MoreActivities from "../components/Activities/MoreActivities";
import ComplaintsTable from "../components/users_complaints/ComplaintsTable";
import CurrencyDropdown from "../components/currencyDrop";
import ItineraryDetailsTourist from "../components/Itinerary/ItineraryDetailsTourist";
import Bookmarks from "../routes/_app/Tourist/tourist_bookmarks/Bookmarks";
import CartButton from "../components/cart/CartButton";
import { TouristWishList } from "../routes/_app/Tourist/tourist_purchases/TouristWishList";


export default function TouristRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={<TouristPage />} />
        <Route path="/:username/shop" element={<ShopPage type="Tourist" />} />
        <Route path="/:username/locations" element={<MorePlaces />} />
        <Route path="/:username/itineraries" element={<MoreItineraries />} />
        <Route
          path="/:username/itineraries/tourist-itinerary/:id"
          element={<ItineraryDetailsTourist />}
        />
        <Route path="/:username/activities" element={<MoreActivities />} />
        <Route path="/:username/complaints" element={<ComplaintsTable />} />
        <Route path="/:username/profile" element={<Tourist_Profile />} />
        <Route path="/:username/bookings" element={<Bookings />} />
        <Route path="/:username/purchases" element={<TouristPurchases />} />
        <Route path="/:username/flights" element={<FlightsPage />} />
        <Route path="/:username/hotels" element={<HotelsPage />} />
        <Route path="/:username/bookmarks" element={<Bookmarks />} />
        <Route path="/:username/wishlist" element={<TouristWishList />} />
      </Routes>
      {/* <CurrencyDropdown /> */}
      <CartButton />

    </div>
  );
}
