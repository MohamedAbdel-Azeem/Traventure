import axios from "axios";
export const useAddFeedbackProduct = (productId: string , feedback: { rating: number | null; review: string | null },toursitUsername:string ) => {
    console.log("herrrr",toursitUsername);
    try{
        const response = axios.patch(`/traventure/api/product/feedback/${productId}`, {rating: feedback.rating, review: feedback.review, touristUsername: toursitUsername});
        return response;
    }
    catch (error) {
        console.error(error);
        return null;
    }
        
};