export interface ISeller {
  _id?: string;
  username: string;
  email: string;
  password: string;
  name: string;
  description: string;
  isAccepted: boolean;
}
