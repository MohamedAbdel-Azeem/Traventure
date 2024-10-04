import React, { useState } from "react";
import LocationCardCRUD from "./LocationCardCRUD";
import ImprovedSidebar from "./ImprovedSidebar";
import ItineraryCardCRUD from "./ItineraryCardCRUD";

const Locations = () => {

    const [cards, setCards] = useState([
        { id: 1, locationName: "Giza Pyramids", description: "The only wonder of the seven with actual substantial evidence that proves they exist.", price: "Free→$1000", hours: "9:00→5:00", location: "Giza, Egypt", image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg" },
        { id: 2, locationName: "Eiffel Tower", description: "An iconic symbol of France, located in Paris.", price: "$25→$100", hours: "9:00→11:00", location: "Paris, France", image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" },
        { id: 3, locationName: "Great Wall of China", description: "A historic wall stretching across northern China.", price: "$10→$50", hours: "8:00→6:00", location: "China", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1200px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg" },
        { id: 4, locationName: "Statue of Liberty", description: "A symbol of freedom and democracy in the United States.", price: "$20→$50", hours: "8:30→4:00", location: "New York, USA", image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
        { id: 5, locationName: "Taj Mahal", description: "A magnificent mausoleum built by Mughal Emperor Shah Jahan.", price: "$15→$60", hours: "6:00→7:00", location: "Agra, India", image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg" },
    ]);

    const handleDelete = (id: number) => {
        setCards(cards.filter(card => card.id !== id));
    };
    const handleCreate = () => {
        const newCard = {
            id: cards.length + 1,
            locationName: "New Place",
            description: "Description of the new place.",
            price: "Free",
            hours: "9:00→5:00",
            location: "Unknown",
            image: "https://via.placeholder.com/422x121",
        };
        setCards([...cards, newCard]);
    };
    return ( 
    <div className="flex justify-center">
        <ImprovedSidebar title="Admin"/>
    <div className="grid grid-cols-3 mt-10">
    <div className="flex w-[422px] h-[334px] bg-[#D9D9D9] rounded-[11px] m-4 hover:bg-[#c0c0c0] transition duration-300 cursor-pointer" onClick={handleCreate}>
                    <p className="m-auto text-[40px]">
                        Create New Place
                    </p>
                </div>
            {cards.map(card => (
                <LocationCardCRUD
                key={card.id}
                id={card.id}
                locationName={card.locationName}
                description={card.description}
                price={card.price}
                hours={card.hours}
                location={card.location}
                image={card.image}
                onDelete={handleDelete}
                className="hover:bg-[#f0f0f0] transition duration-300"
            />
            ))}
        </div>

    </div>
    
     );
}
 
export default Locations;