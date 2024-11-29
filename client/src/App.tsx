import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import SignIn from "./routes/sign-in/sign-in";
import Register from "./routes/sign-up/sign-up";
import LandingPage from "./routes/_app/Landing_page/LandingPage";
import TermsAndConditions from "./routes/_app/terms_and_conditions/terms_and_conditions";
import AdminRouter from "./Routers/AdminRouter";
import TouristRouter from "./Routers/TouristRouter";
import TourismGovernorRouter from "./Routers/TourismGovernorRouter";
import AdvertiserRouter from "./Routers/AdvertiserRouter";
import TourGuideRouter from "./Routers/TourGuideRouter";
import SellerRouter from "./Routers/SellerRouter";
import GuestRouter from "./Routers/GuestRouter";

import promocode_function from "../../server/utils/functions/promo_code_function";
function App() {

    promocode_function();
   return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          {/* Admin */}
          <Route path="/admin/*" element={<AdminRouter />} />
          {/* Tourist */}
          <Route path="/tourist/*" element={<TouristRouter />} />
          {/* Tourism Governor */}
          <Route path="/tourismgovernor/*" element={<TourismGovernorRouter />} />
          {/* Advertiser */}
          <Route path="/advertiser/*" element={<AdvertiserRouter />} />
          {/* Tour Guide */}
          <Route path="/tourguide/*" element={<TourGuideRouter />} />
          {/* Seller */}
          <Route path="/seller/*" element={<SellerRouter />} />
          {/* Guest */}
          <Route path="/guest/*" element={<GuestRouter />} />
          {/* Extra */}
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
