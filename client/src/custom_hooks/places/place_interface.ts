interface Place {
    _id? : string;
    name: string;
    description: string;
    pictures: string[];
    added_By:string;
    historicalTags: string[];
    location: {
        latitude: number;
        longitude: number;
    };
    opening_hrs: string;
    ticket_price: {
        native: number;
        foreign: number;
        student: number;
    };
}

export default Place;