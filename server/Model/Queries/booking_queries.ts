import bookingModel from "../Schemas/Booking";
import ActivityModel from "../Schemas/Activity";
import ItineraryModel from "../Schemas/Itinerary";
import touristModel from "../Schemas/Tourist";

export async function getTouristBookings(tourist_id: string) {
  try {
    const bookings = await bookingModel.find({ tourist: tourist_id }).populate("itinerary").populate("activity");
    return bookings;
  } catch (error) {
    throw error;
  }
}

export async function getBookingsByTourist(username: string) {
  try {
    const tourist = await touristModel.findOne({username: username});
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const bookings = await bookingModel.find({ tourist: (tourist as any)._id })
    .populate({
        path:"activity",
        populate: [
          {
            path: 'Tags',
            model: 'PreferenceTags' 
          },
          {
            path: 'Category',
            model: 'Category' 
          }
        ]

        })
    .populate({
        path: 'itinerary',
        populate: [
          {
            path: 'selectedTags',
            model: 'PreferenceTags' 
          },
          {
            path: 'plan.place',
            model: 'Place' 
          },
          {
            path: 'plan.activities.activity_id',
            model: 'Activity' 
          }
        ]
      });
    return bookings;
  } catch (error) {
    throw error;
  }
}

async function checkBooking(tourist_id:string,activity_id:string|undefined,itinerary_id:string|undefined){
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
      if (itinerary && new Date((itinerary as any).starting_Date) < now) {
          throw new Error("The itinerary has already started or passed.");
      }
  }
    const existingBooking = await bookingModel.findOne(query);
    return existingBooking;
  } catch (error) {
    throw error;
  }
}

export async function addBooking(bookingData: any) {
  let booked=null;
  try {
    if(bookingData.type==="activity"){
      booked=await checkBooking(bookingData.tourist,bookingData.activity,undefined);}
    if(bookingData.type==="itinerary"){
      booked=await checkBooking(bookingData.tourist,undefined,bookingData.itinerary);
    }
    if(booked===null){
      await bookingModel.create(bookingData); 
    }
    else{
      throw new Error("Booking already exists");
    }
  } catch (error) {
    throw error;
  }
}

async function checkCancel(booking_id:string){
    let toCancel=null;
    let booking=null;
  try {
    booking=await bookingModel.findById(booking_id);
    const activity_id=(booking as any).activity;
    const itinerary_id=(booking as any).itinerary;
    const query: any = {};
    const currentTime = new Date();
    
    if (activity_id) {
      query.activity = activity_id.toString();
      toCancel = await ActivityModel.findById(query.activity);
      if (toCancel) {
        const activityTime = new Date((toCancel as any).DateAndTime);
        const timeDifference = activityTime.getTime() - currentTime.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        console.log(hoursDifference);
 

        if (hoursDifference < 48) {
          throw new Error('Cannot cancel activity');
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
        console.log(hoursDifference);

        if (hoursDifference < 48) {
          throw new Error('Cannot cancel itinerary');
        }
      }
    }

    const existingBooking = await bookingModel.findById(booking_id);
    return existingBooking;
  } catch (error) {
    throw error;
  }
}

export async function cancelBooking(booking_id:string) {
  let booking:any;
  try {
    booking=null;
    booking=await checkCancel(booking_id);
    if(booking!==null){
      if((booking as any).type==="itinerary"){
        const itinerary=await ItineraryModel.findById((booking as any).itinerary);
        console.log("hh"); 
        if(itinerary){
          const index = (itinerary as any).booked_By.findIndex((entry: any) => entry.user_id.toString() === (booking as any).tourist.toString());
          if (index !== -1) {

            (itinerary as any).booked_By.splice(index, 1);
            await (itinerary as any).save(); // Save the updated itinerary
          }
        }
      }
      await bookingModel.findByIdAndDelete(booking_id); 
    }
    else{
      throw new Error("Booking not found");
    }
  } catch (error) {
    throw error;
  }
}


module.exports ={getTouristBookings,addBooking,cancelBooking, getBookingsByTourist};