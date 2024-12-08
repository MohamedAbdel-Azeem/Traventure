import axios from 'axios';


  export const toggleAllowBooking = async (itineraryId:string) => {
    try {
        console.log("itineraryId in custom hook ",itineraryId);
      const response= await axios.patch(`/traventure/api/tourGuide/toggleAllowBooking`,{itineraryId});  
      console.log("response in custom hook ",response.status);
      return response.status;
      
      
    
    } catch (err) {
      return 500;
    } 
  };