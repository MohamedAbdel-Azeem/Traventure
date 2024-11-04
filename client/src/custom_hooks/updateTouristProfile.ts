import { useEffect, useState } from 'react';
import axios from 'axios';
import { TouristProfileData } from '../routes/_app/tourist_profile/tourist_profile_data';




  export const patchUserProfile = async (body: object, username:string) => {
    try {
      const { data } = await axios.patch(`/traventure/api/tourist/update/${username}`, body);  
      return data;
    } catch (err) {
      return 'Error updating user profile';
    } 
  };

