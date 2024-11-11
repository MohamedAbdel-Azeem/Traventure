import React, { useEffect, useState } from 'react';
import './ShowingResponseProps.css'; // Import the CSS file for styling

interface ShowingResponseProps {
    message: string; // Message to display
    onClose: () => void; // Function to close the response
}

const ShowingResponse: React.FC<ShowingResponseProps> = ({ message, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); // Show the response
        const timer = setTimeout(() => {
            setVisible(false); // Hide the response after 3 seconds
            const closeTimer = setTimeout(onClose, 500); // Wait for the animation to finish before calling onClose
            return () => clearTimeout(closeTimer); // Cleanup timeout
        }, 2000); // Change this duration to however long you want the message to be displayed

        return () => clearTimeout(timer); // Cleanup timeout
    }, [message, onClose]);

    return (
        <div className={`response-overlay ${visible ? 'show' : ''}`} onClick={onClose}>
            <div className="response-content" onClick={(e) => e.stopPropagation()}>
                <h4>Success!</h4>
                <p className="waiting-response-message">{message}</p>
            
            </div>
        </div>
    );
};

export default ShowingResponse;
