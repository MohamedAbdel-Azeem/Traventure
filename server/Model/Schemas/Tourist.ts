import mongoose from "mongoose";

const Schema = mongoose.Schema;

const touristSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber:  { type: String, required: true , unique: true },
  dateOfBirth: { type: Date, required: true , immuatable: true },
  nationality: { type: String, required: true , unique: true },
  Occupation: { type: String, required: true},
  

});

export default mongoose.model('Tourist', touristSchema);