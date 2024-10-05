interface IActivity {
    _id?: string;
    Title: string;
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