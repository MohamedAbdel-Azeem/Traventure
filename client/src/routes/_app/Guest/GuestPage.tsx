import { Button } from "@mantine/core";
import WebsiteTutorial from "../../../components/WebsiteTutorial";
import GuestDashboard from "./GuestDashboard";
import { useState } from "react";
const GuestPage = () => {


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
        <GuestDashboard />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 1000,
        }}
      >
        {/* <Button
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
        </Button> */}
      </div>
      {/* <WebsiteTutorial open={isTutorialOpen} onClose={handleTutorialClose} userType="guest" /> */}


    </div>
  );
};
export default GuestPage;
