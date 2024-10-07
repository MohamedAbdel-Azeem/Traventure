import axios from "axios";


export const updateActivity = async (id:string,newActivity) => {
  try {
      if (!id) return;
      if (!newActivity) return;
      const response = await axios.put(`/traventure/api/activity/update/${id}`, newActivity);
      if (response.status >= 200 && response.status < 300) {
          return response.data;
      } else {
          throw new Error("Error creating place");
      }
  } catch (error) {
      
      throw new Error(error.message || "Error creating place");
  }
};