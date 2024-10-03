// WaitingResponse.tsx
import React from 'react';
import './WaitingResponse.css';

interface WaitingResponseProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const WaitingResponse: React.FC<WaitingResponseProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="waiting-response-overlay">
      <div className="waiting-response-content">
        <h3 className="waiting-response-message">{message}</h3>
        <div className="waiting-response-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default WaitingResponse;
