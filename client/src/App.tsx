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

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/admin/:id" element={<AdminPage />} />
          <Route path="/tourguide/:username" element={<TourGuidePage />} />
          <Route path="/tourismgovernor" element={<TourismGovernorPage />} />
          <Route path="/advertiser" element={<AdvertiserPage />} />
          <Route path="/tourist/:id" element={<TouristPage />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/admin-users" element={<Accounts />} />
          <Route path="/admin/shop" element={<ShopPage type="Admin" />} />
          <Route path="/tourist/shop" element={<ShopPage type="Tourist" />} />
          <Route path="/seller/shop" element={<ShopPage type="Seller" />} />
          <Route path="/tourismgovernor/locations" element={<Locations />} />
          <Route path="/admin-locations" element={<Locations />} />
          <Route path="/advertiser/activities" element={<Activities />} />
          <Route path="/itineraries" element={<Accounts />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/touristprofile" element={<Tourist_Profile />} />
          <Route path="/sellerprofile/:username" element={<Seller_Profile />} />
          <Route
            path="/tourguideprofile/:username"
            element={<TourGuide_Profile />}
          />
          <Route
            path="/advertiserprofile/:username"
            element={<Advertiser_Profile />}
          />
          <Route path="/CategoriesandTags" element={<CT />} />
          <Route path="/itinerary/:id" element={<ItineraryDetails />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
