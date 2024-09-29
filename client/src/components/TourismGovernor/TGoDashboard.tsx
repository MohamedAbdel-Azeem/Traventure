import React from 'react';
import LocationTable from '../LocationTable';
const TGoDashboard = () => {
    type CardDetails = {
        image: string;
        title: string;
        description: string;
        budget: string;
        startingDate: string;
        endingDate: string;
        rating: string;
    }


    return (
        <div className="grid grid-cols-3">
            <LocationTable/>
        </div>
    );
};

export default TGoDashboard;
