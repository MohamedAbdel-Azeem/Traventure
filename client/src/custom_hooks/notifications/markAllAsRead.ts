import axios from 'axios';





  export const patchMarkAllAsRead = async (body: object) => {
    try {
      const { data } = await axios.patch(`/traventure/api/user/markAllNotificationAsRead`, body);  
      return data;
    } catch (err) {
      return 'Error marking notification as read';
    } 
  };
