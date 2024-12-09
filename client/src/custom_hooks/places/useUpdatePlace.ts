import axios from "axios";

const useUpdatePlace = async (id: string, body: any) => {
  try {
    const data = await axios
      .patch(`/traventure/api/place/update/${id}`, body)
      .catch((err) => {
        return "Error updating place";
      });
    return data;
  } catch (err) {
    return "Error updating user profile";
  }
};

export default useUpdatePlace;