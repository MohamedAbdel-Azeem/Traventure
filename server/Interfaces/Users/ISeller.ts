import { Document } from "mongoose";

export interface ISeller extends Document {
  username: string;
  email: string;
  password: string;
  name?: string;
  description?: string;
  isAccepted: boolean;
  notifications: {
    message: string;
    sent_by_mail: boolean;
    read: boolean;
    createdAt: Date;
  }[];
}

export default ISeller;
