import ActivityCard from "../../../components/ActivityCard";
import ImprovedSidebar from "../../../components/ImprovedSidebar";
import React, { useState } from "react";
export const Activities = ()=>{
 
  type Activity = {
    date: string; 
    time: string; 
    location: string;
    price: string; 
    category: string; 
    tags: string[]; 
    special_discounts: string
    status: 'open' | 'closed'; 
};
const [activities, setActivities] = useState<Activity[]>( [
  { date: '19/02/2004', time: '4:00', location:'Giza', price:'300,000', category:'Stand-up comedy', tags:["a","b","c"],special_discounts:'',status:'closed' },
  { date: '19/02/2024', time: '9:00', location:'Mokattam', price:'300,000', category:'Stand-up comedy', tags:["a","b","c"],special_discounts:'',status:'open' },
  { date: '19/02/2044', time: '11:00', location:'Zahraa', price:'300,000', category:'Stand-up comedy', tags:["a","b","c"],special_discounts:'',status:'closed' },
  { date: '19/02/2064', time: '6:00', location:'Madinaty', price:'300,000', category:'Stand-up comedy', tags:["a","b","c"],special_discounts:'',status:'open' },
  { date: '19/02/2014', time: '2:00', location:'3rd Settlement', price:'300,000', category:'Stand-up comedy', tags:["a","b","c"],special_discounts:'',status:'open' },
]);

  const handleEdit = (activity: Activity) => {
    console.log('Editing activity:', activity);
};

const handleDelete = (activity: Activity) => {
    setActivities(prevActivities => prevActivities.filter(a => a !== activity));
};


  return(
    <div className="w-full h-full flex">
      <ImprovedSidebar title="Advertiser"/>
      <div className="grid grid-cols-3 ml-8">{activities.map((cactivity:Activity) => (
        <ActivityCard activity={cactivity}
        onEdit={handleEdit}
        onDelete={handleDelete} key={cactivity.location} />
    ))}
    </div>
    </div>
    
);
}