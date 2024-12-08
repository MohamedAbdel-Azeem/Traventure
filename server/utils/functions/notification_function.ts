import { getAllTourists } from "../../Model/Queries/user_queries";
import { getAllItinerary } from "../../Model/Queries/itinerary_queries";
import { addPromoCode } from "../../Model/Queries/promo_codes_queries";
import sendMail from "./email_sender";
require("dotenv").config();
import tourstModel from "../../Model/Schemas/Tourist"; // Add this line to import tourstModel

async function handleSendNotificationsUpcomingEvents(){
    const Itinerary = await getAllItinerary();
    const today = new Date();
    Itinerary?.forEach(async (itinerary) => {
        const startingDate = itinerary.starting_Date;
        const dayBeforeStartingDate = new Date(startingDate);
        dayBeforeStartingDate.setDate(dayBeforeStartingDate.getDate() - 1);
        if (
            today.getFullYear() === dayBeforeStartingDate.getFullYear() &&
            today.getMonth() === dayBeforeStartingDate.getMonth() &&
            today.getDate() === dayBeforeStartingDate.getDate()
        ) {
            for(let i = 0; i < itinerary.InterestedUsers.length; i++){
                try {
                    const tourist = await tourstModel.findById(itinerary.booked_By[i].user_id);
                    if (!tourist) throw new Error("Tourist not found");
                    
                    tourist.notifications.push({
                        message: `Your itinerary ${itinerary.title} is starting tomorrow`,
                        sent_by_mail: true,
                        read: false,
                        createdAt: new Date(),
                    });
                   
                    await tourist.save();
                    await sendMail(tourist.email, "Itinerary Reminder", `Hello ${tourist.username}, \n\nThis is a reminder that your itinerary ${itinerary.title} is starting tomorrow. \n\nEnjoy your trip!`);
                } catch (error) {
                    console.error("Error sending notification to: ", itinerary.booked_By[i].user_id);
                    console.error(error);
                }
        }
    }
    });


}

// async function handleSendNotificationsAvailableBooking(){

//     const Itinerary = await getAllItinerary();
//     const today = new Date();
//     Itinerary?.forEach(async (itinerary) => {
//         const startingDate = itinerary.starting_Date;
//         const dayBeforeStartingDate = new Date(startingDate);
//         dayBeforeStartingDate.setDate(dayBeforeStartingDate.getDate() - 1);
//         if (
//             today.getFullYear() === dayBeforeStartingDate.getFullYear() &&
//             today.getMonth() === dayBeforeStartingDate.getMonth() &&
//             today.getDate() === dayBeforeStartingDate.getDate()
//         ) {
//             for(let i = 0; i < itinerary.booked_By.length; i++){
//                 try {
//                     const tourist = await tourstModel.findById(itinerary.booked_By[i].user_id);
//                     if (!tourist) throw new Error("Tourist not found");
//                     sendMail(tourist.email, "Itinerary Reminder", `Hello ${tourist.username}, \n\nThis is a reminder that your itinerary ${itinerary.title} is starting tomorrow. \n\nEnjoy your trip!`);
//                     tourist.notifications.push({
//                         message: `Your itinerary ${itinerary.title} is starting tomorrow`,
//                         sent_by_mail: true,
//                         read: false,
//                         createdAt: new Date(),
//                     });
                   
//                     await tourist.save();
//                 } catch (error) {
//                     console.error("Error sending notification to: ", itinerary.booked_By[i].user_id);
//                     console.error(error);
//                 }
//         }
//     }
//     });
// }


export default handleSendNotificationsUpcomingEvents;
