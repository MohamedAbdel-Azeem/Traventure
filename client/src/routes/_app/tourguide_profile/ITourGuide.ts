export interface ITourGuide {
  _id?: string;
  username: string;
  wallet?: number;
  email: string;
  password: string;
  profilepic: string;
  mobileNumber?: string;
  yearsOfExperience?: number;
  previousWork?: {
    company: string;
    startDate: Date;
    endDate: Date | null;
    stillWorkHere: boolean;
    role: string;
    location: string;
    description: string;
  }[];
}
