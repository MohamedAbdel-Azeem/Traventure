import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./routes/sign-in/sign-in";
import Register from './routes/sign-up/sign-up';
import TouristProfile from './routes/_app/tourist_profile/tourist_profile';
import SellerProfile from './routes/_app/seller_profile/seller_profile';
import TourGuideProfile from './routes/_app/tourguide_profile/tourguide_profile';
import AdvertiserProfile from './routes/_app/advertiser_profile/advertiser_profile';




const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/touristprofile" element={<TouristProfile />} />
        <Route path="/sellerprofile" element={<SellerProfile />} />
        <Route path="/tourguideprofile" element={<TourGuideProfile />} />
        <Route path="/advertiserprofile" element={<AdvertiserProfile />} />


      </Routes>
    </Router>
  );
};


export default App;
