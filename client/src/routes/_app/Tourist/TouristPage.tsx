import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Dashboard from "../../../components/Dashboard";
import WebsiteTutorial from "../../../components/WebsiteTutorial";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../custom_hooks/auth";

const TouristPage = () => {
  const [isTutorialOpen, setTutorialOpen] = useState(false);

  const handleTutorialOpen = () => setTutorialOpen(true);
  const handleTutorialClose = () => setTutorialOpen(false);

  const { username } = useParams<{ username: string }>();

  const { isAuthenticated, isLoading, isError } = useAuth(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/traventure/api/tourist/skipTutorial/" + username
        );
        const skipTutorial = response.data;
        setTutorialOpen(!skipTutorial || skipTutorial === "false");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#f86c6b" loading={true} size={150} />
      </div>
    );
  }
  if (isError || isAuthenticated !== username) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Error 403 Unauthrized access</h1>
      </div>
    );
  }

  const handleDontShowAgain = async () => {
    try {
      await axios.patch("/traventure/api/tourist/skipTutorial/" + username);
      setTutorialOpen(false);
    } catch (error) {
      console.error("Error skipping tutorial:", error);
    }
  };

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

      <WebsiteTutorial
        open={isTutorialOpen}
        onClose={handleTutorialClose}
        userType="tourist"
        onDontShowAgain={handleDontShowAgain}
      />
    </div>
  );
};

export default TouristPage;
