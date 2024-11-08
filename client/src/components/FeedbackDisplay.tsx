import React, { useState, useEffect } from 'react';
import './FeedbackDisplay.css';
import { Feedback as FeedbackComponent } from './purchases/FeedBack';
import { UseGetItineraryReviews } from '../custom_hooks/feedback/UseGetItineraryReviews';
import { useParams } from 'react-router-dom';
import { UseGetTourGuideReviews } from '../custom_hooks/feedback/UseGetTourGuideReviews';
import { UseGetCanFeedback } from '../custom_hooks/feedback/UseGetCanFeedback';

interface Feedback {
  username: string;
  user_Id: string;
  review: string;
  rating: number;
}

interface FeedbackDisplayProps {
  id: string;
  type: string;
  onClose: () => void;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ id, type, onClose }) => {
  const { username } = useParams<{ username: string }>();

  const { ItineraryReviews, cloading, cerror, fetchItineraryReviews, fetchTourGuideReviews, TourGuideReviews,fetchCanFeedback } = {} as any;
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);


  // Initialize feedbacks as an empty array
  if (type === "Itinerary") {
    const { ItineraryReviews, cloading, cerror, fetchItineraryReviews } = UseGetItineraryReviews(id);


    useEffect(() => {
      fetchItineraryReviews(); // Trigger the fetching function on mount
    }, []);

    useEffect(() => {
      if (ItineraryReviews && ItineraryReviews.reviews) {
        // Access the 'reviews' key and map over them, ensuring rating is a number
        const formattedReviews = ItineraryReviews.reviews.map((review: any) => ({
          ...review,
          rating: Number(review.rating), // Convert rating to a number
        }));
        setFeedbacks(formattedReviews);
      }
    }, [ItineraryReviews]);

  }
  else
    if (type === "Tour_guide") {

      const { TourGuideReviews, cloading, cerror, fetchTourGuideReviews } = UseGetTourGuideReviews(id);


      useEffect(() => {
        fetchTourGuideReviews(); // Trigger the fetching function on mount
      }, []);

      useEffect(() => {
        if (TourGuideReviews && TourGuideReviews.reviews) {
          // Access the 'reviews' key and map over them, ensuring rating is a number
          const formattedReviews = TourGuideReviews.reviews.map((review: any) => ({
            ...review,
            rating: Number(review.rating), // Convert rating to a number
          }));
          setFeedbacks(formattedReviews);
        }
      }, [TourGuideReviews]);


      

      // console.log("CanFeedback",CanFeedback);





    }

    const { CanFeedback } = UseGetCanFeedback(username!, id);



  return (
    <div className="feedback-popup">
      <div className="feedback-popup-header">
        <h3>Feedback</h3>
        <button className="feedback-popup-close" onClick={onClose}>&#10006;</button>
      </div>

      <div className="feedback-list">
        {cloading ? (
          <p>Loading...</p>
        ) : cerror ? (
          <p>{cerror}</p>
        ) : feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <div className="feedback">
                <p>{feedback.review}</p>
                <span className="user-id">Username: {feedback.username}</span>
              </div>
              <span className="rate">{feedback.rating} / 5</span>
            </div>
          ))
        ) : (
          <p>No feedback available.</p>
        )}
      </div>

      <div className="feedback-popup-footer">
        {
          CanFeedback &&
          <FeedbackComponent
            type={type}
            id={id}
            touristUsername={username!}
            touristFeedback={{ rating: null, review: null, touristUsername: username! }}
          />
        }
      </div>

    </div>
  );
};

export default FeedbackDisplay;
