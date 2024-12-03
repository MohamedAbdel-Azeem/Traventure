import mongoose from "mongoose";

const schema = mongoose.Schema;

const AdminSchema = new schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timeStamp: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Admin", AdminSchema);
