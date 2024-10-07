type DataStructure = {
  _id: string;
  name: string;
  __v: number;
}
interface Activity {
   _id: string;
    Title: string;
    DateAndTime: Date;  
    Location: {
      latitude: number,
      longitude: number,
  },
    Price: number; 
    SpecialDiscount: number; 
    Category: DataStructure; 
    Tags: DataStructure[]; 
    BookingIsOpen: boolean;
    added_By: string; 
}

export default Activity;