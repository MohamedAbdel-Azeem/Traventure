import { useEffect, useState } from 'react';
import axios from 'axios';
import { TouristProfileData } from '../routes/_app/tourist_profile/tourist_profile_data';



export function usePatchUserProfile(body: object, username:String) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<TouristProfileData | null>(null);

  console.log("ibra2: ");
  useEffect(() => {
  const patchUserProfile = async () => {
    
    setLoading(true);
    setError(null);


    console.log("ibra: ");
    try {
      
      const response = await axios.patch(`traventure/api/tourist/update/${username}`, body);
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

// export function usePatchUserProfile(username: string, body: object | null) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {

     
    
//       if (body === null) return;
//       console.log(username);
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.put(`traventure/api/tourist/update/${username}`, body);
//         if (response.status >= 200 && response.status < 300) {
//           setData(response.data);
//           console.log(response.data);
//         } else {
//           throw new Error("Server can't be reached!");
//         }
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [categoryName, body]);
//   return { data, loading, error };
// }




// export function useUpdateCategory(data: TouristProfileUpdate, username:String) {
//   // const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]= useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {

//       try {
//         const response = await axios.patch(`traventure/api/tourist/update/${username}`, data);
//         response.data.username = data.username;
//         return response.data;
//       } catch (err) {
//         setError('Error updating user profile');
//         throw err;
//       } finally {
//         setLoading(false);
//       }
     
//     };
//     fetchData();
//   }, [categoryName, body]);
//   return { patchUserProfile, loading, error };
// };