import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/Navbar/NewNavbar";
import MoreItineraries from "../components/Itinerary/MoreItineraries";
import MorePlaces from "../components/Locations/MorePlaces";
import AdvertiserPage from "../routes/_app/Advertiser/AdvertiserPage";
import { Advertiser_Profile } from "../routes/_app/Advertiser/advertiser_profile/advertiser_profile-main";
import { Activities } from "../routes/_app/Advertiser/advertiser_activity/Activities";
import CurrencyDropdown from "../components/currencyDrop";
import ItineraryDetailsTourist from "../components/Itinerary/ItineraryDetailsTourist";

export default function AdvertiserRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={<AdvertiserPage />} />
        <Route path="/:username/locations" element={<MorePlaces />} />
        <Route path="/:username/itineraries" element={<MoreItineraries />} />
        <Route path="/:username/itineraries/tourist-itinerary/:id" element={<ItineraryDetailsTourist/>}/>
        <Route path="/:username/activities" element={<Activities />} />
        <Route path="/:username/profile" element={<Advertiser_Profile />} />
      </Routes>
      {/* <CurrencyDropdown /> */}
    </div>
  );
}
