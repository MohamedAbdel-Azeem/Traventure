import mongoose from "mongoose";

const schema = mongoose.Schema;

const GovernerSchema = new schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("Governer", GovernerSchema);
