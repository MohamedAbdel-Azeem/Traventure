import bookingModel from "../Schemas/Booking";
import ActivityModel from "../Schemas/Activity";
import ItineraryModel from "../Schemas/Itinerary";
import touristModel from "../Schemas/Tourist";
import flightBooking from "../Schemas/flightBooking";
import hotelBooking from "../Schemas/hotelBooking";
import { ItineraryDocument } from "../../Interfaces/IItinerary";
import PromoCodes from "../Schemas/PromoCodes";



export async function getTouristBookings(tourist_id: string) {
  try {
    const bookings = await bookingModel
      .find({ tourist: tourist_id })
      .populate("itinerary")
      .populate("activity");
    return bookings;
  } catch (error) {
    throw error;
  }
}

export async function getBookingsByTourist(username: string) {
  try {
    const tourist = await touristModel.findOne({ username: username });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const bookings = await bookingModel
      .find({ tourist: (tourist as any)._id })
      .populate({
        path: "activity",
        populate: [
          {
            path: "Tags",
            model: "PreferenceTags",
          },
          {
            path: "Category",
            model: "Category",
          },
        ],
      })
      .populate({
        path: "itinerary",
        populate: [
          {
            path: "selectedTags",
            model: "PreferenceTags",
          },
          {
            path: "added_By",
            model: "TourGuide",
          },
          {
            path: "plan.place",
            model: "Place",
          },
          {
            path: "plan.activities.activity_id",
            model: "Activity",
          },
        ],
      });
    return bookings;
  } catch (error) {
    throw error;
  }
}

export async function checkBooking(
  tourist_id: string,
  activity_id: string | undefined,
  itinerary_id: string | undefined
) {
  try {
    
    const query: any = { tourist: tourist_id };
    const now = new Date();
    if (activity_id) {
      query.activity = activity_id;
      const activity = await ActivityModel.findById(activity_id);
      if (activity && new Date((activity as any).DateAndTime) < now) {
        throw new Error("The activity has already started or passed.");
      }
    }

    if (itinerary_id) {
      query.itinerary = itinerary_id;
      const itinerary = await ItineraryModel.findById(itinerary_id);
      if (itinerary && ((new Date((itinerary as any).starting_Date) < now) || !(itinerary as any).bookingActivated )) {
        throw new Error("The itinerary has already started or passed.");
      }
    }
    const existingBooking = await bookingModel.findOne(query);
    return existingBooking;
  } catch (error) {
    throw error;
  }
}

export async function getBookingTotalAmount(bookingData: any) {
  try {
    let price = 0;
    if(bookingData.type && (bookingData.type === "activity" || bookingData.type === "itinerary")){
    price = bookingData.price;
    }
    else{
      price = bookingData.totalPrice;
    }
    var totalAmount = price;
    
    const promoCode = await PromoCodes.findOne({
      name: bookingData.promoCode,
    });
    if (promoCode && !promoCode.used) {
      totalAmount *= 0.9;
    }
    return totalAmount;
  } catch (error) {
    throw error;
  }
}

export async function handlePayment(
  paymentMethod: string,
  totalAmount: number,
  tourist_id: string,
  bookingType: string
) {
  try {
    if (paymentMethod == "wallet") {
      let tourist ;
      if(bookingType === "flight/hotel"){
        tourist = await touristModel.findOne({username:tourist_id});}
      else{
        tourist = await touristModel.findById(tourist_id);
      }
      if (!tourist) throw new Error("Tourist not found");
      if (tourist.wallet < totalAmount) throw new Error("Insufficient funds");
      tourist.wallet -= totalAmount;
      await tourist.save();
    }
    if (paymentMethod == "card") {
      return;
    }
    if (paymentMethod == "cod") {
      return;
    }
  } catch (error) {
    throw error;
  }
}

export async function addBooking(bookingData: any) {
  let booked = null;
  try {
    if (booked === null) {

      const tourist=await touristModel.findById(bookingData.tourist);
      if(!tourist) throw new Error("Tourist not found");

    
      if (bookingData.promoCode) {
        const promo = await PromoCodes.findOne({ name: bookingData.promoCode });
        if (promo && !promo.used) {
          promo.used = true;
          await promo.save();
        } else {
          delete bookingData.promoCode;
        }
      }


      await bookingModel.create(bookingData);
      await updateLoyaltyPoints(bookingData);
    
    } else {
      throw new Error("Booking already exists");
    }
  } catch (error) {
    throw error;
  }
}
export async function updateLoyaltyPoints(bookingdata:any){
  const touristId = bookingdata.tourist;
  let amount =0;
  if (bookingdata.type === "itinerary") {
    const itinerary= (await ItineraryModel.findById(bookingdata.itinerary))as ItineraryDocument |null;
    if(!itinerary) return null;
    amount+= itinerary.price;
  }
  else if(bookingdata.type === "activity") {
    const activitydata= await ActivityModel.findById(bookingdata.activity);
    if(!activitydata) return null;
    amount+= activitydata.Price;
  }

  // if(bookingdata.activity !== null){
    

  // }
  // if(bookingdata.itinerary !== null){
  //   const itinerary= await ItineraryModel.findById(bookingdata.itinerary);
  //   if(!itinerary) return null;
  //   amount+=itinerary.price;
  // }

  try {
    const tourist = await touristModel.findById(touristId);
    if (!tourist) return null;
    var points=0;
    switch(tourist.loyaltyLevel){
      case 1: points=amount*0.5; break;
      case 2: points=amount; break; 
      case 3: points=amount*1.5; break;
    }
    tourist.currentLoyaltyPoints += points;
    tourist.totalLoyaltyPoints += points;

    if(tourist.totalLoyaltyPoints>500000){
      tourist.loyaltyLevel=3;
    }
    else if(tourist.totalLoyaltyPoints>100000){
      tourist.loyaltyLevel=2;
    }
    else {
      tourist.loyaltyLevel=1;
    }
    await tourist.save();
  } catch (error) {
    throw error;
  }
}


async function checkCancel(booking_id: string) {
  let toCancel = null;
  let booking = null;
  try {
    booking = await bookingModel.findById(booking_id);
    const activity_id = (booking as any).activity;
    const itinerary_id = (booking as any).itinerary;
    const query: any = {};
    const currentTime = new Date();

    if (activity_id) {
      query.activity = activity_id.toString();
      toCancel = await ActivityModel.findById(query.activity);
      if (toCancel) {
        const activityTime = new Date((toCancel as any).DateAndTime);
        const timeDifference = activityTime.getTime() - currentTime.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        if (hoursDifference < 48) {
          throw new Error("Cannot cancel activity");
        }
      }
    }

    if (itinerary_id) {
      query.itinerary = itinerary_id.toString();
      toCancel = await ItineraryModel.findById(query.itinerary);

      if (toCancel) {
        const itineraryTime = new Date((toCancel as any).starting_Date);
        const timeDifference = itineraryTime.getTime() - currentTime.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        if (hoursDifference < 48) {
          throw new Error("Cannot cancel itinerary");
        }
      }
    }

    const existingBooking = await bookingModel.findById(booking_id);
    return existingBooking;
  } catch (error) {
    throw error;
  }
}

export async function cancelBooking(booking_id: string) {
  let booking: any;
  try {
    booking = null;
    booking = await checkCancel(booking_id);
    if (booking !== null) {
      if ((booking as any).type === "itinerary") {
      
        const itinerary = await ItineraryModel.findById(
          (booking as any).itinerary
        );
        
        if (itinerary) {
          const index = (itinerary as any).booked_By.findIndex(
            (entry: any) =>
              entry.user_id.toString() === (booking as any).tourist.toString()
          );
          if (index !== -1) {
            (itinerary as any).booked_By.splice(index, 1);
            await (itinerary as any).save(); // Save the updated itinerary
          }
        }
      }

      const tourist = await touristModel.findById( booking.tourist );
      if (tourist) {
        tourist.wallet += booking.price;
        await tourist.save(); // Save the updated wallet
      } else {
        throw new Error("Wallet not found");
      }

      await bookingModel.findByIdAndDelete(booking_id); 
      return booking;

    } else {
      throw new Error("Booking not found");
    }
  } catch (error) {
    throw error;
  }
}

export async function addFlightBooking(bookingData: any) {
  try {
    if (bookingData.promoCode) {
      const promo = await PromoCodes.findOne({ name: bookingData.promoCode });
      if (promo && !promo.used) {
        promo.used = true;
        await promo.save();
      } else {
        // Erase the promo code if it is invalid or used
        delete bookingData.promoCode;
      }
    }
    const response = await flightBooking.create(bookingData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addHotelBooking(bookingData: any) {
  try {
    if (bookingData.promoCode) {
      const promo = await PromoCodes.findOne({ name: bookingData.promoCode });
      if (promo && !promo.used) {
        promo.used = true;
        await promo.save();
      } else {
        // Erase the promo code if it is invalid or used
        delete bookingData.promoCode;
      }
    }
    const response = await hotelBooking.create(bookingData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getFlightBookings(username: string) {
  try {
    const tourist = await touristModel.findOne({ username: username });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const bookings = await flightBooking.find({
      booked_by: (tourist as any)._id,
    });
    return bookings;
  } catch (error) {
    throw error;
  }
}

export async function getHotelBookings(username: string) {
  try {
    const tourist = await touristModel.findOne({ username: username });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const bookings = await hotelBooking.find({
      booked_by: (tourist as any)._id,
    });
    return bookings;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getTouristBookings,
  addBooking,
  cancelBooking,
  getBookingsByTourist,
  addFlightBooking,
  addHotelBooking,
  getFlightBookings,
  getHotelBookings,
  handlePayment,
  getBookingTotalAmount,
  checkBooking
};
