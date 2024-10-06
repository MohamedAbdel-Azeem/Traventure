import axios from "axios";
import Place from "./place_interface";

export const createPlace = async (newCard: Place) => {
    try {
        const response = await axios.post("/traventure/api/place/add", newCard);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Error creating place");
        }
    } catch (error) {
        throw new Error(error.message || "Error creating place");
    }
};