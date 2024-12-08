import axios from 'axios';





  export const patchMarkAsRead = async (body: object) => {
    try {
      const { data } = await axios.patch(`/traventure/api/user/markNotificationAsRead`, body);  
      return data;
    } catch (err) {
      return 'Error marking notification as read';
    } 
  };
