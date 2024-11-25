import mongoose from "mongoose";
import Booking from "../Schemas/Booking";
import Activity from "../Schemas/Activity";
import Itinerary from "../Schemas/Itinerary";

interface Revenue {
  year: number;
  month: number;
  day: number;
  revenue: number;
}

export const getRevenues = async () => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "activity",
        model: Activity,
      })
      .populate({
        path: "itinerary",
        model: Itinerary,
      })
      .lean();
    console.log("bookings", bookings.length);
    const activityRevenues: Revenue[] = [];
    const itineraryRevenues: Revenue[] = [];

    bookings.forEach((booking) => {
      const date = new Date(booking.timeStamp); // Use the date from the Booking schema
      let price: number;

      if (booking.activity) {
        price = (booking.activity as any).Price;
      } else if (booking.itinerary) {
        price = (booking.itinerary as any).price;
      } else {
        return; // Skip if neither activity nor itinerary is present
      }

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getUTCDate();
      console.log(date);
      // Months are 0-based in JavaScript

      const revenue = price * 0.1;

      if (booking.activity) {
        const existingActivityRevenue = activityRevenues.find(
          (rev) => rev.year === year && rev.month === month && rev.day === day
        );
        if (existingActivityRevenue) {
          existingActivityRevenue.revenue += revenue;
        } else {
          activityRevenues.push({ year, month, day, revenue });
        }
      }

      if (booking.itinerary) {
        const existingItineraryRevenue = itineraryRevenues.find(
          (rev) => rev.year === year && rev.month === month && rev.day === day
        );
        if (existingItineraryRevenue) {
          existingItineraryRevenue.revenue += revenue;
        } else {
          itineraryRevenues.push({ year, month, day, revenue });
        }
      }
    });

    return { activityRevenues, itineraryRevenues };
  } catch (e) {
    throw e;
  }
};
