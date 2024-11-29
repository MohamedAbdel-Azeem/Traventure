import { Routes, Route, Navigate } from "react-router-dom";
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
import {isAccessTokenPresent} from "../components/Protection/authUtils";

export default function TouristRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={isAccessTokenPresent() ?<TouristPage />:<Navigate to="/" />} />
        <Route path="/:username/shop" element={isAccessTokenPresent() ?<ShopPage type="Tourist" />:<Navigate to="/" />} />
        <Route path="/:username/locations" element={isAccessTokenPresent() ?<MorePlaces />:<Navigate to="/" />} />
        <Route path="/:username/itineraries" element={isAccessTokenPresent() ?<MoreItineraries />:<Navigate to="/" />} />
        <Route
          path="/:username/itineraries/tourist-itinerary/:id"
          element={isAccessTokenPresent() ?<ItineraryDetailsTourist />:<Navigate to="/" />}
        />
        <Route path="/:username/activities" element={isAccessTokenPresent() ?<MoreActivities />:<Navigate to="/" />} />
        <Route path="/:username/complaints" element={isAccessTokenPresent() ?<ComplaintsTable />:<Navigate to="/" />} />
        <Route path="/:username/profile" element={isAccessTokenPresent() ?<Tourist_Profile />:<Navigate to="/" />} />
        <Route path="/:username/bookings" element={isAccessTokenPresent() ?<Bookings />:<Navigate to="/" />} />
        <Route path="/:username/purchases" element={isAccessTokenPresent() ?<TouristPurchases />:<Navigate to="/" />} />
        <Route path="/:username/flights" element={isAccessTokenPresent() ?<FlightsPage />:<Navigate to="/" />} />
        <Route path="/:username/hotels" element={isAccessTokenPresent() ?<HotelsPage />:<Navigate to="/" />} />
        <Route path="/:username/bookmarks" element={isAccessTokenPresent() ?<Bookmarks />:<Navigate to="/" />} />
        <Route path="/:username/wishlist" element={isAccessTokenPresent() ?<TouristWishList />:<Navigate to="/" />} />
      </Routes>
      {/* <CurrencyDropdown /> */}
      <CartButton />
    </div>
  );
}
