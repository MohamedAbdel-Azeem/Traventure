import { Document } from "mongoose";

export interface IAdvertiser extends Document {
  username: string;
  email: string;
  password: string;
  websiteLink?: String;
  hotline: String;
  companyProfile: String;
  isAccepted: boolean;
}

export default IAdvertiser;
