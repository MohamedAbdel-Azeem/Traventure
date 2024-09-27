import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar/SearchBar";
import AccountButton from "./AccountButton"; // <-- Add this import

const Navbar = ({
  sideBarFlag = false,
  showSideBar = () => {},
  isSideBarOpen = false,
  sideBarData = [],
  sideBarFunction,
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
      <div
        className={
          !isScrolled && !sideBarFlag
            ? "header-background"
            : "header-background scrolled"
        }
      ></div>
      <nav
        className={
          sideBarFlag
            ? "navbar navbar-expand navbar-light sticky-top"
            : isScrolled
            ? "navbar landing navbar-expand navbar-light sticky-top scrolled"
            : "navbar landing navbar-expand navbar-light sticky-top"
        }
      >
        {sideBarFlag ? (
          <Burger
            color="#29C5F6"
            size="lg"
            opened={isSideBarOpen}
            onClick={showSideBar}
            style={{ margin: "0 2rem" }}
            aria-label="Toggle navigation"
          />
        ) : null}

        {/* Right side elements */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <SearchBar />
          {/* Account Button */}
          <AccountButton
            email="user@example.com" // Provide the user's email
            name="John Doe" // Provide the user's name
            setContent={setContent}
            content={content}
          />
        </div>
      </nav>
      {isSideBarOpen && (
        <Sidebar
          sideBarState={[isSideBarOpen, showSideBar]}
          sideBarData={sideBarData}
          sideBarFunction={sideBarFunction}
          resultLabellKey="title"
        />
      )}
    </div>
  );
};

export default Navbar;
