import React from 'react';
import ItineraryCard from '../ItineraryCard';
const Dashboard = () => {
    type CardDetails = {
        image: string;
        title: string;
        description: string;
        budget: string;
        startingDate: string;
        endingDate: string;
        rating: string;
    }


    return (<div className="flex justify-center">
<div className="grid grid-cols-3">
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
                <ItineraryCard/>
        </div>
    </div>
        
    );
};

export default Dashboard;