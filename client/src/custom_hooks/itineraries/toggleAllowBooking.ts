import axios from 'axios';


  export const toggleAllowBooking = async (itineraryId:string) => {
    try {
        console.log("itineraryId in custom hook ",itineraryId);
      const response= await axios.patch(`/traventure/api/tourGuide/toggleAllowBooking`,{itineraryId});  
      if(response.status>=400){
        throw new Error('Error Toggling Allow Booking');
      }
      console.log("response in custom hook ",response);
      
    
    } catch (err) {
      return 'Error Toggling Allow Booking';
    } 
  };