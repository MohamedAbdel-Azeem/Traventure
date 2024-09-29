import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Accounts from "./components/Admin/Accounts"
import NewApp from "./NewApp";
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
        <Route path="/sellerpage" element={<SellerPage />} />
        <Route path="/admin/users" element={<Accounts />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/activities" element={<Accounts />} />
        <Route path="/itineraries" element={<Accounts />} />
        <Route path="/" element={<NewApp />} />
        <Route path="/Tourists" element={<Accounts />} />
        <Route path="/Categories" element={<CategoryTable />} />
         
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
