import { get } from "http";
import Activity from "../Model/Schemas/Activity";
import Itinerary from "../Model/Schemas/Itinerary";
import Product from "../Model/Schemas/Product";
import Tourist from "../Model/Schemas/Tourist";
import { getTouristBookings } from "../Model/Queries/booking_queries";
import exp from "constants";
import { getprofileInfo } from "../Model/Queries/user_queries";
import Booking from "../Model/Schemas/Booking";

const requestdeleteMiddleware = async (user_id:string, name:string, wallet:number, type:string) => {

    if(wallet > 0){
        throw new Error("You have money in the wallet still");
    }
    if(type === "advertiser"){
    const activities = await Activity.find({ DateAndTime: { $gte: new Date() }, added_By: user_id });
    if(activities.length > 0){
        throw new Error("You have activities still");
    }
    }else if(type === "seller"){
        const products = await Product.find({seller: user_id})
        if(products.length > 0){
            throw new Error("You have products still on the system");
        }
    }else if(type === "tourguide"){
        const itineraries = await Itinerary.find({ starting_Date: { $gte: new Date() }, added_By: user_id, booked_By: { $exists: true, $not: { $size: 0 } } })
    if(itineraries.length > 0){
        throw new Error("You have booked itineraries still");
    }
    }else if(type === "tourist"){
        const bookings = await Booking.find({ tourist: user_id });

        if(bookings.length > 0){
            throw new Error("You have bookings still");
        }
    }
    return true;
}

export default requestdeleteMiddleware;