import { useState } from "react";
import SellerProfile from "./seller_profile";
import { ISeller } from "./ISeller";
import { useGetSeller } from "../../../../custom_hooks/sellerGetUpdate";
import { useParams } from "react-router-dom";

export const Seller_Profile = () => {
  // add calling the custom hook for data here
  const { username } = useParams();
  const { user, loading, error } = useGetSeller(username);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-600">
          Error Fetching: {error}
        </div>
      </div>
    );
  }

  if (!user)
    return (
        <div>No user found</div>
    );

  return (
      <SellerProfile seller={user as ISeller}></SellerProfile>
  );
};