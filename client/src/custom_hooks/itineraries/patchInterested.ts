import axios from 'axios';


  export const patchInterested = async (body: object) => {
    try {
      const response= await axios.patch(`/traventure/api/tourist/interested`, body);  
      if(response.status>=400){
        throw new Error('Error marking notification as read');
      }
      
    
    } catch (err) {
      return 'Error marking notification as read';
    } 
  };