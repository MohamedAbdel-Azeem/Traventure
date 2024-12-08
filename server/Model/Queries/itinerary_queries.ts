//import dayjs from 'dayjs';
import Itinerary from "../Schemas/Itinerary";
import TourGuide from "../Schemas/TourGuide";
import { ItineraryDocument } from "../../Interfaces/IItinerary";
import Booking from "../Schemas/Booking";

import Tourist from "../Schemas/Tourist";
import sendMail from "../../utils/functions/email_sender";
interface Revenue {
  name: string;
  year: number;
  month: number;
  day: number;
  revenue: number;
}
export async function getItinerary(tourGuide_username: String) {
  try {
    const tourGuide = await TourGuide.findOne({
      username: tourGuide_username,
    });

    if (!tourGuide) {
      throw new Error("Tour guide not found");
    }

    const tour_guide_id = tourGuide._id;
    const itineraries = await Itinerary.find({
      added_By: tour_guide_id, // Find all items with the given tour_guide_id
    })
      .populate("added_By")
      .populate("plan.activities.activity_id")
      .populate({
        path: "plan.activities.activity_id",
        populate: {
          path: "Category",
          model: "Category",
        },
      })
      .populate({
        path: "plan.activities.activity_id",
        populate: {
          path: "Tags",
          model: "PreferenceTags",
        },
      })
      .populate("plan.place")
      .populate("selectedTags");

    return itineraries;
  } catch (error) {
    throw error;
  }
}

export async function getAllItinerary() {
  try {
    const itineraries = await Itinerary.find()
      .populate("added_By")
      .populate("plan.place")
      .populate("plan.activities.activity_id")
      .populate("selectedTags");
    return itineraries;
  } catch (error) {
    throw error;
  }
}

export async function addItinerary(itinerary: Object) {
  try {
    const newPlace = await Itinerary.create(itinerary);
    return newPlace;
  } catch (error) {
    throw error;
  }
}

export async function updateItinerary(
  itinerary_Id: string,
  new_Itinerary: Object
) {
  try {
    const place = await Itinerary.findByIdAndUpdate(
      itinerary_Id,
      new_Itinerary
    );
    return place;
  } catch (error) {
    throw error;
  }
}

export async function deleteItinerary(itinerary_Id: string) {
  try {
    const itinerary = await Itinerary.findById(itinerary_Id).lean();
    if (itinerary) {
      const { booked_By } = itinerary;
      if (booked_By.length > 0) {
        throw new Error("Cannot delete itinerary that has been booked.");
      }
    }
    const place = await Itinerary.findByIdAndDelete(itinerary_Id);
    return place;
  } catch (error) {
    throw error;
  }
}
export async function toggleItineraryActivation(itinerary_Id: string) {
  try {
    const itinerary = (await Itinerary.findById(
      itinerary_Id
    )) as ItineraryDocument | null;

    if (!itinerary) throw new Error("Itinerary not found");

    const { bookingActivated = false, booked_By = [] } = itinerary;
    if (booked_By.length == 0 && bookingActivated) return itinerary;
    const newBookingActivated = !bookingActivated;

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      itinerary_Id,
      { bookingActivated: newBookingActivated },
      { new: true }
    );

    return updatedItinerary;
  } catch (error) {
    throw error;
  }
}

export async function toggleItineraryAllowBooking(itineraryId:string){
  try {
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) throw new Error("Itinerary not found");
    //if the allowBooking was true
    if(itinerary.allowBooking){
      await Itinerary.updateOne(
        { _id: itineraryId },
        { $set: { allowBooking: false } }
      );
      return false;
      

    }
    else{
      await Itinerary.updateOne(
        { _id: itineraryId },
        { $set: { allowBooking: true } }
      );
      
      return true;
    }
 

}
catch (error) {
  throw error;
}
}

export async function sendMailAndNotificationToInterestedUsers(itineraryId: string,allowBooking:any){
  try {
    if(!allowBooking) return;

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) throw new Error("Itinerary not found");

    for (const userobj of itinerary.InterestedUsers) {
      const user_id=userobj.user_id;
      await Tourist.findByIdAndUpdate(user_id, {
        $push: {
      notifications: {
        message: `Booking for itinerary ${itinerary.title} is now allowed`,
        sent_by_mail: false,
        read: false,
        createdAt: new Date(),
      },
        },
      });
      console.log("userrrrrrrrr Idddddddiddidd",user_id);
      const tourist = await Tourist.findById(user_id);
      if(!tourist) throw new Error("Tourist not found");
      sendMail(tourist.email, "Booking Allowed", `Hello ${tourist?.username}, \n\nBooking for itinerary ${itinerary.title} is now allowed`);
    }


}
catch (error) {
  throw error;
}
}





export async function toggleItineraryInappropriate(itinerary_Id: string) {
  try {
    const itinerary = (await Itinerary.findById(
      itinerary_Id
    )) as ItineraryDocument | null;
    if (!itinerary) throw new Error("Itinerary not found");

    // Toggle the inappropriate flag
    const { inappropriate = false } = itinerary;
    const newInappropriate = !inappropriate;

    // Find and remove bookings associated with the itinerary
    if (newInappropriate) {

   

      const bookings = await Booking.find({ itinerary: itinerary_Id });
      for (const booking of bookings) {
        // Add funds to the user who booked the itinerary
        await Tourist.findByIdAndUpdate(booking.tourist, {
          $inc: { wallet: itinerary.price },
        });

        // Remove the booking
        await Booking.findByIdAndDelete(booking._id);
      }
    }
    // Update the itinerary
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      itinerary_Id,
      { inappropriate: newInappropriate },
      { new: true }
    );

    return updatedItinerary;
  } catch (error) {
    throw error;
  }
}

export async function sendMailAndNotificationToTourGuide(itineraryId: string){
  try {
    
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) throw new Error("Itinerary not found");
    if(itinerary.inappropriate){
    const tourGuide = await TourGuide.findById(itinerary.added_By);
    if (!tourGuide) throw new Error("TourGuide not found");
     // notify the TourGuide that this activity is inappropriate
     await TourGuide.findByIdAndUpdate(itinerary.added_By, {
      $push: {
        notifications: {
          message: `Your itinerary ${itinerary.title} has been marked as inappropriate`,
          sent_by_mail: false,
          read: false,
          createdAt: new Date(),
        },
      },
    });
    sendMail(tourGuide.email, "Itinerary Inappropriate", `Hello ${tourGuide.username}, \n\nYour itinerary ${itinerary.title} has been marked as inappropriate`);
  }
  } catch (error) {
      throw error;
    }
  }

export async function tourguideItenRevenue(
  username: string,
  month: number,
  itieraryName: string
) {
  try {
    const tourGuide = await TourGuide.findOne({ username });
    if (!tourGuide) throw new Error("Tour Guide not found");
    const itineraries = await Itinerary.find({ added_By: tourGuide._id });
    if (!itineraries.length) return [];
    const revenue: Revenue[] = [];
    for (const itinerary of itineraries) {
      const bookings = await Booking.find({
        itinerary: (itinerary as any)._id,
      });
      for (const booking of bookings) {
        const matchesMonth = !isNaN(month)
          ? booking.timeStamp.getMonth() === month - 1
          : true;
        const matchesActivityName = itieraryName
          ? (itinerary as any).title === itieraryName
          : true;

        if (matchesMonth && matchesActivityName) {
          if (
            !revenue.find(
              (rev) =>
                rev.name === (itinerary as any).title &&
                rev.year === booking.timeStamp.getFullYear() &&
                rev.month === booking.timeStamp.getMonth() + 1 &&
                rev.day === booking.timeStamp.getDate()
            )
          ) {
            revenue.push({
              name: (itinerary as any).title,
              year: booking.timeStamp.getFullYear(),
              month: booking.timeStamp.getMonth() + 1,
              day: booking.timeStamp.getDate(),
              revenue: (itinerary as any).price * 0.9,
            });
          } else {
            const existingItineRevenue = revenue.find(
              (rev) =>
                rev.name === (itinerary as any).title.Title &&
                rev.year === booking.timeStamp.getFullYear() &&
                rev.month === booking.timeStamp.getMonth() + 1 &&
                rev.day === booking.timeStamp.getDate()
            );
            if (existingItineRevenue) {
              existingItineRevenue.revenue += (itinerary as any).price * 0.9;
            }
          }
        }
      }
    }
    return revenue;
  } catch (error) {
    throw error;
  }
}

export async function tourguideItenUsers(
  username: string,
  month: number,
  itieraryName: string
) {
  try {
    const tourGuide = await TourGuide.findOne({ username });
    if (!tourGuide) throw new Error("Tour Guide not found");
    const itineraries = await Itinerary.find({ added_By: tourGuide._id });
    if (!itineraries.length) return [];
    const revenue: Revenue[] = [];
    for (const itinerary of itineraries) {
      if ((itinerary as any).starting_Date > new Date()) continue;
      const bookings = await Booking.find({
        itinerary: (itinerary as any)._id,
      });
      for (const booking of bookings) {
        const matchesMonth = !isNaN(month)
          ? booking.timeStamp.getMonth() === month - 1
          : true;
        const matchesActivityName = itieraryName
          ? (itinerary as any).title === itieraryName
          : true;

        if (matchesMonth && matchesActivityName) {
          if (
            !revenue.find(
              (rev) =>
                rev.name === (itinerary as any).title &&
                rev.year === booking.timeStamp.getFullYear() &&
                rev.month === booking.timeStamp.getMonth() + 1 &&
                rev.day === booking.timeStamp.getDate()
            )
          ) {
            revenue.push({
              name: (itinerary as any).title,
              year: booking.timeStamp.getFullYear(),
              month: booking.timeStamp.getMonth() + 1,
              day: booking.timeStamp.getDate(),
              revenue: 1,
            });
          } else {
            const existingItineRevenue = revenue.find(
              (rev) =>
                rev.name === (itinerary as any).title.Title &&
                rev.year === booking.timeStamp.getFullYear() &&
                rev.month === booking.timeStamp.getMonth() + 1 &&
                rev.day === booking.timeStamp.getDate()
            );
            if (existingItineRevenue) {
              existingItineRevenue.revenue += 1;
            }
          }
        }
      }
    }
    return revenue;
  } catch (error) {
    throw error;
  }
}
