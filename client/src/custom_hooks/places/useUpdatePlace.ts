import axios from "axios";
import { uploadFileToStorage } from "../../firebase/firebase_storage";
const defaultImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/traventure-17204.appspot.com/o/uploads%2Fmystery-box-collage.jpg?alt=media&token=2595642a-c4c2-418d-b13d-099418d319bd";
const useUpdatePlace = async (id: string, body: any) => {
  try {
    if (body.pictures) {
      const newImages = [];
      for (const image of body.pictures) {
        newImages.push(await uploadFileToStorage(image));
      }
      body.pictures = newImages;
    } else {
      body.pictures = [defaultImageUrl];
    }
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
