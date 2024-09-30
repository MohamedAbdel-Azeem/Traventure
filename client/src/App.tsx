import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Accounts from "./components/Admin/Accounts"
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import './index.css';
import TourismGovernorPage from "./pages/TourismGovernorPage";
import TourGuidePage from "./pages/TourGuidePage";
import SellerPage from "./pages/SellerPage";
import AdvertiserPage from "./pages/AdvertiserPage";
import Locations from "./components/Locations";
import TouristPage from "./pages/TouristPage";
import CategoryTable from "./components/Activity/CategoryTable";
import SignIn from "./routes/sign-in/sign-in";
import Register from './routes/sign-up/sign-up';
import TouristProfile from './routes/_app/tourist_profile/tourist_profile';
import SellerProfile from './routes/_app/seller_profile/seller_profile';
import TourGuideProfile from './routes/_app/tourguide_profile/tourguide_profile';
import AdvertiserProfile from './routes/_app/advertiser_profile/advertiser_profile';
import ShopPage from "./components/ShopPage";



function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tourguide" element={<TourGuidePage />} />
        <Route path="/tourismgovernor" element={<TourismGovernorPage />} />
        <Route path="/advertiser" element={<AdvertiserPage />} />
        <Route path="/tourist" element={<TouristPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/admin/users" element={<Accounts />} />
        <Route path="/admin/shop" element={<ShopPage />} />
        <Route path="/tourismgovernor/locations" element={<Locations />} />
        <Route path="/activities" element={<Accounts />} />
        <Route path="/itineraries" element={<Accounts />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/touristprofile" element={<TouristProfile />} />
        <Route path="/sellerprofile" element={<SellerProfile />} />
        <Route path="/tourguideprofile" element={<TourGuideProfile />} />
        <Route path="/advertiserprofile" element={<AdvertiserProfile />} />
        <Route path="/Categories" element={<CategoryTable />} />
         
        </Routes>
      </Router>
    </MantineProvider>

  )
}


export default App;
