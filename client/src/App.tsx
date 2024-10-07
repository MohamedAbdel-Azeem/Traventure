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
// import ItineraryDetailsTourist from "./components/ItineraryDetailsTourist";
// import MoreItineraries from "./components/Mor/eItineraries";
// import MorePlaces from "./components/MorePlaces";
import Itineraries from "./components/Itineraries";


function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/:username" element={<AdminPage />} />
          <Route path="/admin/:username/users" element={<Accounts />} />
          <Route path="/admin/:username/shop" element={<ShopPage type="Admin"/>} />
          {/* <Route path="/admin/:username/locations" element={<MorePlaces />} /> */}
          <Route path="/tourist/:username" element={<TouristPage />} />
          <Route path="/tourist/:username/shop" element={<ShopPage type="Tourist" />} />
          {/* <Route path="/tourist/:username/locations" element={<MorePlaces />} /> */}
          {/* <Route path="/tourist/:username/itineraries" element={<MoreItineraries />} /> */}
          <Route path="/tourismgovernor/:username" element={<TourismGovernorPage />} />
          {/* <Route path="/tourismgovernor/:username/historicaltags" element={<HistoricalTags />} /> */}
          <Route path="/tourismgovernor/:username/locations" element={<Locations />} />
          <Route path="/tourismgovernor/:username/categoriesandtags" element={<CT />} />
          <Route path="/advertiser/:username" element={<AdvertiserPage />} />
          {/* <Route path="/advertiser/:username/locations" element={<MorePlaces />} /> */}
          <Route path="/advertiser/:username/activities" element={<Activities />} />
          <Route path="/tourguide/:username" element={<TourGuidePage />} />
          {/* <Route path="/tourguide/:username/locations" element={<MorePlaces />} /> */}
          <Route path="/tourguide/:username/itineraries" element={<TourGuidePage />} />
          <Route path="/seller/:username" element={<ShopPage type="Seller" />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/touristprofile/:username" element={<Tourist_Profile />} />
          <Route path="/sellerprofile/:username" element={<Seller_Profile />} />
          <Route path="/tourguideprofile/:username" element={<TourGuide_Profile />} />
          <Route path="/advertiserprofile/:username" element={<Advertiser_Profile />} />
          <Route path="/itinerary/:username" element={<ItineraryDetails />} />
          {/* <Route path="/tourist-itinerary/:username" element={<ItineraryDetailsTourist />} /> */}
          {/* <Route path="/more-itineraries" element={<MoreItineraries />} /> */}
          {/* <Route path="/more-places" element={<MorePlaces />} /> */}
          <Route path="/itinerary/:username" element={<ItineraryDetails />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;