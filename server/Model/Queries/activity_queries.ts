import mongoose from "mongoose";
import Activity from "../Schemas/Activity";
import Booking from "../Schemas/Booking";
import Tourist from "../Schemas/Tourist";
import TourGuide from "../Schemas/TourGuide";
import Advertiser from "../Schemas/Advertiser";
import sendMail from "../../utils/functions/email_sender";


interface Revenue {
  name: string;
  year: number;
  month: number;
  day: number;
  revenue: number;
}

export const addActivity = async (newActivity: any) => {
  try {
    await Activity.create(newActivity);
    return newActivity;
  } catch (err) {
    throw err;
  }
};

export const getActivities = async () => {
  try {
    return await Activity.find().populate("Tags").populate("Category");
  } catch (e) {
    throw e;
  }
};

export const getActivitiesid = async (id: string) => {
  try {
    return await Activity.find({ added_By: id })
      .populate("Tags")
      .populate("Category");
  } catch (err) {
    throw err;
  }
};
export const deleteActivity = async (id: string) => {
  try {
    return await Activity.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};
export const updateActivity = async (id: string, updatedActivity: any) => {
  try {
    return await Activity.findByIdAndUpdate(id, updatedActivity);
  } catch (err) {
    throw err;
  }
};

export const toggleInappropriate = async (id: string) => {
  try {

    const activity = await Activity.findById(id);
    if (!activity) throw new Error("Activity not found");

    // Toggle the inappropriate flag
    const newInappropriate = !activity.inappropriate;


    // If the activity is being declared inappropriate, remove bookings and add funds to users
    if (newInappropriate) {
      
    

    

      const bookings = await Booking.find({ activity: id });
      for (const booking of bookings) {
        // Add funds to the user who booked the activity
        await Tourist.findByIdAndUpdate(booking.tourist, {
          $inc: { wallet: activity.Price },
        });

        // Remove the booking
        await Booking.findByIdAndDelete(booking._id);
      }
    }

    // Update the activity
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { inappropriate: newInappropriate },
      { new: true }
    );

    return updatedActivity;
  } catch (err) {
    throw err;
  }
};


export async function sendMailAndNotificationToAdvertiser(activityId: string){
  try {
    
    const activity = await Activity.findById(activityId);
    if (!activity) throw new Error("activity not found");
    if(activity.inappropriate){
    const advertiser = await Advertiser.findById(activity.added_By);
    if (!advertiser) throw new Error("advertiser not found");
      if(!activity.inappropriate){return;}
       // notify the Advertise that this activity is inappropriate
       await Advertiser.findByIdAndUpdate(activity.added_By, {
        $push: {
          notifications: {
            message: `Your activity ${activity.Title} has been marked as inappropriate`,
            sent_by_mail: false,
            read: false,
            createdAt: new Date(),
          },
        },
      });
      
    sendMail(advertiser.email, "Activity Inappropriate", `Hello ${advertiser.username}, \n\nYour activity ${activity.Title} has been marked as inappropriate`);
  }
  } catch (error) {
    console.log("activitshyyyyyyyyyyyyyyyyyyyyyy error",error);
      throw error;
    }
  }

export const advertiserRevenue = async (
  username: string,
  month: number,
  activityName: string
) => {
  try {
    // Find the advertiser
    const advertiser = await Advertiser.findOne({ username });
    if (!advertiser) throw new Error("Advertiser not found");
    console.log(month);
    // Find all activities by the advertiser
    const activities = await Activity.find({ added_By: advertiser._id });
    if (!activities.length) return []; // No activities found

    const ActivityRevenue: Revenue[] = [];

    for (const activity of activities) {
      // Find bookings for the activity
      const bookings = await Booking.find({ activity: activity._id });

      for (const booking of bookings) {
        // Check conditions
        const matchesMonth = !isNaN(month)
          ? booking.timeStamp.getMonth() === month - 1
          : true;
        const matchesActivityName = activityName
          ? activity.Title === activityName
          : true;

        if (matchesMonth && matchesActivityName) {
          if (
            !ActivityRevenue.find(
              (rev) =>
                rev.name === activity.Title &&
                rev.year === booking.timeStamp.getFullYear() &&
                rev.month === booking.timeStamp.getMonth() + 1 &&
                rev.day === booking.timeStamp.getDate()
            )
          ) {
            ActivityRevenue.push({
              name: activity.Title,
              year: booking.timeStamp.getFullYear(),
              month: booking.timeStamp.getMonth() + 1,
              day: booking.timeStamp.getDate(),
              revenue: activity.Price * 0.9,
            });
          } else {
            const existingActivityRevenue = ActivityRevenue.find(
              (rev) =>
                rev.name === activity.Title &&
                rev.year === booking.timeStamp.getFullYear() &&
                rev.month === booking.timeStamp.getMonth() + 1 &&
                rev.day === booking.timeStamp.getDate()
            );
            if (existingActivityRevenue) {
              existingActivityRevenue.revenue +=
                activity.Price * (activity.SpecialDiscount / 100) * 0.9;
            }
          }
        }
      }
    }

    return ActivityRevenue;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const advNumTourists = async (
  username: string,
  month: number,
  activityName: string
) => {
  try {
    // Find the advertiser
    const advertiser = await Advertiser.findOne({ username });
    if (!advertiser) throw new Error("Advertiser not found");
    console.log(month);
    // Find all activities by the advertiser
    const activities = await Activity.find({ added_By: advertiser._id });
    if (!activities.length) return []; // No activities found

    const ActivityRevenue: Revenue[] = [];

    for (const activity of activities) {
      // Find bookings for the activity
      const bookings = await Booking.find({ activity: activity._id });

      for (const booking of bookings) {
        // Check conditions
        if (activity.DateAndTime > new Date()) continue;
        const matchesMonth = !isNaN(month)
          ? booking.timeStamp.getMonth() === month - 1
          : true;
        const matchesActivityName = activityName
          ? activity.Title === activityName
          : true;

        if (matchesMonth && matchesActivityName) {
          if (
            !ActivityRevenue.find(
              (rev) =>
                rev.name === activity.Title &&
                rev.year === booking.timeStamp.getFullYear() &&
                rev.month === booking.timeStamp.getMonth() + 1 &&
                rev.day === booking.timeStamp.getDate()
            )
          ) {
            ActivityRevenue.push({
              name: activity.Title,
              year: booking.timeStamp.getFullYear(),
              month: booking.timeStamp.getMonth() + 1,
              day: booking.timeStamp.getDate(),
              revenue: 1,
            });
          } else {
            const existingActivityRevenue = ActivityRevenue.find(
              (rev) =>
                rev.name === activity.Title &&
                rev.year === booking.timeStamp.getFullYear() &&
                rev.month === booking.timeStamp.getMonth() + 1 &&
                rev.day === booking.timeStamp.getDate()
            );
            if (existingActivityRevenue) {
              existingActivityRevenue.revenue += 1;
            }
          }
        }
      }
    }

    return ActivityRevenue;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
module.exports = {
  addActivity,
  getActivities,
  getActivitiesid,
  deleteActivity,
  updateActivity,
  toggleInappropriate,
  advertiserRevenue,
  advNumTourists,
  sendMailAndNotificationToAdvertiser,
};
