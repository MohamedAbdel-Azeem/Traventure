import mongoose from "mongoose";
import Activity from "../Schemas/Activity";
import Booking from "../Schemas/Booking";
import Tourist from "../Schemas/Tourist";
import Advertiser from "../Schemas/Advertiser";

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
          ActivityRevenue.push({
            name: activity.Title,
            year: booking.timeStamp.getFullYear(),
            month: booking.timeStamp.getMonth() + 1,
            day: booking.timeStamp.getDate(),
            revenue: activity.Price,
          });
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
};
