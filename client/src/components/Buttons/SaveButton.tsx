const SaveButton = (
    { handleSaveClick } : { handleSaveClick: () => void }
) => {
    return (
      <button
        title="save"
        onClick={() => {
          handleSaveClick();
        }}
        className="saveBtn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="162"
          height="162"
          viewBox="0 0 162 162"
          fill="none"
        >
          <path
            d="M1.5 1.5H135.379L147.939 14.0607L160.5 26.6213V160.5H1.5V1.5Z"
            stroke="black"
            stroke-width="3"
            fill="white"
          />
          <path
            d="M37.5 1.5H129.5V45C129.5 46.933 127.933 48.5 126 48.5H41C39.067 48.5 37.5 46.933 37.5 45V1.5Z"
            stroke="black"
            stroke-width="3"
            fill="none"
          />
          <path
            d="M129.5 160.5L34.5 160.5L34.5 98C34.5 96.067 36.067 94.5 38 94.5L126 94.5C127.933 94.5 129.5 96.067 129.5 98L129.5 160.5Z"
            stroke="black"
            stroke-width="3"
            fill="black"
          />
          <rect
            x="11.5"
            y="133.5"
            width="13"
            height="13"
            rx="2.5"
            fill="black"
          />
          <rect x="70" y="8" width="18" height="36" fill="black" />
          <path
            className="tomove"
            d="M37.5 5C37.5 3.067 39.067 1.5 41 1.5H91C92.933 1.5 94.5 3.067 94.5 5V45C94.5 46.933 92.933 48.5 91 48.5H41C39.067 48.5 37.5 46.933 37.5 45V5ZM73 8.5C71.6193 8.5 70.5 9.61929 70.5 11V40C70.5 41.3807 71.6193 42.5 73 42.5H84C85.3807 42.5 86.5 41.3807 86.5 40V11C86.5 9.61929 85.3807 8.5 84 8.5H73Z"
            fill="black"
            stroke="black"
            stroke-width="3"
          />
        </svg>
      </button>
    );
}
 
export default SaveButton;