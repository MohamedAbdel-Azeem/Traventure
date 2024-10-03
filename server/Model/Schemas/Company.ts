import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  logo: { type: String, required: true },
  about: { type: String, required: true },
  websiteLink: String,
  hotline: String,
});

export default mongoose.model("Company", CompanySchema);
