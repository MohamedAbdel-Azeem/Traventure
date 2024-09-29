import mongoose from "mongoose";

const schema = mongoose.Schema;

const HistoricalTagSchema = new schema({
    name: { type: String, required: true},
    type: { type: String, required: true},
});

export default mongoose.model("HistoricalTag", HistoricalTagSchema);
