import { Document } from "mongoose";

export interface ISeller extends Document {
  username: string;
  email: string;
  password: string;
  name?: string;
  description?: string;
  isAccepted: boolean;
}

export default ISeller;
