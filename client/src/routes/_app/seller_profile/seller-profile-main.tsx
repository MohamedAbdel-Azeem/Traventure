import { useState } from "react";
import SellerProfile from "./seller_profile"



export const Seller_Profile = () => {
    // add calling the custom hook for data here
    const [userData, setUserData] = useState({
        username: 'MinaAhmed21',
        email: 'mina@gmail.com',
        password: '123456',
        name: 'Mina',
        description: 'I am a seller tarsh',
        isAccepted: true
      });
    return (
        <SellerProfile seller={userData}>

        </SellerProfile>
    )
} 


