import { Document } from "mongoose";

export interface IAdvertiser extends Document {
  username: string;
  email: string;
  password: string;
  websiteLink: String;
  hotline: String;
  company: String;
  isAccepted: boolean;
  founded: Number;
  description: String;
  location: String;

}

export default IAdvertiser;
