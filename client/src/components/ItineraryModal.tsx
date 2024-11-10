import React from "react";
import { Modal } from "@mui/material";
import ImprovedCreateItinerary from "./ImprovedCreateItinerary";

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  handleCreateItinerary: (itineraryData: any) => void;
}

const ItineraryModal: React.FC<ItineraryModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  handleCreateItinerary
}) => {
  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={isOpen}
      onClose={onClose}
    >
      <ImprovedCreateItinerary
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        handleCreateItinerary={handleCreateItinerary}
      />
    </Modal>
  );
};

export default ItineraryModal;
