import { useState } from "react";
import SellerProfile from "./seller_profile"
import {ISeller} from './ISeller';
import { useGetSeller } from '../../../custom_hooks/sellerGetUpdate';

export const Seller_Profile = () => {
    // add calling the custom hook for data here
    const {user, loading, error}= useGetSeller("hdshsdo");
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error...</div>
    return (
        <SellerProfile seller={user as ISeller}>

        </SellerProfile>
    )
} 


