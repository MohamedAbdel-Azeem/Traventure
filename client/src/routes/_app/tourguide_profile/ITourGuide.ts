export interface ITourGuide {
  _id?: string;
  username: string;
  email: string;
  password: string;
  mobileNumber?: string;
  yearsOfExperience?: number;
  previousWork?: {
    company: string;
    startDate: Date;
    endDate: Date;
    role: string;
    location: string;
    description: string;
  }[];
}
