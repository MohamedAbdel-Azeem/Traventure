import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";
import MoreItineraries from "../components/MoreItineraries";
import MorePlaces from "../components/MorePlaces";
import AdvertiserPage from "../pages/AdvertiserPage";
import { Advertiser_Profile } from "../routes/_app/advertiser_profile/advertiser_profile-main";
import { Activities } from "../routes/_app/advertiseractivity/Activities";
import CurrencyDropdown from "../components/currencyDrop";

export default function AdvertiserRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={<AdvertiserPage />} />
        <Route path="/:username/locations" element={<MorePlaces />} />
        <Route path="/:username/itineraries" element={<MoreItineraries />} />
        <Route path="/:username/activities" element={<Activities />} />
        <Route path="/:username/profile" element={<Advertiser_Profile />} />
      </Routes>

      <CurrencyDropdown />
    </div>
  );
}
