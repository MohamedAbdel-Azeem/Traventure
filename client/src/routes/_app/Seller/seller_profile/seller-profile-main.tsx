import { useState } from "react";
import SellerProfile from "./seller_profile";
import { ISeller } from "./ISeller";
import { useGetSeller } from "../../../../custom_hooks/sellerGetUpdate";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../custom_hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";

export const Seller_Profile = () => {
  // add calling the custom hook for data here
  const { username } = useParams();
  const { user, loading, error } = useGetSeller(username);
  const { isAuthenticated, isLoading, isError } = useAuth(0);
    if (isLoading) {
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <ClipLoader color="#f86c6b" loading={true} size={150} />
          </div>
        );
      }
      if (isError || isAuthenticated !== username) {
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <h1>Error 403 Unauthrized access</h1>
          </div>
        );
      }
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
