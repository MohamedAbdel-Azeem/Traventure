import mongoose from "mongoose";

const schema = mongoose.Schema;

const TagsSchema = new schema({name: {type: String, required: true, unique: true}});

export default mongoose.model("PreferenceTags", TagsSchema);