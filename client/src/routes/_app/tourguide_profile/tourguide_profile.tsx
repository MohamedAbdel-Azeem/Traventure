import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { set } from "react-hook-form";
import { any, string } from "zod";
import { ITourGuide } from "./ITourGuide";
import { UpdateTourGuide } from "../../../custom_hooks/tourGuideGetUpdate";
import { Box, Button, Modal, TextField } from "@mui/material";
import ChangePasswordModal, {
  AddContactLeadFormType,
} from "../../../components/ChangePasswordModal";
import { editpassword } from "../../../custom_hooks/changepassowrd";
import Swal from "sweetalert2";
import ProfilePictureEdit from "../../../components/ProfilePictureEdit";
import { uploadFileToStorage } from "../../../firebase/firebase_storage";
import {handleDeleteAccount} from "../../../custom_hooks/usedeleterequest";
interface TourGuideProfileProps {
  tourGuide: ITourGuide;
}

const TourGuideProfile: React.FC<TourGuideProfileProps> = ({ tourGuide }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<ITourGuide>(tourGuide);
  const [currentData, setCurrentData] = useState<ITourGuide>(tourGuide);
  const navigate = useNavigate();
  //Modal States
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [role, setRole] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [stillWorking, setStillWorking] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");

  const [update, setUpdate] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCurrentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setUpdate(true);
    const reponseUpdate = await UpdateTourGuide(
      currentData,
      userData.username,
      profilePicture
    );
    if (reponseUpdate !== "error Updating Tour Guide") {
      console.log("Successfully updated");
      setIsEditing(false);
      setUserData(currentData);
      setProfilePicture(null);
    } else {
      Swal.fire({
        title: "Error",
        text: reponseUpdate,
        icon: "error",
      });
    }
    setUpdate(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  function handleDelete(_id: string): void {
    setCurrentData((prevData) => ({
      ...prevData,
      previousWork: prevData.previousWork?.filter((work) => work._id !== _id),
    }));
  }

  function handleAdd(): void {
    if (!company || !startDate || !role || !description) {
      return;
    }
    if (!stillWorking && !endDate) {
      return;
    }
    const newWork = {
      company,
      startDate,
      endDate: endDate,
      stillWorkHere: stillWorking,
      role,
      description,
      location,
    };
    setCurrentData((prevData) => ({
      ...prevData,
      previousWork: prevData.previousWork
        ? [...prevData.previousWork, newWork]
        : [newWork],
    }));
    setOpen(false);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const handlePasswordChangeSubmit = (data: AddContactLeadFormType) => {
    console.log("Password change data:", data);
    const { oldPassword, newPassword } = data;
    editpassword(currentData.username, oldPassword, newPassword)
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



const handleDeleteTwo = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await handleDeleteAccount(
        currentData._id,
        currentData.username,
        "tourguide",
        currentData.wallet||0
      );
      if(res === "success"){
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        navigate("/");
      }else{
        Swal.fire("Error", "Failed to delete account", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your account is safe :)", "error");
    }
  })
}




  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{
        backgroundImage: `url('/src/assets/mtn.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Box className="flex flex-col">
            <TextField
              label="Company Name"
              value={company}
              type="text"
              onChange={(e) => setCompany(String(e.target.value))}
              fullWidth
              margin="normal"
            />
            <div>
              <label>Start Date</label>
              <input
                type="date"
                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
              />
            </div>
            {!stillWorking && (
              <div>
                <label>End Date</label>
                <input
                  type="date"
                  value={endDate ? endDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                />
              </div>
            )}
            <div>
              <label>Still Working Here</label>
              <input
                type="checkbox"
                checked={stillWorking}
                onChange={(e) => setStillWorking(e.target.checked)}
              />
            </div>

            <TextField
              label="role"
              type="text"
              value={role}
              onChange={(e) => setRole(String(e.target.value))}
              fullWidth
              margin="normal"
            />
            <TextField
              label="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(String(e.target.value))}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              type="text"
              value={description}
              onChange={(e) => setdescription(String(e.target.value))}
              fullWidth
              margin="normal"
            />
            <Button onClick={handleAdd}>Add</Button>
          </Box>
        </Box>
      </Modal>
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-8 backdrop-blur-lg bg-opacity-90">
        <div className="flex items-center space-x-6">
          {isEditing ? (
            <ProfilePictureEdit
              profilePicture={profilePicture}
              onChange={setProfilePicture} // Directly pass setProfilePicture
              isEditing={isEditing} // Controls the edit overlay visibility
            />
          ) : (
            <img
              src={userData.profilepic}
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-purple-500"
            />
          )}
          <div className="text-left">
            <h2 className="text-4xl font-extrabold text-purple-700">
              {userData.username}
            </h2>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={currentData.email}
                onChange={handleEdit}
                className="mt-1 text-lg text-gray-600 p-3 border border-gray-300 rounded-md w-full"
              />
            ) : (
              <p className="text-lg text-gray-600 overflow-auto w-[255px]">
                {userData.email}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">
              Mobile Number:
            </label>
            {isEditing ? (
              <input
                type="number"
                name="mobileNumber"
                value={currentData.mobileNumber}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg overflow-auto w-[404px]">
                {userData.mobileNumber}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">
              Years of work:
            </label>
            {isEditing ? (
              <input
                type="number"
                name="yearsOfExperience"
                value={currentData.yearsOfExperience}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg overflow-auto w-[404px]">
                {userData.yearsOfExperience}
              </p>
            )}
            {error && <p className="text-red-600 mt-1">{error}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">
              Previous work experience:
            </label>
            {isEditing ? (
              <ul className="flex flex-col gap-3 pt-2">
                {currentData.previousWork &&
                  currentData.previousWork.map((work, index) => (
                    <li
                      key={index}
                      className="flex flex-row bg-white p-4 mb-2 rounded-md justify-around"
                    >
                      <div>
                        <h3>
                          <b>Company</b> : {work.company}
                        </h3>
                        <p>
                          {" "}
                          <b>Role</b> : {work.role}
                        </p>
                        <p>
                          {" "}
                          <b>Location</b> : {work.location}
                        </p>
                        <p>
                          {" "}
                          <b>Duration</b> :{" "}
                          {new Date(work.startDate).toLocaleDateString()} -{" "}
                          {work.endDate
                            ? new Date(work.endDate).toLocaleDateString()
                            : "Present"}
                        </p>
                        <p>
                          {" "}
                          <b>Description</b> : {work.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(work._id)}
                        className=" size-10 self-center hover:text-red-500"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))}

                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="bg-purple-600  text-white w-1/4 self-center py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200 "
                >
                  Add
                </button>
              </ul>
            ) : (
              <ul className="flex flex-col gap-3 pt-2">
                {userData.previousWork &&
                  userData.previousWork.map((work, index) => (
                    <li
                      key={index}
                      className="flex flex-row bg-white p-4 mb-2 rounded-md"
                    >
                      <div>
                        <h3>
                          <b>Company</b> : {work.company}
                        </h3>
                        <p>
                          {" "}
                          <b>Role</b> : {work.role} at {work.location}
                        </p>
                        <p>
                          {" "}
                          <b>Duration</b> :{" "}
                          {new Date(work.startDate).toLocaleDateString()} -{" "}
                          {work.endDate
                            ? new Date(work.endDate).toLocaleDateString()
                            : "Present"}
                        </p>
                        <p>
                          {" "}
                          <b>Description</b> : {work.description}
                        </p>
                      </div>
                      <button className=" size-10 self-center"></button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
        <button
              type="button"
              onClick={handleDeleteTwo}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200 mr-auto"
            >
              Delete Account
            </button>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center"
                disabled={update}
              >
                {update ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={toggleEdit}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={toggleEdit}
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Edit Profile
            </button>
          )}
          <button
            type="button"
            onClick={() => setPasswordModalOpen(true)}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
      {isPasswordModalOpen && (
        <ChangePasswordModal
          username={currentData.username}
          onClose={() => setPasswordModalOpen(false)}
          onFormSubmit={handlePasswordChangeSubmit}
        ></ChangePasswordModal>
      )}
    </div>
  );
};

export default TourGuideProfile;
