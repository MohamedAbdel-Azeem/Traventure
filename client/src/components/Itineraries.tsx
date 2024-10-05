import React, { useState } from "react";
import ImprovedSidebar from "./ImprovedSidebar";
import ItineraryCardCRUD from "./ItineraryCardCRUD";
import ItineraryModal from "./ItineraryModal";

const Itineraries = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Egyptian History Trip",
      description: "Come visit Egypt!",
      price: "Free→$1000",
      date: "9:00→5:00",
      rating: "4.5",
      language: "English",
      pickupLocation: "Cairo Airport",
      dropoffLocation: "Giza",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
      places: [
        {
          name: "Pyramids of Giza",
          activities: [
            { name: "Guided Tour", duration: "2 hours" },
            { name: "Camel Ride", duration: "1 hour" }
          ]
        },
        {
          name: "Luxor Temple",
          activities: [
            { name: "Historical Tour", duration: "1.5 hours" },
            { name: "Photography", duration: "30 minutes" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Waterpark Adventure",
      description: "Time to get wet.",
      price: "$25→$100",
      date: "9:00→11:00",
      rating: "4.2",
      language: "English",
      pickupLocation: "Local Hotel",
      dropoffLocation: "Waterpark",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      places: [
        {
          name: "Splash Waterpark",
          activities: [
            { name: "Wave Pool Fun", duration: "1 hour" },
            { name: "Water Slide Rides", duration: "1 hour" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Tropical Escape",
      description: "Have some fun on the beach!",
      price: "$10→$50",
      date: "8:00→6:00",
      rating: "4.7",
      language: "English",
      pickupLocation: "Beach Resort",
      dropoffLocation: "Tropical Beach",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1200px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
      places: [
        {
          name: "Tropical Beach Resort",
          activities: [
            { name: "Beach Volleyball", duration: "2 hours" },
            { name: "Snorkeling", duration: "2 hours" }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Temple Visit",
      description: "Come visit these ancient temples",
      price: "$20→$50",
      date: "8:30→4:00",
      rating: "4.3",
      language: "English",
      pickupLocation: "Local Hotel",
      dropoffLocation: "Temple of Karnak",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg",
      places: [
        {
          name: "Temple of Karnak",
          activities: [
            { name: "Temple Exploration", duration: "2 hours" },
            { name: "Guided Tour", duration: "1 hour" }
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Mediterranean Cruise",
      description: "Have fun on our boat",
      price: "$15→$60",
      date: "6:00→7:00",
      rating: "4.8",
      language: "English",
      pickupLocation: "Dock",
      dropoffLocation: "Luxury Yacht",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
      places: [
        {
          name: "Luxury Yacht",
          activities: [
            { name: "Sunset Dinner Cruise", duration: "2 hours" },
            { name: "Swimming", duration: "1 hour" }
          ]
        }
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleCreate = (newCard: any) => {
    const newItinerary = {
      ...newCard,
      id: cards.length + 1,
      language: "English",
      pickupLocation: newCard.pickupLocation || "Default Pickup Location",
      dropoffLocation: newCard.dropoffLocation || "Default Dropoff Location", 
    };
    setCards([...cards, newItinerary]);
  };

  return (
    <div className="flex justify-center">
      <ImprovedSidebar title="Admin" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-4">
        <div
          className="flex w-full h-[334px] bg-[#D9D9D9] rounded-[11px] m-4 hover:bg-[#c0c0c0] transition duration-300 cursor-pointer items-center justify-center shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <p className="m-auto text-[24px] text-center font-bold">Create New Itinerary</p>
        </div>
        {cards.map(card => (
          <ItineraryCardCRUD
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            price={card.price}
            date={card.date}
            rating={card.rating}
            language={card.language}
            pickupLocation={card.pickupLocation} 
            dropoffLocation={card.dropoffLocation} 
            image={card.image}
            onDelete={handleDelete}
            className="hover:bg-[#f0f0f0] transition duration-300 rounded-lg shadow-md overflow-hidden"
            places={card.places} 
          />
        ))}
      </div>
      <ItineraryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreate} />
    </div>
  );
};

export default Itineraries;
