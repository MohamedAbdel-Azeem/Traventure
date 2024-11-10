import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISeller } from "./ISeller";
import {
  updateSeller,
  useUpdateSeller,
} from "../../../custom_hooks/sellerGetUpdate";
import ChangePasswordModal, {
  AddContactLeadFormType,
} from "../../../components/ChangePasswordModal";
import { editpassword } from "../../../custom_hooks/changepassowrd";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import ProfilePictureEdit from "../../../components/ProfilePictureEdit";
import { uploadFileToStorage } from "../../../firebase/firebase_storage";
import { handleDeleteAccount } from "../../../custom_hooks/usedeleterequest";

interface SellerProfileProps {
  seller: ISeller;
}
const sellerSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  username: z.string().min(1, "Username is required"),
});

export type SellerProfileFormValues = z.infer<typeof sellerSchema>;

// type SellerProfileType = {
//   username: String,
//   email: string,
//   password: String,
//   name: string,
//   description:string,
//   isAccepted: boolean
// }

const SellerProfile: React.FC<SellerProfileProps> = ({ seller }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [currentSeller, setCurrentSeller] = useState(seller);
  const [apiBody, setApiBody] = useState({});
  const [apiUsername, setApiUsername] = useState("");
  const [update, setUpdate] = useState(false);
  // React Hook Form setup with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISeller>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      email: currentSeller.email,
      name: currentSeller.name,
      description: currentSeller.description,
      username: currentSeller.username,
    },
  });

  // Toggle Edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Save the form
  const onSubmit = async (data: ISeller) => {
    data.profilepic = currentSeller.profilepic;
    setUpdate(true);
    if (profilePicture) {
      const firebaseurl = await uploadFileToStorage(profilePicture);

      data.profilepic = firebaseurl;
    }
    const updateseller = await updateSeller(data, currentSeller.username);
    if (updateseller !== "error Updating seller") {
      setCurrentSeller(data);
      setIsEditing(false);
    } else {
      Swal.fire({
        title: "Error",
        text: updateseller,
        icon: "error",
      });
    }
    setUpdate(false);
    // UPDATE INFO TO DATABASE HERE
  };

  // Handle logout
  const handleLogout = () => {
    navigate("/");
  };
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const handlePasswordChangeSubmit = (data: AddContactLeadFormType) => {
    const { oldPassword, newPassword } = data;
    editpassword(currentSeller.username, oldPassword, newPassword)
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

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const handleProfilePictureClick = () => {
    document.getElementById("profilePictureInput")?.click();
  };

  const handleDelete = () => {
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
          currentSeller._id,
          currentSeller.username,
          "seller",
          currentSeller.wallet || 0
        );
        if (res === "success") {
          Swal.fire("Deleted!", "Your account has been deleted.", "success");
          navigate("/");
        } else {
          Swal.fire("Error", "Failed to delete account", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your account is safe :)", "error");
      }
    });
  };

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
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-8 backdrop-blur-lg bg-opacity-90">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-6">
            {isEditing ? (
              <ProfilePictureEdit
                profilePicture={profilePicture}
                onChange={setProfilePicture} // Directly pass setProfilePicture
                isEditing={isEditing} // Controls the edit overlay visibility
              />
            ) : (
              <img
                src={currentSeller.profilepic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-purple-500"
              />
            )}
            <div className="text-left">
              <h2 className="text-4xl font-extrabold text-purple-700">
                Email:
              </h2>
              {isEditing ? (
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className="mt-1 text-lg text-gray-600 p-3 border border-gray-300 rounded-md w-full"
                    />
                  )}
                />
              ) : (
                <p className="text-lg text-gray-600 overflow-auto w-[255px]">
                  {currentSeller.email}
                </p>
              )}
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Name:
              </label>
              {isEditing ? (
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="text-lg p-3 border border-gray-300 rounded-md"
                    />
                  )}
                />
              ) : (
                <p className="text-gray-800 text-lg overflow-auto w-[404px]">
                  {currentSeller.name}
                </p>
              )}
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Description:
              </label>
              {isEditing ? (
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="text-lg p-3 border border-gray-300 rounded-md"
                    />
                  )}
                />
              ) : (
                <p className="text-gray-800 text-lg overflow-auto w-[404px]">
                  {currentSeller.description}
                </p>
              )}
              {errors.description && (
                <p className="text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200 mr-auto"
            >
              Delete Account
            </button>
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
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
                  onClick={() => {
                    reset(); // Reset form to original values on cancel
                    toggleEdit();
                  }}
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
        </form>
      </div>
      {isPasswordModalOpen && (
        <ChangePasswordModal
          username={currentSeller.username}
          onClose={() => setPasswordModalOpen(false)}
          onFormSubmit={handlePasswordChangeSubmit}
        ></ChangePasswordModal>
      )}
    </div>
  );
};

export default SellerProfile;
