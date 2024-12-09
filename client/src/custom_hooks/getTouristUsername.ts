import axios  from "axios";

export const getTouristUsername = async (id: string) => {
  try {
    const response = await axios.get(`/traventure/api/tourist/id/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return "Error fetching data";
  }
};