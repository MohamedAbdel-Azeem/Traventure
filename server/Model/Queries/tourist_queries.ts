import { hashPassword } from "../../utils/functions/bcrypt_functions";
import touristModel from "../Schemas/Tourist";
import Itinerary from '../Schemas/Itinerary';
import Activity from '../Schemas/Activity';
import Place from '../Schemas/Places';

export async function getAll() {
    try {
         // Fetch upcoming itineraries
         const itineraries = await Itinerary.find({ starting_Date: { $gte: new Date() } }).populate('added_By')
         .populate('added_By')
    .populate('plan.place')
    .populate('plan.activities.activity_id')
    .populate('selectedTags');

         // Fetch upcoming activities
         const activities = await Activity.find({ DateAndTime: { $gte: new Date() } }).populate("Tags").populate("Category");
 
         // Fetch historical places/museums
         const places = await Place.find();

        return {itineraries, activities, places};

    } catch (err) {
      throw err;
    }
  }

module.exports = {getAll}; 

