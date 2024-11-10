import React, { useState, useEffect } from "react";
import AccountButton from "./AccountButton"; // <-- Add this import
import ChangePasswordModal, {
  AddContactLeadFormType,
} from "./ChangePasswordModal";
import { editpassword } from "../custom_hooks/changepassowrd";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";
const Navbar = ({ sideBarFlag = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [content, setContent] = useState("dashboard"); // Placeholder content state

  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const currentuser = username as string;
  const currentusertype = location.pathname.split(`/`)[1];

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

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const handlePasswordChangeSubmit = (data: AddContactLeadFormType) => {
    const { oldPassword, newPassword } = data;
    editpassword(currentuser, oldPassword, newPassword)
      .then(() => {
        setPasswordModalOpen(false);

        Swal.fire({
          title: "Password Changed Successfully",
          text: "Password has been changed",
          icon: "success",
        });
      })
      .catch((error) => {
        const errorMessage = error.message || "Failed to change password.";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      });
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
        {(currentusertype === "admin" ||
          currentusertype === "tourismgovernor") && (
          <div className="ml-auto flex items-center ">
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Change Password
            </button>
          </div>
        )}
        {/* Right side elements */}

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <SearchBar /> */}
          {/* Account Button */}
          <AccountButton
            email="user@example.com" // Provide the user's email
            name="John Doe" // Provide the user's name
            setContent={setContent}
            content={content}
          />
        </div>
      </nav>
      {isPasswordModalOpen && (
        <ChangePasswordModal
          username={currentuser}
          onClose={() => setPasswordModalOpen(false)}
          onFormSubmit={handlePasswordChangeSubmit}
        ></ChangePasswordModal>
      )}
    </div>
  );
};

export default Navbar;
