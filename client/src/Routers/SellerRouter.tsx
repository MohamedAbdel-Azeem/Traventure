import { Routes, Route, Navigate } from "react-router-dom";
import ShopPage from "../components/Shop/ShopPage";
import CurrencyDropdown from "../components/currencyDrop";
import NewNavbar from "../components/Navbar/NewNavbar";
import { SellerSalesPage } from "../routes/_app/Seller/seller_sales/SellerSalesPage";
import { Seller_Profile } from "../routes/_app/Seller/seller_profile/seller-profile-main";
import {isAccessTokenPresent} from "../components/Protection/authUtils";
import  SellerPage from "../routes/_app/Seller/SellerPage";
export default function SellerRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={isAccessTokenPresent() ?<SellerPage/>:<Navigate to="/" />} />
        <Route path="/:username/sales" element={isAccessTokenPresent() ?<SellerSalesPage />:<Navigate to="/" />} />
        <Route path="/:username/profile" element={isAccessTokenPresent() ?<Seller_Profile />:<Navigate to="/" />} />
      </Routes>
      {/* <CurrencyDropdown /> */}
    </div>
  );
}
