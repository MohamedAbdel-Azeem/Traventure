interface Place {
  _id?: string;
  name: string;
  description: string;
  pictures: string[];
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
  historicalTags: object[];
}

export default Place;
