import dayjs from 'dayjs';
import Itinerary from "../Schemas/Itinerary";

export async function getItinerary(tour_guide_id: String) {
  try {
    // Use MongoDB's query to find items with the searchTerm in a certain field (e.g., "name" or "description")
    const itineraries = await Itinerary.find({
      added_By: { $regex: tour_guide_id }
    }).populate('places.place_id')
      .populate('activities.activity_id')

    return itineraries;
  } catch (error) {
    throw error;
  }
}

export async function getUpcomingItinerary() {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const itineraries = await Itinerary.find()
      .populate('places.place_id')
      .populate('activities.activity_id')

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

export async function updateItinerary(itinerary_Id: string, new_Itinerary: Object) {
  try {
    const place = await Itinerary.findByIdAndUpdate(itinerary_Id, new_Itinerary);
    return place;
  } catch (error) {
    throw error;
  }
}

export async function deleteItinerary(itinerary_Id: string) {
  try {
    const place = await Itinerary.findByIdAndDelete(itinerary_Id);
    return place;
  } catch (error) {
    throw error;
  }
}