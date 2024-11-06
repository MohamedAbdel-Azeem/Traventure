import mongoose from "mongoose";

const schema = mongoose.Schema;

const RequestDeleteSchema = new schema({
    
    user_id: { type: mongoose.Types.ObjectId, required: true},
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    wallet: { type: Number, required: true },
    });

export default mongoose.model("RequestDelete", RequestDeleteSchema);