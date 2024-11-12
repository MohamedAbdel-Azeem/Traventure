import { Routes, Route } from "react-router-dom";
import ShopPage from "../components/Shop/ShopPage";
import CurrencyDropdown from "../components/currencyDrop";
import NewNavbar from "../components/Navbar/NewNavbar";
import { SellerSalesPage } from "../routes/_app/Seller/seller_sales/SellerSalesPage";
import { Seller_Profile } from "../routes/_app/Seller/seller_profile/seller-profile-main";

export default function SellerRouter() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NewNavbar />
      <Routes>
        <Route path="/:username" element={<ShopPage type="Seller" />} />
        <Route path="/:username/sales" element={<SellerSalesPage />} />
        <Route path="/:username/profile" element={<Seller_Profile />} />
      </Routes>
      <CurrencyDropdown />
    </div>
  );
}
