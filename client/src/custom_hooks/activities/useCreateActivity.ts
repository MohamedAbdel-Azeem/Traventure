import axios from "axios";


export const createActivity = async (newActivity) => {
    try {
        const response = await axios.post("/traventure/api/activity/add", newActivity);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Error creating place");
        }
    } catch (error) {
        
        throw new Error(error.message || "Error creating place");
    }
};