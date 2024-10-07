import { ReactNode } from "react";

interface IActivity {
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
}

export default IActivity;