import React, { useState } from "react";
import Dashboard from "../../../components/Dashboard";
import WebsiteTutorial from "../../../components/WebsiteTutorial"; 
import { Button } from "@mui/material";

const TouristPage = () => {
  const [isTutorialOpen, setTutorialOpen] = useState(false);

  const handleTutorialOpen = () => setTutorialOpen(true);
  const handleTutorialClose = () => setTutorialOpen(false);

  return (
    <div>
      <div
        style={{
          transition: "200ms",
        }}
      >
    
        <Dashboard />
      </div>

     
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleTutorialOpen}
          sx={{
            backgroundColor: "#6d28d9",
            "&:hover": {
              backgroundColor: "#a855f7",
            },
          }}
        >
          Open Tutorial
        </Button>
      </div>

     
      <WebsiteTutorial open={isTutorialOpen} onClose={handleTutorialClose} userType="tourist" />
    </div>
  );
};

export default TouristPage;
