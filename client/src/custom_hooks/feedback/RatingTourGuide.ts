import { useEffect, useState } from "react";
import axios from "axios";
import IFeedback from "../IFeedback";

export const rateTourGuide = async (tourGuideId:string ,feedback: IFeedback) => {
    try {

        

        const response = await axios.post(`/traventure/api/feedback/rateTourGuide/${tourGuideId}`, feedback);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Error adding feedback");
        }
    } catch (error:any) {
        
        throw new Error(error.message || "Error adding feedback");
    }
};