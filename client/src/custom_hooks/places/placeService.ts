import axios from "axios";
import { uploadFileToStorage } from "../../firebase/firebase_storage";

interface TourismGovernor {
  _id: string;
  username: string;
  password: string;
  __v: number;
}

interface DataStructure {
  governors: TourismGovernor[];
}
const defaultImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/traventure-17204.appspot.com/o/uploads%2Fmystery-box-collage.jpg?alt=media&token=2595642a-c4c2-418d-b13d-099418d319bd";
export const createPlaceID = async (ausername: string, newPlace) => {
  try {
    const tempresponse = await axios.get<DataStructure>(
      "/traventure/api/admin/all",
      {
        params: {
          username: "Ibra",
        },
      }
    );
    const allUsers = tempresponse.data;
    if (newPlace.pictures[0]) {
      newPlace.pictures[0] = await uploadFileToStorage(newPlace.pictures[0]);
    } else {
      newPlace.pictures[0] = defaultImageUrl;
    }
    const idtoAddby = allUsers.governors.find(
      (thing) => thing.username === ausername
    );
    newPlace.added_By = idtoAddby?._id as string;

    const response = await axios.post("/traventure/api/place/add", newPlace);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Error creating place");
    }
  } catch (error) {
    throw new Error(error.message || "Error creating place");
  }
};
