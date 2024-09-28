// image: string;
//         title: string;
//         description: string;
//         budget: string;
//         startingDate: string;
//         endingDate: string;
//         rating: string;
import mongoose from "mongoose";

const schema = mongoose.Schema;

const itinerarychema = new schema({
    main_Picture: {type: String},
    title: { type: String, required: true },
    description: { type: String, required: true },
    added_By:{type: String, required: true },
    pictures: { type: [String]},
    price:{type: Number, required:true},
    starting_Date: {type: Date, required:true},
    ending_Date: {type: Date, required:true},
    rating: {type: Float64Array, required:true},
    total: {type: Number, required:true},
    language:{type: String, required:true},
    places:[{
        place_id: { type: String, required: true },
    }],
    activities:[{
        activity_id: { type: String, required: true },
    }]
    
  });
  
  export default mongoose.model("Itinerary", itinerarychema);