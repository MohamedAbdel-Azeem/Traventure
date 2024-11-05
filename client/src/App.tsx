import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Accounts from "./components/Admin/Accounts";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import TourismGovernorPage from "./pages/TourismGovernorPage";
import TourGuidePage from "./pages/TourGuidePage";
import AdvertiserPage from "./pages/AdvertiserPage";
import Locations from "./components/Locations";
import TouristPage from "./pages/TouristPage";
import SignIn from "./routes/sign-in/sign-in";
import Register from "./routes/sign-up/sign-up";
import ShopPage from "./components/ShopPage";
import { Activities } from "./routes/_app/advertiseractivity/Activities";
import CT from "./components/Activity/CT";
import ItineraryDetails from "./components/ItineraryDetails";
import { Tourist_Profile } from "./routes/_app/tourist_profile/tourist-profile-main";
import { Seller_Profile } from "./routes/_app/seller_profile/seller-profile-main";
import { Advertiser_Profile } from "./routes/_app/advertiser_profile/advertiser_profile-main";
import LandingPage from "./pages/LandingPage";
import { TourGuide_Profile } from "./routes/_app/tourguide_profile/tourguide-profile-main";
import ItineraryDetailsTourist from "./components/ItineraryDetailsTourist";
import MoreItineraries from "./components/MoreItineraries";
import MorePlaces from "./components/MorePlaces";
import Itineraries from "./components/Itineraries";
import MoreActivities from "./components/MoreActivities";
import GuestPage from "./components/GuestPage";
import GuestMoreItineraries from "./components/GuestMoreItineraries";
import GuestMorePlaces from "./components/GuestMorePlaces";
import GuestMoreActivities from "./components/GuestMoreActivities";
import GuestShop from "./components/GuestShop";
import HistoricalTags from "./components/HistoricalTags";
import Complaints from "./components/Admin/Complaints";
import Bookings from "./components/Bookings";
import TouristComplaints from "./components/TouristComplaints";
import ImprovedCreateItinerary from "./components/ImprovedCreateItinerary";
import { SellerSalesPage } from "./pages/SellerSalesPage";
import { AdminSalesPage } from "./pages/AdminSalesPage";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/test" element={<ImprovedCreateItinerary />} />
          <Route path="/register" element={<Register />} />
          {/* Admin */}
          <Route path="/admin/:username" element={<AdminPage />} />
          <Route path="/admin/:username/users" element={<Accounts />} />
          <Route
            path="/admin/:username/shop"
            element={<ShopPage type="Admin" />}
          />
          <Route path="/admin/:username/sales" element={<AdminSalesPage />} />
          <Route path="/admin/:username/locations" element={<MorePlaces />} />
          <Route path="/admin/:username/categoriesandtags" element={<CT />} />
          <Route path="/admin/:username/complaints" element={<Complaints />} />
          <Route
            path="/admin/:username/activities"
            element={<MoreActivities />}
          />
          <Route
            path="/admin/:username/itineraries"
            element={<MoreItineraries />}
          />
          {/* Tourist */}
          <Route path="/tourist/:username" element={<TouristPage />} />
          <Route
            path="/tourist/:username/shop"
            element={<ShopPage type="Tourist" />}
          />
          <Route path="/tourist/:username/locations" element={<MorePlaces />} />
          <Route
            path="/tourist/:username/itineraries"
            element={<MoreItineraries />}
          />
          <Route
            path="/tourist/:username/complaints"
            element={<TouristComplaints />}
          />
          {/* Tourism Governor */}
          <Route
            path="/tourismgovernor/:username"
            element={<TourismGovernorPage />}
          />
          <Route
            path="/tourismgovernor/:username/historicaltags"
            element={<HistoricalTags />}
          />
          <Route
            path="/tourismgovernor/:username/locations"
            element={<Locations />}
          />
          {/* Advertiser */}
          <Route path="/advertiser/:username" element={<AdvertiserPage />} />
          <Route
            path="/advertiser/:username/locations"
            element={<MorePlaces />}
          />
          <Route
            path="/advertiser/:username/activities"
            element={<Activities />}
          />
          {/* Tour Guide */}
          <Route path="/tourguide/:username" element={<TourGuidePage />} />
          <Route
            path="/tourguide/:username/locations"
            element={<MorePlaces />}
          />
          <Route
            path="/tourguide/:username/itineraries"
            element={<TourGuidePage />}
          />
          {/* Seller */}
          <Route
            path="/seller/:username"
            element={<ShopPage type="Seller" />}
          />
          <Route path="/seller/sales/:username" element={<SellerSalesPage />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route
            path="/touristprofile/:username"
            element={<Tourist_Profile />}
          />
          <Route path="/sellerprofile/:username" element={<Seller_Profile />} />
          <Route
            path="/tourguideprofile/:username"
            element={<TourGuide_Profile />}
          />
          <Route
            path="/advertiserprofile/:username"
            element={<Advertiser_Profile />}
          />
          <Route path="/itinerary/:id" element={<ItineraryDetails />} />
          <Route
            path="/tourist-itinerary/:username"
            element={<ItineraryDetailsTourist />}
          />
          <Route path="/more-itineraries" element={<MoreItineraries />} />
          <Route path="/tourist/:id/activities" element={<MoreActivities />} />
          {/* Guest */}
          <Route path="/guest-page" element={<GuestPage />} />
          <Route
            path="/guest/more-itineraries"
            element={<GuestMoreItineraries />}
          />
          <Route path="/guest/more-places" element={<GuestMorePlaces />} />
          <Route
            path="/guest/more-activities"
            element={<GuestMoreActivities />}
          />
          <Route path="/guest/shop" element={<GuestShop type={"Tourist"} />} />
          <Route path="/tourist/:username/bookings" element={<Bookings />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
