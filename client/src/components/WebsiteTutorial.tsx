import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Backdrop,
  Fade,
} from "@mui/material";

interface WebsiteTutorialProps {
  open: boolean;
  onClose: () => void;
  userType: string;
}

const WebsiteTutorial: React.FC<WebsiteTutorialProps> = ({
  open,
  onClose,
  userType,
}) => {
  const userText = {
    admin: [
      "Welcome to the admin dashboard! Manage users and monitor sales from here.",
      "Use the 'Cats & Tags' section to organize product categories.",
      "Review applications and ensure smooth operations.",
    ],
    seller: [
      "Track your sales and manage your shop effectively here.",
      "Use the sales tab to review performance metrics.",
    ],
    tourist: [
      "Discover exciting locations and activities tailored for you.",
      "Use the itineraries tab to manage your planned trips.",
      "Don’t forget to check out hotels and flights for your convenience!",
    ],
    guest: [
      "Welcome, guest! Explore shops, activities, and places before registering.",
      "Sign up to unlock personalized features!",
    ],
    advertiser: [
      "Manage your promotional activities and reach your target audience.",
      "Use the activity management tab to track engagement metrics.",
    ],
    tourismgovernor: [
      "Welcome, Tourism Governor! Monitor historical tags and locations.",
      "Ensure quality standards are maintained across all regions.",
    ],
    tourguide: [
      "Manage your itineraries and explore available locations to guide visitors.",
      "Access tools to make your tours engaging and efficient.",
    ],
  };


  const [currentPage, setCurrentPage] = useState(0);
  const maxPages = userText[userType]?.length || 0;

  const handleNext = () => {
    if (currentPage < maxPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "80%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" mb={2} align="center">
            Website Tutorial
          </Typography>
          <Typography variant="body1" mb={4}>
            {userText[userType]?.[currentPage] ||
              "No content available for this user type."}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Typography>
              Page {currentPage + 1} of {maxPages}
            </Typography>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentPage === maxPages - 1}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default WebsiteTutorial;
