import React, { useState } from 'react';
import './FeedbackDisplay.css'; // Import the CSS file
import { Feedback } from './purchases/FeedBack';

interface Feedback {
  username: string;
  user_Id: string;
  feedback: string;
  rate: number;
}

interface FeedbackDisplayProps {
  feedbacks: Feedback[];
  id: string;
  onClose: () => void;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedbacks, onClose }) => {
  const [openFeedback, setOpenFeedback] = useState(false); // State to manage modal visibility

  const handleAddRateClick = () => {
    setOpenFeedback(true); // Show the Feedback pop-up when "Add Rate" is clicked
  };

  const handleCloseFeedback = () => {
    setOpenFeedback(false); // Close the Feedback pop-up
  };

  return (
    <div className="feedback-popup">
      <div className="feedback-popup-header">
        <h3>Tour Guide Feedback</h3>
        <button className="feedback-popup-close" onClick={onClose}>&#10006;</button>
      </div>
      
      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <div className="feedback">
                <p>{feedback.feedback}</p>
                <span className="user-id">Username: {feedback.username}</span>
              </div>
              <span className="rate">{feedback.rate} / 5</span>
            </div>
          ))
        ) : (
          <p>No feedback available.</p>
        )}
      </div>
      
      <div className="feedback-popup-footer">
        
         <Feedback
          type="tourGuide" // Or the type you're passing
          id="some_id" // Pass an actual ID or some other identifier
          touristUsername="tourist123" // Pass the actual username here
          touristFeedback={{ rating: null, review: null, touristUsername: "tourist123" }} // Or initial feedback data
        />
      
      </div>

      {/* Conditionally render the Feedback component as a pop-up */}
      
    </div>
  );
};

export default FeedbackDisplay;
