import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ShareButtonProps {
  type: string;
  className?: string;
  ID: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  type,
  className = "",
  ID = "6728168cb91ef9fab4aaaa72",
}) => {
  const handleShareAsLink = () => {
    const linktocopy=
    type === "itinerary"
      ? `http://localhost:5173/tourist/jane_doe/itineraries/tourist-itinerary/${ID}`
      : type === "place"
      ? `http://localhost:5173/places/${ID}`
      : `http://localhost:5173/activities/${ID}`;
    navigator.clipboard.writeText(linktocopy);
  };
  const linktomail =
    type === "itinerary"
      ? `mailto:?subject=Check Out This Itinerary!&body=http://localhost:5173/tourist-itinerary/${ID}`
      : type === "place"
      ? `mailto:?subject=Check Out This Place!&body=http://localhost:5173/places/${ID}`
      : `mailto:?subject=Check Out This Activity!&body=http://localhost:5173/activities/${ID}`;
  return (
    <div className={`shareBtn ${className}`}>
      <span>
        <svg
          className="icon inactive"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M18 16.08C17.24 16.08 16.56 16.38 16.05 16.87L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.95 7.13C16.46 7.62 17.24 7.92 18 7.92C19.66 7.92 21 6.58 21 4.92C21 3.26 19.66 1.92 18 1.92C16.34 1.92 15 3.26 15 4.92C15 5.16 15.04 5.39 15.09 5.62L8.05 9.79C7.54 9.3 6.76 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.76 15 7.54 14.7 8.05 14.21L15.18 18.38C15.13 18.61 15.09 18.84 15.09 19.08C15.09 20.74 16.43 22.08 18.09 22.08C19.75 22.08 21.09 20.74 21.09 19.08C21.09 17.42 19.75 16.08 18 16.08Z"></path>
        </svg>
      </span>
      <a className="social-link" onClick={() => handleShareAsLink()}>
        <svg
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            style={{ fill: "#1CF60D" }}
            fill-rule="nonzero"
            d="M20.52 3.48C18.4 1.36 15.3 0 12 0 5.37 0 0 5.37 0 12c0 2.12.56 4.18 1.62 6.02L0 24l6.09-1.6C7.82 23.44 9.88 24 12 24c6.63 0 12-5.37 12-12 0-3.3-1.36-6.4-3.48-8.52zM12 22c-1.95 0-3.84-.52-5.5-1.5l-.39-.23-3.61.95.95-3.61-.23-.39C2.52 15.84 2 13.95 2 12 2 6.48 6.48 2 12 2c2.95 0 5.84 1.52 7.5 4.11C21.48 8.16 22 10.05 22 12c0 5.52-4.48 10-10 10zm5.5-7.5c-.28-.14-1.65-.82-1.91-.91-.26-.09-.45-.14-.64.14-.19.28-.73.91-.91 1.1-.18.19-.34.21-.63.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.46.14-.14.19-.24.28-.4.09-.16.05-.3-.02-.43-.07-.14-.64-1.55-.88-2.14-.23-.56-.47-.49-.64-.5-.16-.01-.35-.01-.54-.01-.19 0-.43.06-.66.28-.23.22-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.14.17 1.75 2.67 4.25 3.74.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.5-.3z"
          ></path>
        </svg>
      </a>

      <a className="social-link" href={linktomail}>
        <svg
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            style={{ fill: "#1153FF" }}
            fill-rule="nonzero"
            d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 6L12 11L4 6H20ZM4 18V8L12 13L20 8V18H4Z"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default ShareButton;
