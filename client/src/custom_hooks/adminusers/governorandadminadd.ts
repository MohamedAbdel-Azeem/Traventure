import axios from "axios";

export const UseAddAdmin = async (body: any) => {
  try {
      const response = await axios.post(`/traventure/api/admin/add`, body);
      if (response.status >= 200 && response.status < 300) {
          return response.data;
      } else {
          throw new Error("Error");
      }
  } catch (error) {
      
      throw new Error(error.message || "Error");
  }
};

export const UseAddGovernor = async (body: any) => {
  try {
      const response = await axios.post(`/traventure/api/admin/add/governer`, body);
      if (response.status >= 200 && response.status < 300) {
          return response.data;
      } else {
          throw new Error("Error");
      }
  } catch (error) {
      
      throw new Error(error.message || "Error");
  }
};