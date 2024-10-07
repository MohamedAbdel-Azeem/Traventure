import mongoose from "mongoose";

const schema = mongoose.Schema;

const CategorySchema = new schema({
    name: {type: String, required: true, unique: true}});

export default mongoose.model("Category", CategorySchema);