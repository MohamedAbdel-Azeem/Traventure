import React, { useState, useEffect } from "react";
import ItineraryCardCRUD from "./ItineraryCardCRUD";
import ItineraryModal from "./ItineraryModal";
import useGetItinerary from "../../../../custom_hooks/itineraries/useGetItinerary";
import Itinerary from "../../../../custom_hooks/itineraries/itinerarySchema";
import useDeleteItinerary from "../../../../custom_hooks/itineraries/useDeleteItinerary";
import { useParams } from "react-router-dom";

const Itineraries = () => {
  const [cards, setCards] = useState<Itinerary[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null); // To track which card is being deleted
  const { username } = useParams();
  const { itinerary, loading, error } = useGetItinerary(username);
  const { deleteItinerary, success } = useDeleteItinerary();

  useEffect(() => {
    if (itinerary) {
      setCards(itinerary);
    }
  }, [itinerary]);

  const handleCreateItinerary = (itineraryData: Itinerary) => {
    setCards([...cards, itineraryData]);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id); // Mark the current itinerary as being deleted
    await deleteItinerary(id);

    if (success) {
      const filteredCards = cards.filter((card: Itinerary) => card._id !== id);
      setCards(filteredCards);
    } else {
      console.error("Error deleting itinerary");
    }

    setDeletingId(null); // Reset deletion state
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-4">
        <div
          className="flex w-full h-[334px] bg-[#D9D9D9] rounded-[11px] m-4 hover:bg-[#c0c0c0] transition duration-300 cursor-pointer items-center justify-center shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <p className="m-auto text-[24px] text-center font-bold">
            Create New Itinerary
          </p>
        </div>
        {cards.map((card: Itinerary) => (
          <ItineraryCardCRUD
            key={card._id}
            _id={card._id}
            title={card.title}
            description={card.description}
            price={card.price}
            starting_Date={
              card.starting_Date
                ? new Date(card.starting_Date).toISOString()
                : "N/A"
            }
            ending_Date={
              card.ending_Date
                ? new Date(card.ending_Date).toISOString()
                : "N/A"
            }
            rating={card.rating}
            language={card.language}
            pickup_location={card.pickup_location}
            dropoff_location={card.dropoff_location}
            main_Picture={card.main_Picture}
            plan={card.plan}
            selectedTags={card.selectedTags}
            onDelete={() => handleDelete(card._id)}
            isDeleting={deletingId === card._id}
            added_By={card.added_By}
            total={card.total}
            booked_By={card.booked_By}
            accesibility={card.accesibility}
            bookingActivated={card.bookingActivated}
            inappropriate={card.inappropriate}
            allowBooking={card.allowBooking}
            InterestedUsers={card.InterestedUsers}
          />
        ))}
      </div>
      <ItineraryModal
        handleCreateItinerary={handleCreateItinerary}
        isOpen={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Itineraries;
