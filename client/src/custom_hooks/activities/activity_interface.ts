
import { ReactNode } from "react";

export interface IActivity {
    activity_id?: any;
    time_unit?: ReactNode;
    activity_duration?: ReactNode;
    _id?: string;
    Title?: string;
    DateAndTime: Date;
    Location: {
        latitude: number;
        longitude: number;
    };
    Price: number;
    SpecialDiscount: number;
    Category: string;
    Tags: string[];
    BookingIsOpen: boolean;
    added_By?: string;
}



type DataStructure = {
  toLowerCase(): unknown;
  _id: string;
  name: string;
  __v: number;
}
export interface Activity {
    id: any;
   _id: string;
    Title: string;
    DateAndTime: Date;  
    Location: {
      latitude: number,
      longitude: number,
  },
  feedback: {
    name: string,
    rating: string,
    review: string,
  }[],
    Price: number; 
    SpecialDiscount: number; 
    Category: DataStructure; 
    Tags: DataStructure[]; 
    BookingIsOpen: boolean;
    added_By: string; 
    
}
