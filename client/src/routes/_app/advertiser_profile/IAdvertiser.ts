export interface IAdvertiser {
    username: string;
    email: string;
    password: string;
    profilepic: string;
    websiteLink: string;
    hotline: string;
    company: string;
    isAccepted: boolean;
    founded: number;
    description: string;   
    location: string;
    wallet?: number;
    _id?: string;
}