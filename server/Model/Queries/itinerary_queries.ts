import Itinerary from "../Schemas/Itinerary";
import dayjs from 'dayjs';

export async function getItinerary( tour_guide_id :String) {
    try {
      // Use MongoDB's query to find items with the searchTerm in a certain field (e.g., "name" or "description")
      const itineraries = await Itinerary.find({
       
        added_By: { $regex: tour_guide_id }  
        }).populate('places') ;
  
      return itineraries;
    } catch (error) {
      throw error;
    }
  }

  export async function getUpcomingItinerary() {
    try {
      const currentDate = new Date();
  
      const itineraries = await Itinerary.find({
        starting_Date: {
          $gte: currentDate 
        }
      }).populate('place_id') ;
  
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
      const place = await Itinerary.findByIdAndDelete(itinerary_Id );
      return place;
    } catch (error) {
      throw error;
    }
  }