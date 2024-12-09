import { Routes, Route, Navigate } from "react-router-dom";
import NewNavbar from "../components/Navbar/NewNavbar";
import MoreItineraries from "../components/Itinerary/MoreItineraries";
import MorePlaces from "../components/Locations/MorePlaces";
import AdvertiserPage from "../routes/_app/Advertiser/AdvertiserPage";
import { Advertiser_Profile } from "../routes/_app/Advertiser/advertiser_profile/advertiser_profile-main";
import { Activities } from "../routes/_app/Advertiser/advertiser_activity/Activities";
import CurrencyDropdown from "../components/currencyDrop";
import ItineraryDetailsTourist from "../components/Itinerary/ItineraryDetailsTourist";
import {isAccessTokenPresent} from "../components/Protection/authUtils";
import { AdvertiserStats } from "../components/Stats/AdvertiserStats";

export default function AdvertiserRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={isAccessTokenPresent() ?<AdvertiserPage />:<Navigate to="/" />} />
        <Route path="/:username/locations" element={isAccessTokenPresent() ?<MorePlaces />:<Navigate to="/" />} />
        <Route path="/:username/itineraries" element={isAccessTokenPresent() ?<MoreItineraries />:<Navigate to="/" />} />
        <Route path="/:username/itineraries/tourist-itinerary/:id" element={isAccessTokenPresent() ?<ItineraryDetailsTourist/>:<Navigate to="/" />}/>
        <Route path="/:username/activities" element={isAccessTokenPresent() ?<Activities />:<Navigate to="/" />} />
        <Route path="/:username/profile" element={isAccessTokenPresent() ?<Advertiser_Profile />:<Navigate to="/" />} />
        <Route path="/:username/stats" element={isAccessTokenPresent() ?<AdvertiserStats />:<Navigate to="/" />} />
      </Routes>
      {/* <CurrencyDropdown /> */}
    </div>
  );
}
