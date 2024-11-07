import {
  Box,
  Button,
  Modal,
  Rating,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useAddFeedbackProduct } from "../../custom_hooks/products/useAddfeedbackProduct";
import Swal from "sweetalert2";
import { rateTourGuide } from "../../custom_hooks/feedback/RatingTourGuide";
import IFeedbackk from "../../custom_hooks/IFeedback";
import { rateItinerary } from "../../custom_hooks/feedback/RatingItinerary";

interface IFeedback {
  rating: number | null;
  review: string | null;
  touristUsername: string;
}

interface FeedbackProps {
  type: string;
  id: string;
  touristUsername: string;
  touristFeedback: IFeedback;
}

export const Feedback: React.FC<FeedbackProps> = ({
  type,
  id,
  touristUsername,
  touristFeedback,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state for validation
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState<number | null>(touristFeedback.rating);
  const [feedback, setFeedback] = useState<string | null>(
    touristFeedback.review
  );

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(event.target.value);
  };

  const handleSendFeedback = async () => {
    if (type === "product") {
      if (value === null) {
        setError("Rating is required");
        return;
      }
      setLoading(true); // Set loading to true when submission starts
      try {
        const response = await useAddFeedbackProduct(
          id,
          { rating: value, review: feedback },
          touristUsername
        );
        handleClose(); // Close the modal first
        if (response && response.status === 200) {
          Swal.fire(
            "Feedback submitted",
            "Thank you for your feedback",
            "success"
          );
        } else {
          Swal.fire("Feedback not submitted", "Please try again", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Feedback not submitted", "Please try again", "error");
      } finally {
        setLoading(false); // Set loading to false when submission is complete
      }
    } else if (type === "Tour_guide") {
      if (value === null) {
        setError("Rating is required");
        return;
      }
      setLoading(true); // Set loading to true when submission starts
      try {
        const body = {
          rating: value,
          review: feedback,
          touristUsername: touristUsername,
        } as IFeedbackk;
        const response = await rateTourGuide(id, body);
        handleClose(); // Close the modal first
        if (response && response.status >= 200 && response.status < 300) {
          Swal.fire(
            "Feedback submitted",
            "Thank you for your feedback",
            "success"
          );
        } else {
          Swal.fire("Feedback not submitted", "Please try again", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Feedback not submitted", "Please try again", "error");
      } finally {
        setLoading(false); // Set loading to false when submission is complete
      }
    } else if (type === "Itinerary") {
      if (value === null) {
        setError("Rating is required");
        return;
      }
      setLoading(true); // Set loading to true when submission starts
      try {
        const body = {
          rating: value,
          review: feedback,
          touristUsername: touristUsername,
        } as IFeedbackk;
        const response = await rateItinerary(id, body);
        handleClose(); // Close the modal first
        if (response && response.status >= 200 && response.status < 300) {
          Swal.fire(
            "Feedback submitted",
            "Thank you for your feedback",
            "success"
          );
        } else {
          Swal.fire("Feedback not submitted", "Please try again", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Feedback not submitted", "Please try again", "error");
      } finally {
        setLoading(false); // Set loading to false when submission is complete
      }
    }
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setError(null); // Clear error when rating is set
            }}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          {value !== null && (
            <TextField
              label="Write your feedback here "
              multiline
              rows={4}
              fullWidth
              value={feedback}
              onChange={handleFeedbackChange}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendFeedback}
            sx={{ mt: 2 }}
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} /> : "Submit Feedback"}
          </Button>
        </Box>
      </Modal>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        FeedBack
      </Button>
    </React.Fragment>
  );
};
