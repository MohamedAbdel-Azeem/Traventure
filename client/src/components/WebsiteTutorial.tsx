import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Backdrop,
  Fade,
  Grid,
  Paper,
  Slide,
} from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import mtnImage from "../assets/mtn2.jpg";
import CancelIcon from "@mui/icons-material/Cancel";

interface WebsiteTutorialProps {
  open: boolean;
  onClose: () => void;
  userType: string;
  onDontShowAgain: () => void;
}

const WebsiteTutorial: React.FC<WebsiteTutorialProps> = ({
  open,
  onClose,
  userType,
  onDontShowAgain,
}) => {
  const userText = {
    tourist: [
      "Welcome to Traventure! As a tourist, you can explore and enjoy many of our features that we have to offer. Click 'Next' to learn more.",
      " ",
      " ",
    ],
    guest: [
      "Welcome to Traventure! As a guest, you can explore snippets of the website and its features before registering. Click 'Next' to learn more.",
      " ",
      " ",
    ],
  };

  const pageTitles = {
    tourist: [
      "Welcome to Traventure!",
      "Navigation Bar Overview",
      "Profile Dropdown Overview",
    ],
    guest: [
      "Welcome to Traventure!",
      "Navigation Bar Overview",
      "Profile Dropdown Overview",
    ],
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
        description: "View the various available itineraries.",
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
        name: "Itineraries",
        icon: <FlightTakeoffIcon />,
        description: "View the various available itineraries.",
      },
      {
        name: "Locations",
        icon: <LocationOnIcon />,
        description: "Discover and explore various locations.",
      },
      {
        name: "Activities",
        icon: <StadiumIcon />,
        description: "Browse activities at your destinations.",
      },
    ],
  };

  const profileDropdownItems = [
    {
      text: "Profile",
      icon: <AccountCircleIcon />,
      description: "View and edit your profile.",
    },
    {
      text: "Wishlist",
      icon: <FavoriteIcon />,
      description: "View and manage your wishlist.",
    },
    {
      text: "Purchases",
      icon: <ShoppingBasketIcon />,
      description: "View your purchase history.",
    },
    {
      text: "Complaints",
      icon: <HowToVoteIcon />,
      description: "Submit complaints and feedback.",
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      description: "Logout of your account.",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const maxPages = userType === "guest" ? 2 : 3;

  const handleNext = () => {
    if (currentPage < maxPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleSkip = () => {
    setCurrentPage(maxPages - 1);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    width: "85%",
    height: "85%",
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
            backgroundImage: `url(${mtnImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            p: 4,
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            mb={3}
            align="center"
            color="#8b3fe8"
            fontWeight={800}
            sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 800 }}
          >
            {pageTitles[userType]?.[currentPage] || "Website Tutorial"}

            <Typography
              variant="body1"
              mb={3}
              color="text.secondary"
              lineHeight={1.8}
              sx={{
                fontSize: "1.3rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                letterSpacing: "0.5px",
                textAlign: "justify",
                color: "rgba(0, 0, 0, 0.7)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                transition: "color 0.3s ease, transform 0.3s ease",
                borderTop: "2px solid #FFFFFF",
              }}
            >
              {userText[userType]?.[currentPage]}
            </Typography>
          </Typography>

          {/* Content Area */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              mb: 4,
              maxHeight: "calc(100vh - 250px)",

              // Scrollbar Styling
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#8b3fe8",
                borderRadius: "10px",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "10px",
              },

              scrollbarWidth: "thin",
              scrollbarColor: "#8b3fe8 rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Page 2 (Navigation Bar) */}
            {currentPage === 1 && (
              <Slide
                direction="left"
                in={currentPage === 1}
                mountOnEnter
                unmountOnExit
              >
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
                            transition:
                              "transform 0.2s ease, box-shadow 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.03)",
                              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
                            },
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: 48,
                              color: "secondary.main",
                              marginRight: 2,
                            }}
                          >
                            {item.icon}
                          </Box>

                          <Box sx={{ textAlign: "left" }}>
                            <Typography
                              variant="h6"
                              fontWeight="600"
                              color="text.primary"
                              sx={{
                                mb: 1,
                                fontSize: "1.1rem",
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontSize: "0.95rem",
                                lineHeight: 1.6,
                                color: "rgba(0, 0, 0, 0.7)",
                              }}
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Slide>
            )}

            {/* Page 3 (Profile Dropdown) */}
            {currentPage === 2 && (
              <Slide
                direction="left"
                in={currentPage === 2}
                mountOnEnter
                unmountOnExit
              >
                <Box>
                  <Typography
                    variant="body1"
                    mb={4}
                    color="text.primary"
                    lineHeight={1.6}
                    sx={{
                      fontSize: "1.1rem",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.5px",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                      color: "rgba(0, 0, 0, 0.8)",
                      textAlign: "justify",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Located at the top right of the navigation bar, the profile
                    dropdown allows you to manage your profile and access
                    additional features.
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
                            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                            transition:
                              "transform 0.2s ease, box-shadow 0.3s ease",
                            background:
                              "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.85))",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
                            },
                          }}
                        >
                          <Box sx={{ fontSize: 48, color: "secondary.main" }}>
                            {item.icon}
                          </Box>
                          <Box sx={{ ml: 2, textAlign: "left" }}>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              color="text.primary"
                            >
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
              </Slide>
            )}
          </Box>
          {/* Footer Navigation */}

          {/* Page Indicators */}
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
                  backgroundColor: index === currentPage ? "#8b3fe8" : "white",
                  boxShadow:
                    index === currentPage
                      ? "0px 0px 6px 2px rgba(139, 63, 232, 0.5)"
                      : "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.2)",
                    backgroundColor:
                      index !== currentPage ? "grey.500" : "secondary.main",
                  },
                }}
              />
            ))}
          </Box>

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
            {/* Previous and Don't Show Again buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={onDontShowAgain}
                startIcon={<VisibilityOffIcon />}
                sx={{
                  px: 4,
                  py: 1,
                  backgroundColor: "#8b3fe8",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#7a2de7",
                  },
                  "&:disabled": {
                    backgroundColor: "#ddd",
                    color: "#aaa",
                  },
                }}
              >
                Don't Show Again
              </Button>

              <Button
                variant="contained"
                onClick={handlePrevious}
                disabled={currentPage === 0}
                startIcon={<ArrowBackIosNewIcon />}
                sx={{
                  px: 4,
                  py: 1,
                  backgroundColor: "#8b3fe8",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#7a2de7",
                  },
                  "&:disabled": {
                    backgroundColor: "#ddd",
                    color: "#aaa",
                  },
                }}
              >
                Previous
              </Button>
            </Box>

            {/* Next and Close buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {currentPage === maxPages - 1 ? (
                <Button
                  variant="contained"
                  onClick={onClose}
                  startIcon={<CancelIcon />}
                  sx={{
                    px: 4,
                    py: 1,
                    backgroundColor: "#8b3fe8",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#7a2de7",
                    },
                  }}
                >
                  Close
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={currentPage === maxPages - 1}
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{
                    px: 4,
                    py: 1,
                    backgroundColor: "#8b3fe8",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#7a2de7",
                    },
                    "&:disabled": {
                      backgroundColor: "#ddd",
                      color: "#aaa",
                    },
                  }}
                >
                  Next
                </Button>
              )}

              <Button
                variant="outlined"
                onClick={handleSkip}
                startIcon={<SkipNextIcon />}
                sx={{
                  px: 4,
                  py: 1,
                  backgroundColor: "#8b3fe8",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#7a2de7",
                  },
                  "&:disabled": {
                    backgroundColor: "#ddd",
                    color: "#aaa",
                  },
                }}
              >
                Skip
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default WebsiteTutorial;
