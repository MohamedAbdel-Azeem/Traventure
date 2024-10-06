import { useEffect, useState } from 'react';
import axios from 'axios';
import { TouristProfileData } from '../routes/_app/tourist_profile/tourist_profile_data';



export function usePatchUserProfile(body: object, username:string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<TouristProfileData | null>(null);

  useEffect(() => {
  const patchUserProfile = async () => {
    
    setLoading(true);
    setError(null);

    try {
      
      const response = await axios.patch(`/traventure/api/tourist/update/${username}`, body);
      console.log("data response: ", response.data);
      setResponse(response.data);
    } catch (err) {
      setError('Error updating user profile');
      throw err;
    } finally {
      setLoading(false);
    }
    
  };
  
  if (username && body) {
    patchUserProfile();
  }
}, [body, username]);

  return { response, loading, error };
};
