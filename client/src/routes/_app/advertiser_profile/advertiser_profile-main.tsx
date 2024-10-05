import { useState } from "react";
import AdvertiserProfile from "./advertiser_profile";
import { useParams } from "react-router-dom";
import { useGetAdvertiser } from "../../../custom_hooks/advertisercustomhooks";
import { IAdvertiser } from "./IAdvertiser";
export const Advertiser_Profile = () => {
    // add calling the custom hook for data here
    const { username } = useParams();
    const { user, loading, error } = useGetAdvertiser(username);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    if (!user) return <div>No user found</div>;
return <AdvertiserProfile advertiser={user as IAdvertiser}>


</AdvertiserProfile>; 

}