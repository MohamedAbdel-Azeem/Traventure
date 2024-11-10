import { Routes, Route } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";
import ShopPage from "../components/ShopPage";
import { SellerSalesPage } from "../pages/SellerSalesPage";
import { Seller_Profile } from "../routes/_app/seller_profile/seller-profile-main";
import CurrencyDropdown from "../components/currencyDrop";

export default function SellerRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <CurrencyDropdown />
      <Routes>
        <Route path="/:username" element={<ShopPage type="Seller" />} />
        <Route path="/:username/sales" element={<SellerSalesPage />} />
        <Route path="/:username/profile" element={<Seller_Profile />} />
      </Routes>
    </div>
  );
}
