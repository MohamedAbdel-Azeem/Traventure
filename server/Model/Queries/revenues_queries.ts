import mongoose from "mongoose";
import Booking from "../Schemas/Booking";
import Activity from "../Schemas/Activity";
import Itinerary from "../Schemas/Itinerary";
import Tourist from "../Schemas/Tourist";
import Seller from "../Schemas/Seller";
import TourGuide from "../Schemas/TourGuide";
import Advertiser from "../Schemas/Advertiser";
import Admin from "../Schemas/Admin";
import Governer from "../Schemas/Governer";
import purchase, { IPurchase } from "../../Model/Schemas/purchase";
interface Revenue {
  year: number;
  month: number;
  day: number;
  revenue: number;
}

interface UserCount {
  year: number;
  month: number;
  day: number;
  type: string;
  count: number;
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

    const purchases: Array<{
      cart: Array<{
        productId: {
          _id: mongoose.Types.ObjectId;
          externalseller?: string;
          price?: Number;
        };
        quantity: number;
      }>;
      timeStamp: Date;
    }> = await purchase
      .find()
      .populate({
        path: "cart.productId",

        select: "price externalseller",
      })
      .lean();
    console.log("bookings", bookings.length);
    console.log("purchases", purchases.length);

    const activityRevenues: Revenue[] = [];
    const itineraryRevenues: Revenue[] = [];
    const productRevenues: Revenue[] = [];

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
      const day = date.getDate();
      // Months are 0-based in JavaScript

      const revenue = parseFloat((price * 0.1).toFixed(2));

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
    purchases.forEach((purchase) => {
      const date = new Date(purchase.timeStamp); // Use the date from the Purchase schema

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are 0-based in JavaScript
      const day = date.getDate();

      let revenue = 0;

      // Loop through the cart to calculate total revenue for the purchase

      purchase.cart.forEach((cartItem) => {
        if (cartItem.productId.externalseller) return;
        const productPrice = cartItem.productId.price?.toFixed(2) || 0;
        revenue += (productPrice as number) * cartItem.quantity * 0.1; // Assuming 10% revenue share
      });

      const existingProductRevenue = productRevenues.find(
        (rev) => rev.year === year && rev.month === month && rev.day === day
      );
      if (existingProductRevenue) {
        existingProductRevenue.revenue += revenue;
      } else {
        productRevenues.push({ year, month, day, revenue });
      }
    });

    return { activityRevenues, itineraryRevenues, productRevenues };
  } catch (e) {
    throw e;
  }
};

export const getNumberofUsers = async (
  year: number,
  month: number,
  type: string
) => {
  try {
    const tourists = await Tourist.find().lean();
    const sellers = await Seller.find().lean();
    const tourGuides = await TourGuide.find().lean();
    const advertisers = await Advertiser.find().lean();
    const admins = await Admin.find().lean();
    const governer = await Governer.find().lean();

    const userCounts: UserCount[] = [];

    const users = [
      ...tourists.map((user) => ({ ...user, type: "tourist" })),
      ...sellers.map((user) => ({ ...user, type: "seller" })),
      ...tourGuides.map((user) => ({ ...user, type: "tourGuide" })),
      ...advertisers.map((user) => ({ ...user, type: "advertiser" })),
      ...admins.map((user) => ({ ...user, type: "admin" })),
      ...governer.map((user) => ({ ...user, type: "governer" })),
    ];

    users.forEach((user) => {
      const date = new Date((user as any).timeStamp); // Assuming you have a createdAt field in User schema
      const userYear = date.getFullYear();
      const userMonth = date.getMonth() + 1;
      const day = date.getDate();
      const type = user.type;
      if ((!year || userYear === year) && (!month || userMonth === month)) {
        const existingUserCount = userCounts.find(
          (uc) =>
            uc.year === userYear &&
            uc.month === userMonth &&
            uc.day === day &&
            uc.type === type
        );
        if (existingUserCount) {
          existingUserCount.count += 1;
        } else {
          userCounts.push({
            year: userYear,
            month: userMonth,
            day,
            type,
            count: 1,
          });
        }
      }
    });

    return userCounts;
  } catch (e) {
    throw e;
  }
};
