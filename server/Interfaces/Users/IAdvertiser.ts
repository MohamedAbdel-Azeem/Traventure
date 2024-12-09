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
  notifications: {
    message: string;
    sent_by_mail: boolean;
    read: boolean;
    createdAt: Date;
  }[];


}

export default IAdvertiser;
