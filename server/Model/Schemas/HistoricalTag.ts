import mongoose from "mongoose";

const schema = mongoose.Schema;

const HistoricalTagSchema = new schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true, unique: true },
});

export default mongoose.model("HistoricalTag", HistoricalTagSchema);
