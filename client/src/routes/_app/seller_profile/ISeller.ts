export interface ISeller {
  _id?: string;
  username: string;
  email: string;
  password: string;
  profilepic: string;
  name: string;
  description: string;
  isAccepted: boolean;
  wallet?: number;
}
