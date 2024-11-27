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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SkipNextIcon from "@mui/icons-material/SkipNext";



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
      <Box
        sx={{
          ...modalStyle,
          background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          p: 4,
        }}
      >
        {/* Title */}
        <Typography variant="h4" mb={3} align="center" color="secondary" fontWeight="bold">
          {pageTitles[userType]?.[currentPage] || "Website Tutorial"}
          <hr></hr>

          <Typography variant="body1" mb={3} color="text.secondary" lineHeight={1.8}>
            {userText[userType]?.[currentPage]}
            </Typography>   
        </Typography>

        {/* Content Area */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 4 }}>
          {/* Page 2 (Navigation Bar) */}
          {currentPage === 1 && (
            <Box>
              <Grid container spacing={4}>
                {navbarDescriptions[userType]?.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "180px",
                        borderRadius: "16px",
                        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.08)",
                        transition: "transform 0.2s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
                        },
                      }}
                    >
                      <Box sx={{ fontSize: 48, color: "secondary.main" }}>{item.icon}</Box>
                      <Box sx={{ ml: 2, textAlign: "left" }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Page 3 (Profile Dropdown) */}
          {currentPage === 2 && (
            <Box>
              <Typography variant="body1" mb={3} color="text.secondary" lineHeight={1.8}>
                Located at the top right of the navigation bar, the profile dropdown allows you to manage your profile
                and access additional features.
              </Typography>
              <Grid container spacing={4}>
                {profileDropdownItems.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "180px",
                        borderRadius: "16px",
                        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.08)",
                        transition: "transform 0.2s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
                        },
                      }}
                    >
                      <Box sx={{ fontSize: 48, color: "secondary.main" }}>{item.icon}</Box>
                      <Box sx={{ ml: 2, textAlign: "left" }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                          {item.text}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
        {/* Footer Navigation */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "2px solid #e0e0e0",
    pt: 3,
    mt: 4,
    gap: 2, 
  }}
>
  <Button
    variant="contained"
    onClick={handlePrevious}
    disabled={currentPage === 0}
    startIcon={<ArrowBackIosNewIcon />}
    sx={{
      px: 4,
      py: 1,
      background: "linear-gradient(to right, #8e44ad, #9b59b6)",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "1rem",
      textTransform: "none", 
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        background: "linear-gradient(to right, #732d91, #8e44ad)",
      },
      "&:disabled": {
        backgroundColor: "#ddd",
        color: "#aaa",
      },
    }}
  >
    Previous
  </Button>

  <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.8rem",
    mt: 3,
  }}
>
  {Array.from({ length: maxPages }).map((_, index) => (
    <Box
      key={index}
      sx={{
        width: index === currentPage ? "10px" : "8px",
        height: index === currentPage ? "10px" : "8px",
        borderRadius: "50%",
        backgroundColor: index === currentPage ? "secondary.main" : "grey.400",
        boxShadow: index === currentPage
          ? "0px 0px 6px 2px rgba(139, 63, 232, 0.5)" 
          : "none",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.2)", 
          backgroundColor: index !== currentPage ? "grey.500" : "secondary.main", 
        },
      }}
    />
  ))}
</Box>



  <Button
    variant="contained"
    onClick={handleNext}
    disabled={currentPage === maxPages - 1}
    endIcon={<ArrowForwardIosIcon />}
    sx={{
      px: 4,
      py: 1,
      background: "linear-gradient(to right, #8e44ad, #9b59b6)",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "1rem",
      textTransform: "none",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        background: "linear-gradient(to right, #732d91, #8e44ad)",
      },
      "&:disabled": {
        backgroundColor: "#ddd",
        color: "#aaa",
      },
    }}
  >
    Next
  </Button>
</Box>

{/* Action Buttons */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 4,
    gap: 2,
  }}
>
  <Button
    variant="outlined"
    onClick={handleDontShowAgain}
    startIcon={<VisibilityOffIcon />} 
    sx={{
      px: 4,
      py: 1,
      borderColor: "secondary.main",
      color: "secondary.main",
      borderRadius: "8px",
      fontSize: "1rem",
      textTransform: "none",
      transition: "0.3s ease",
      "&:hover": {
        backgroundColor: "secondary.light",
        borderColor: "secondary.dark",
      },
    }}
  >
    Don't Show Again
  </Button>

  <Button
    variant="outlined"
    onClick={handleSkip}
    startIcon={<SkipNextIcon />}
    sx={{
      px: 4,
      py: 1,
      borderColor: "secondary.main",
      color: "secondary.main",
      borderRadius: "8px",
      fontSize: "1rem",
      textTransform: "none",
      transition: "0.3s ease",
      "&:hover": {
        backgroundColor: "secondary.light",
        borderColor: "secondary.dark",
      },
    }}
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