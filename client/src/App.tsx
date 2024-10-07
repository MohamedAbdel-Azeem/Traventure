import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Accounts from "./components/Admin/Accounts";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import TourismGovernorPage from "./pages/TourismGovernorPage";
import TourGuidePage from "./pages/TourGuidePage";
import SellerPage from "./pages/SellerPage";
import AdvertiserPage from "./pages/AdvertiserPage";
import Locations from "./components/Locations";
import TouristPage from "./pages/TouristPage";
import CategoryTable from "./components/Activity/CategoryTable";
import SignIn from "./routes/sign-in/sign-in";
import Register from "./routes/sign-up/sign-up";
import AdvertiserProfile from "./routes/_app/advertiser_profile/advertiser_profile";
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


function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/:id" element={<AdminPage />} />
          <Route path="/admin/:id/users" element={<Accounts />} />
          <Route path="/admin/:id/shop" element={<ShopPage type="Admin"/>} />
          <Route path="/admin/:id/locations" element={<MorePlaces />} />
          <Route path="/tourist/:id" element={<TouristPage />} />
          <Route path="/tourist/:id/shop" element={<ShopPage type="Tourist" />} />
          <Route path="/tourist/:id/locations" element={<MorePlaces />} />
          <Route path="/tourist/:id/itineraries" element={<MoreItineraries />} />
          <Route path="/tourismgovernor/:id" element={<TourismGovernorPage />} />
          {/* <Route path="/tourismgovernor/:id/historicaltags" element={<HistoricalTags />} /> */}
          <Route path="/tourismgovernor/:id/locations" element={<Locations />} />
          <Route path="/tourismgovernor/:id/categoriesandtags" element={<CT />} />
          <Route path="/advertiser/:id" element={<AdvertiserPage />} />
          <Route path="/advertiser/:id/locations" element={<MorePlaces />} />
          <Route path="/advertiser/:id/activities" element={<Activities />} />
          <Route path="/tourguide/:id" element={<TourGuidePage />} />
          <Route path="/tourguide/:id/locations" element={<MorePlaces />} />
          <Route path="/tourguide/:id/itineraries" element={<TourGuidePage />} />
          <Route path="/seller/:id" element={<SellerPage />} />
          <Route path="/seller/:id/shop" element={<ShopPage type="Seller" />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/touristprofile/:username" element={<Tourist_Profile />} />
          <Route path="/sellerprofile/:username" element={<Seller_Profile />} />
          <Route path="/tourguideprofile/:username" element={<TourGuide_Profile />} />
          <Route path="/advertiserprofile/:username" element={<Advertiser_Profile />} />
          <Route path="/itinerary/:id" element={<ItineraryDetails />} />
          <Route path="/tourist-itinerary/:id" element={<ItineraryDetailsTourist />} />
          <Route path="/more-itineraries" element={<MoreItineraries />} />
          <Route path="/more-places" element={<MorePlaces />} />
          <Route path="/itinerary/:id" element={<ItineraryDetails />} />
          <Route path="/tourist/:id/activities" element={<MoreActivities />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
