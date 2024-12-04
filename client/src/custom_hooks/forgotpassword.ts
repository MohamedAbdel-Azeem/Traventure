import axios from "axios";

export const sendEmail = async (email: string) => {
  try {
    const { data } = await axios.post(`/traventure/api/recovery/add`, {
      email,
    });
    return data;
  } catch (err) {
    return "Error sending email";
  }
};

export const useCode = async (email: string, code: string) => {
  try {
    const { data } = await axios.delete(`/traventure/api/recovery/use`, {
      data: {
        email,
        code
      }
    });
    return data;
  } catch (err) {
    return "Error with code";
  }
};
