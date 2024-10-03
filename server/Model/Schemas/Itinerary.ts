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
    main_Picture: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    added_By: { type: mongoose.Types.ObjectId, required: true , ref:'TourGuide' },
    price: { type: Number, required: true },
    starting_Date: { type: Date, required: true },
    ending_Date: { type: Date, required: true },
    rating: { type: Number, required: true },
    total: { type: Number, required: true },
    language: { type: String, required: true },
    pickup_location: { type: String, required: true },
    dropoff_location: { type: String, required: true },
    plan:[
        {
            place: { type: mongoose.Types.ObjectId, ref: 'Place' },
            activities: [{
                activity_id: { type: mongoose.Types.ObjectId, ref: 'Activity' },
                activity_duration:{ 
                    type: Number, required:true
                },
                time_unit:{
                    type: String, required:true
                }
            }],
        }
    ],
    booked_By: [{
        user_id: { type: mongoose.Types.ObjectId, ref: 'Tourist' }
    }],
    accesibility: { type: Boolean, required: true }
});
// ToDo: plan a way to do timeline
export default mongoose.model("Itinerary", itinerarychema);