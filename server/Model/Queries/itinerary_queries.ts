//import dayjs from 'dayjs';
import Itinerary from "../Schemas/Itinerary";
import TourGuide from "../Schemas/TourGuide";
import { ItineraryDocument } from "../../Interfaces/IItinerary";
import Booking from "../Schemas/Booking";
import Tourist from "../Schemas/Tourist";

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
