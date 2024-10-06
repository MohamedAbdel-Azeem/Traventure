import React, { useState, useEffect } from "react";
import ImprovedSidebar from "./ImprovedSidebar";
import ItineraryCardCRUD from "./ItineraryCardCRUD";
import ItineraryModal from "./ItineraryModal";
import useGetItinerary from "../custom_hooks/itineraries/useGetItinerary";
import Itinerary from "../custom_hooks/itineraries/itinerarySchema";

const Itineraries = () => {
  const [cards, setCards] = useState<Itinerary[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { itinerary, loading, error } = useGetItinerary("66f6e4f9fe182e23156d18d6");

  useEffect(() => {
    if (itinerary) {
      setCards(itinerary);
    }
  }, [itinerary]);

  const handleDelete = (id: string) => {
    const filteredCards = cards.filter((card: Itinerary) => card._id !== id);
    setCards(filteredCards);
  };

  const handleCreate = (newCard: Partial<Itinerary>) => {
    // const newItinerary: Itinerary = {
    //   ...newCard,
    //   _id: `${cards.length + 1}`, // Replace with your actual ID generation logic
    //   language: newCard.language || "English",
    //   pickup_location: newCard.pickup_location || "Default Pickup Location",
    //   dropoff_location: newCard.dropoff_location || "Default Dropoff Location",
    //   starting_Date: newCard.starting_Date || new Date().toISOString(),
    //   ending_Date: newCard.ending_Date || new Date().toISOString(),
    //   selectedTags: newCard.selectedTags || [],
    //   plan: newCard.plan || [],
    //   booked_By: [],
    //   accesibility: newCard.accesibility || false,
    //   price: newCard.price || 0,
    //   title: newCard.title || "Untitled",
    //   description: newCard.description || "No description available",
    //   rating: newCard.rating || 0,
    //   main_Picture: newCard.main_Picture || "",
    //   total: newCard.total || 0,
    // };
    // setCards([...cards, newItinerary]);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }
  if (error) {
    return <div>Error: {error}</div>; 
  }

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
        {cards.map((card: Itinerary) => (
          <ItineraryCardCRUD
            key={card._id}
            _id={card._id}
            title={card.title}
            description={card.description}
            price={card.price}
            starting_Date={card.starting_Date ? new Date(card.starting_Date).toLocaleDateString() : "N/A"}
            ending_Date={card.ending_Date ? new Date(card.ending_Date).toLocaleDateString() : "N/A"}
            rating={card.rating}
            language={card.language}
            pickup_location={card.pickup_location}
            dropoff_location={card.dropoff_location}
            main_Picture={card.main_Picture}
            plan={card.plan}
            selectedTags={card.selectedTags}
            onDelete={handleDelete} added_By={""} total={0} booked_By={[]} accesibility={false}          />
        ))}
      </div>
      <ItineraryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreate} />
    </div>
  );
};

export default Itineraries;
