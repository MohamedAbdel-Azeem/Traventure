import { useEffect, useState } from "react";
import axios from "axios";

export const UseCreateComplain = async (body: any) => {
    try {
        const response = await axios.post(`/traventure/api/complaint/add`, body);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Error creating place");
        }
    } catch (error:any) {
        
        throw new Error(error.message || "Error creating place");
    }
};