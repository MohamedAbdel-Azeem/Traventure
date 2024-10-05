import { useState } from "react";
import TouristProfile from "./tourist_profile"
import readTouristProfile from "../../../custom_hooks/readTouristProfile";
import { TouristProfileData } from "./tourist_profile_data";


export const Tourist_Profile = () => {
    // add calling the custom hook for data here
    // const [userData, setUserData] = useState({
    //     username: 'MinaAhmed21',
    //     email: 'mina@gmail.com',
    //     mobileNumber: '+201186948329',
    //     nationality: 'American',
    //     dob: '1990-05-15',
    //     occupation: 'Photographer',
    //     profilePicture: 'src/assets/t2.jpg',
    //     wallet: 456,
    //     password: '123456'
    //   });
    console.log("Hamada in Tourist_profile");
    const {user, loading, error} =  readTouristProfile('testLog');
    //const userData = userprofile as TouristProfileData;
    console.log("userData: ", user);
    // console.log("Hamada in Tourist_profile2");
    if(loading) return <div>Loading...</div>
    return (
        <TouristProfile tourist={user as TouristProfileData}>

        </TouristProfile>
    )
} 
