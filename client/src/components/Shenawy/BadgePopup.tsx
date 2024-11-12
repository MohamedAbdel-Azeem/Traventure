import React from "react";
import "./BadgePopup.css";
import imagefirst from "../../assets/gold.png";
import imagesecond from "../../assets/silver.png";
import imagethird from "../../assets/bronze.png";

const badges = [
  { level: 1, requirement: 0, name: "Badge Level 1", image: imagethird },
  { level: 2, requirement: 100001, name: "Badge Level 2", image: imagesecond },
  { level: 3, requirement: 500001, name: "Badge Level 3", image: imagefirst },
];

interface BadgePopupProps {
  points: number;
  onClose: () => void;
}

const BadgePopup: React.FC<BadgePopupProps> = ({ points, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="header">
          <h2 className="popup-title">Your Badges</h2>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
        <ul className="badge-list">
          {badges.map((badge) => (
            <li key={badge.level} className="badge-item">
              <div className="flex items-center">
                <img
                  src={badge.image}
                  alt={`${badge.name} Icon`}
                  className="badge-image"
                />
                <span className="badge-name">{badge.name}</span>
                {points < badge.requirement && (
                  <div className="locked-overlay">
                    <span className="lock-icon" role="img" aria-label="Locked">
                      🔒
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BadgePopup;
