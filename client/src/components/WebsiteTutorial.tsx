import React, { useState } from "react";
import { Box, Button, Modal, Typography, Backdrop, Fade, Grid, Paper } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { Shop as ShopIcon } from "@mui/icons-material";
import { ShowChart as ShowChartIcon } from "@mui/icons-material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { Category as CategoryIcon } from "@mui/icons-material";
import { Description as DescriptionIcon } from "@mui/icons-material";
import { EditCalendar as EditCalendarIcon } from "@mui/icons-material";
import { FlightTakeoff as FlightTakeoffIcon } from "@mui/icons-material";
import { LocationOn as LocationOnIcon } from "@mui/icons-material";
import { Stadium as StadiumIcon } from "@mui/icons-material";
import { Hotel as HotelIcon } from "@mui/icons-material";
import { Flight as FlightIcon } from "@mui/icons-material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { ShoppingBasket as ShoppingBasketIcon } from "@mui/icons-material";
import { HowToVote as HowToVoteIcon } from "@mui/icons-material";
import { Logout as LogoutIcon } from "@mui/icons-material";


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
    tourist: [
      "Welcome to Traventure! As a tourist, you can explore and enjoy many of our features that we have to offer. Click 'Next' to learn more.",
      " ",
      " ",
    ],
    guest: [
      "Welcome, guest! Explore shops, activities, and places before registering.",
      "Sign up to unlock personalized features!",
    ],
  };

  const pageTitles = {
    tourist: [
      "Welcome to Traventure!",
      "Navigation Bar Overview",
      "Profile Dropdown Overview",
    ],
    guest: ["Welcome, Guest!", "Sign Up for More Features"],
  };

  const navbarDescriptions = {
    tourist: [
      {
        name: "Home",
        icon: <HomeIcon />,
        description: "View the home page to check upcoming events.",
      },
      {
        name: "Shop",
        icon: <ShopIcon />,
        description: "Explore the available shops and products.",
      },
      {
        name: "Bookings",
        icon: <EditCalendarIcon />,
        description: "Manage and view your bookings.",
      },
      {
        name: "Itineraries",
        icon: <FlightTakeoffIcon />,
        description: "View and manage your itineraries.",
      },
      {
        name: "Locations",
        icon: <LocationOnIcon />,
        description: "Discover and explore various locations.",
      },
      {
        name: "Activities",
        icon: <StadiumIcon />,
        description: "Browse and book activities at your destinations.",
      },
      {
        name: "Hotels",
        icon: <HotelIcon />,
        description: "Find and book hotels during your travels.",
      },
      {
        name: "Flights",
        icon: <FlightIcon />,
        description: "Search and book flights to your next destination.",
      },
    ],
    guest: [
        {
          name: "Home",
          icon: <HomeIcon />,
          description: "View the home page to check upcoming events.",
        },
        {
          name: "Shop",
          icon: <ShopIcon />,
          description: "Explore the available shops and products.",
        },
        {
          name: "Bookings",
          icon: <EditCalendarIcon />,
          description: "Manage and view your bookings.",
        },
        {
          name: "Itineraries",
          icon: <FlightTakeoffIcon />,
          description: "View and manage your itineraries.",
        },
        {
          name: "Locations",
          icon: <LocationOnIcon />,
          description: "Discover and explore various locations.",
        },
        {
          name: "Activities",
          icon: <StadiumIcon />,
          description: "Browse and book activities at your destinations.",
        },
        {
          name: "Hotels",
          icon: <HotelIcon />,
          description: "Find and book hotels during your travels.",
        },
        {
          name: "Flights",
          icon: <FlightIcon />,
          description: "Search and book flights to your next destination.",
        },
      ],
  };

  const profileDropdownItems = [
    { text: "Profile", icon: <AccountCircleIcon />, description: "View and edit your profile." },
    { text: "Wishlist", icon: <FavoriteIcon />, description: "View and manage your wishlist." },
    { text: "Purchases", icon: <ShoppingBasketIcon />, description: "View your purchase history." },
    { text: "Complaints", icon: <HowToVoteIcon />, description: "Submit complaints and feedback." },
    { text: "Logout", icon: <LogoutIcon />, description: "Logout of your account." },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const maxPages = userText[userType]?.length || 0;

  const handleNext = () => {
    if (currentPage < maxPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleSkip = () => {
    setCurrentPage(maxPages - 1); 
  };

  const handleDontShowAgain = () => {

    console.log("Don't show again clicked");
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    width: "80%",
    height: "80%",
    maxWidth: "60%",
    display: "flex",
    flexDirection: "column",
    p: 4,
    border: "5px solid #8b3fe8", 
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
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" mb={2} align="center">
            {pageTitles[userType]?.[currentPage] || "Website Tutorial"}
          </Typography>

          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
            {/* Page 1 (Navigation Bar) */}
            {currentPage === 1 && (
              <Box>
                <Grid container spacing={2}>
                  {navbarDescriptions[userType]?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          height: "150px", 
                          width: "100%", 
                          overflow: "hidden",
                        }}
                      >
                        <Box sx={{ mr: 2 }}>
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {item.name}
                          </Typography>
                          <Typography variant="body2">{item.description}</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            
            {currentPage === 2 && (
              <Box>
                <Typography variant="body1">
                 Located at the top right of the navigation bar, the profile dropdown mainly allows you to access your profile page as well as additional miscellaneous features.
                </Typography>
                <Grid container spacing={2} mt={2}>
                  {profileDropdownItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper sx={{ p: 2, display: "flex", alignItems: "center", height: "150px", width: "100%" }}>
                        {item.icon}
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {item.text}
                          </Typography>
                          <Typography variant="body2">
                          {item.description}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Typography variant="body1">
              {userText[userType]?.[currentPage] || "No content available for this user type."}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #ccc", pt: 2 }}>
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentPage === 0}
              sx={{ backgroundColor: "#8b3fe8", "&:hover": { backgroundColor: "#5b29b8" } }}
            >
              Previous
            </Button>
            <Typography>Page {currentPage + 1} of {maxPages}</Typography>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentPage === maxPages - 1}
              sx={{ backgroundColor: "#8b3fe8", "&:hover": { backgroundColor: "#5b29b8" } }}
            >
              Next
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleDontShowAgain}
              sx={{ backgroundColor: "#8b3fe8", "&:hover": { backgroundColor: "#5b29b8" } }}
            >
              Don't Show Again
            </Button>
            <Button
              variant="contained"
              onClick={handleSkip}
              sx={{ backgroundColor: "#8b3fe8", "&:hover": { backgroundColor: "#5b29b8" } }}
            >
              Skip
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default WebsiteTutorial;