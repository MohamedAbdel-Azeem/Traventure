import { useState } from "react";
import TouristProfile from "./tourist_profile"



export const Tourist_Profile = () => {
    // add calling the custom hook for data here
    const [userData, setUserData] = useState({
        username: 'MinaAhmed21',
        email: 'mina@gmail.com',
        mobileNumber: '+201186948329',
        nationality: 'American',
        dob: '1990-05-15',
        occupation: 'Photographer',
        profilePicture: 'src/assets/t2.jpg',
        wallet: 456,
        password: '123456'
      });
    return (
        <TouristProfile tourist={userData}>

        </TouristProfile>
    )
} 