import mongoose from "mongoose";

const schema = mongoose.Schema;

const CodeSchema = new schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true }
});

export default mongoose.model("Code", CodeSchema);
