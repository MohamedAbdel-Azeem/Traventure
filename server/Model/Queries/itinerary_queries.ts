//import dayjs from 'dayjs';
import Itinerary from "../Schemas/Itinerary";
import TourGuide from "../Schemas/TourGuide";

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
      .populate("plan.place")
      .populate("plan.activities.activity_id")
      .populate("selectedTags");

    return itineraries;
  } catch (error) {
    throw error;
  }
}

export async function getAllItinerary() {
  try {
    const itineraries = await Itinerary.find().populate('added_By')
    .populate('plan.place')
    .populate('plan.activities.activity_id')
    .populate('selectedTags')
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
