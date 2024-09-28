import React from 'react';
import { useEffect, useState } from 'react';
import { AccountsData } from '../data/AccountsData';
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


    return (
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
    );
};

export default Dashboard;
