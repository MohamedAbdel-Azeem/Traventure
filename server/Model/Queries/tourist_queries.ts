import { hashPassword } from "../../utils/functions/bcrypt_functions";
import touristModel from "../Schemas/Tourist";
import Itinerary from "../Schemas/Itinerary";
import Activity from "../Schemas/Activity";
import Place from "../Schemas/Places";
import Booking from "../Schemas/Booking";
import Product from "../Schemas/Product";
import Complaint from "../Schemas/complaint";
import { getprofileInfo } from "./user_queries";
import mongoose from "mongoose";
import complaint from "../Schemas/complaint";
import { console } from "inspector";

interface Tourist extends Document {
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  dateOfBirth: Date;
  nationality: string;
  Occupation: string;
  wallet: number;
  bookings: mongoose.Types.ObjectId[] | null;
}
export async function getAll() {
  try {
    // Fetch upcoming itineraries
    const itineraries = await Itinerary.find({
      starting_Date: { $gte: new Date() },
    })
      .populate("added_By")
      .populate("added_By")
      .populate("plan.place")
      .populate("plan.activities.activity_id")
      .populate("selectedTags");

    // Fetch upcoming activities
    const activities = await Activity.find({
      DateAndTime: { $gte: new Date() },
    })
      .populate("Tags")
      .populate("Category");

    // Fetch historical places/museums
    const places = await Place.find().populate("historicalTags");

    return { itineraries, activities, places };
  } catch (err) {
    throw err;
  }
}
export async function getTouristBookings(username: string) {
  try {
    const tourist = await touristModel
      .findOne({ username: username })
      .populate([
        {
          path: "bookings",
          populate: [
            {
              path: "itinerary",
              select: "title _id", // specify the fields you want to populate
            },
            {
              path: "activity",
              select: "Title _id", // specify the fields you want to populate
            },
          ],
        },
      ]);
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const { bookings } = tourist as unknown as Tourist;
    return bookings;
  } catch (error) {
    throw error;
  }
}

export async function getTouristBookmarks(username: string) {
  try {
    const tourist = await touristModel
      .findOne({ username: username })
      .populate("bookmarkedActivities")
      .populate("bookmarkedItineraries");
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    console.log(tourist);
    let bookmarkedActivities = await Activity.find({
      _id: { $in: tourist.bookmarkedActivities },
      inappropriate: false,
    })
      .populate("Tags")
      .populate("Category");
    let bookmarkedItineraries = await Itinerary.find({
      _id: { $in: tourist.bookmarkedItineraries },
      inappropriate: false,
    })
      .populate("added_By")
      .populate("plan.place")
      .populate("plan.activities.activity_id")
      .populate("selectedTags");
    return { bookmarkedItineraries, bookmarkedActivities };
  } catch (error) {
    throw error;
  }
}

export async function gettouristComplaints(username: string) {
  try {
    const Complaints = await complaint.find({ username: username }).populate([
      {
        path: "booking_Id",
        populate: [
          {
            path: "itinerary",
            select: "title _id", // specify the fields you want to populate
          },
          {
            path: "activity",
            select: "Title _id", // specify the fields you want to populate
          },
        ],
      },
    ]);
    return Complaints;
  } catch (error) {
    throw error;
  }
}

export async function getTouristUpcoming(username: string) {
  try {
    const tourist = await touristModel.findOne({ username: username });
    const bookings = await Booking.find({ tourist: (tourist as any)._id });
    const { itineraries, places, activities } = await getAll();

    const filteredItineraries = itineraries.filter(
      (itinerary) =>
        !bookings.some(
          (booking) =>
            (booking as any).itinerary &&
            (booking as any).itinerary.equals((itinerary as any)._id)
        )
    );

    // Filter out activities that are already in the bookings
    const filteredActivities = activities.filter(
      (activity) =>
        !bookings.some(
          (booking) =>
            (booking as any).activity &&
            (booking as any).activity.equals((activity as any)._id)
        )
    );

    return {
      itineraries: filteredItineraries,
      places,
      activities: filteredActivities,
    };
  } catch (error) {
    throw error;
  }
}

export async function toggleWishlistProduct(
  username: string,
  productId: string
) {
  try {
    const tourist = await touristModel.findOne({ username: username });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    let action;
    if (tourist.wishlisted_products.includes(productObjectId)) {
      tourist.wishlisted_products = tourist.wishlisted_products.filter(
        (id) => !id.equals(productObjectId)
      );
      action = "removed";
    } else {
      tourist.wishlisted_products.push(productObjectId);
      action = "added";
    }

    await tourist.save();
    return { action, productId };
  } catch (error) {
    throw error;
  }
}

export async function skipWebsiteTutorial(username: string) {
  try {
    const tourist = await touristModel.findOne({ username: username });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    tourist.skipWebsiteTutorial = true;
    await tourist.save();
    return "Tutorial skipped";
  } catch (error) {
    throw error;
  }
}

export async function getSkipTutorialStatus(username: string) {
  try {
    const tourist = await touristModel
      .findOne({ username: username })
      .select("skipWebsiteTutorial");
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    return tourist.skipWebsiteTutorial;
  } catch (error) {
    throw error;
  }
}

export async function bookmarkActivity(
  touristUsername: string,
  activityId: string
) {
  try {
    const tourist = await touristModel.findOne({ username: touristUsername });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const activity = await Activity.findById(activityId);
    if (!activity) {
      throw new Error("Activity not found");
    }
    const activityObjectId = new mongoose.Types.ObjectId(activityId);
    if (!tourist.bookmarkedActivities.includes(activityObjectId)) {
      tourist.bookmarkedActivities.push(activityObjectId);
      await tourist.save();
    } else {
      throw new Error("Activity already bookmarked");
    }
  } catch (err: any) {
    throw err;
  }
}

export async function bookmarkItinerary(
  touristUsername: string,
  itineraryId: string
) {
  try {
    const tourist = await touristModel.findOne({ username: touristUsername });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      throw new Error("Itinerary not found");
    }
    const itineraryObjectId = new mongoose.Types.ObjectId(itineraryId);
    if (!tourist.bookmarkedItineraries.includes(itineraryObjectId)) {
      tourist.bookmarkedItineraries.push(itineraryObjectId);
      await tourist.save();
    } else {
      throw new Error("Itinerary already bookmarked");
    }
  } catch (err: any) {
    throw err;
  }
}
export async function getPromoCodeUsed(username: string) {
  try {
    const tourist = await touristModel.findOne({ username });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    return tourist.promo_sent;
  } catch (err) {
    throw err;
  }
}
export async function setPromoCodeUsed(username: string) {
  try {
    const tourist = await touristModel.findOne({ username: username });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    tourist.promo_sent = true;
    await tourist.save();
  } catch (err) {
    throw err;
  }
}

export async function updateUserWallet(username: string, amount: number) {
  try {
    const tourist = await touristModel.findOne({ username });
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    tourist.wallet += amount;
    await tourist.save();
    return tourist;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAll,
  getTouristBookings,
  gettouristComplaints,
  getTouristUpcoming,
  bookmarkActivity,
  bookmarkItinerary,
  getTouristBookmarks,
  toggleWishlistProduct,
  skipWebsiteTutorial,
  getSkipTutorialStatus,
  getPromoCodeUsed,
  setPromoCodeUsed,
  updateUserWallet,
};
