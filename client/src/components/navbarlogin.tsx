import React, { useState, useEffect } from "react";
import Landinglogin from "./Landinglogin"; // <-- Add this import

const navbarlogin = ({
  sideBarFlag = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [content, setContent] = useState('dashboard'); // Placeholder content state

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <div
      className={`container-flow ${
        sideBarFlag
          ? "header-navbar sticky-top"
          : isScrolled
          ? "header-navbar landing sticky-top scrolled"
          : "header-navbar landing sticky-top"
      }`}
    >
      <nav
        className={
          sideBarFlag
            ? "navbar navbar-expand navbar-light sticky-top"
            : isScrolled
            ? "navbar landing navbar-expand navbar-light sticky-top scrolled"
            : "navbar landing navbar-expand navbar-light sticky-top"
        }
      >

        {/* Right side elements */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {/* <SearchBar /> */}
          {/* Account Button */}
          <Landinglogin
            email="user@example.com" // Provide the user's email
            name="John Doe" // Provide the user's name
            setContent={setContent}
            content={content}
          />
        </div>
      </nav>
    </div>
  );
};

export default navbarlogin;
