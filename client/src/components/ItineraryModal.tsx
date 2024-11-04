import React from "react";
import { Modal } from "@mui/material";
import ImprovedCreateItinerary from "./ImprovedCreateItinerary";

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const ItineraryModal: React.FC<ItineraryModalProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {

  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={isOpen}
      onClose={onClose}
    >
      <ImprovedCreateItinerary isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Modal>
  );
};

export default ItineraryModal;
