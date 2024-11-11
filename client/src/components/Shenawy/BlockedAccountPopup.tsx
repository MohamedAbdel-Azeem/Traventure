import React from 'react';
import './BlockedAccountPopup.css'; // Ensure this file contains the relevant styles
import sadface from '../assets/360_F_112439022_Sft6cXK9GLnzWjjIkVMj2Lt34RcKUpxm.jpg'; // Replace with your avatar path

interface BlockedAccountPopupProps {
    onClose: () => void; // Function to close the popup
}

const BlockedAccountPopup: React.FC<BlockedAccountPopupProps> = ({ onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    &times; {/* This is the close 'X' character */}
                </button>
                
                {/* Use the image instead of the FontAwesome icon */}
                <img src={sadface} alt="Sad Face" className='sad-avatar' /> {/* Replace with your avatar path */}
                
                <h2>This account is blocked</h2>
                <button className="view-more-button">View More</button>
            </div>
        </div>
    );
};

export default BlockedAccountPopup;
