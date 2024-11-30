import mongoose from "mongoose";
import Activity from "../Schemas/Activity";
import Booking from "../Schemas/Booking";
import Tourist from "../Schemas/Tourist";
import TourGuide from "../Schemas/TourGuide";
import Advertiser from "../Schemas/Advertiser";

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
    return await Activity.find()
      .populate("Tags")
      .populate("Category");
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
module.exports = {
  addActivity,
  getActivities,
  getActivitiesid,
  deleteActivity,
  updateActivity,
  toggleInappropriate,
};
