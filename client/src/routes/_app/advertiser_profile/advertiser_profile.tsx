import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IAdvertiser } from './IAdvertiser';
import ChangePasswordModal, { AddContactLeadFormType } from '../../../components/ChangePasswordModal';
import { editpassword } from '../../../custom_hooks/changepassowrd';
import Swal from "sweetalert2";
import ProfilePictureEdit from '../../../components/ProfilePictureEdit';
import { uploadFileToStorage } from '../../../firebase/firebase_storage';
import { updateAdvertiser } from '../../../custom_hooks/advertisercustomhooks';
import NewNavbar from '../../../components/NewNavbar';
// Define Zod schema for validation
interface AdvertiserProfileProps {
  advertiser: IAdvertiser;
}
const advertiserSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(1, 'Username is required'),
  websiteLink: z.string().min(1, 'Website Link is required'),
  hotline: z.string().min(1, 'Hotline is required'),
  company: z.string().min(1, 'Company is required'),
  founded: z.number().min(4, 'Founded is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
});

export type AdvertiserProfileFormValues = z.infer<typeof advertiserSchema>;

const AdvertiserProfile: React.FC<AdvertiserProfileProps> = ({ advertiser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdvertiser, setCurrentAdvertiser] = useState(advertiser);
  const [apiBody, setApiBody] = useState({});
  const [apiUsername, setApiUsername] = useState('');
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  console.log('Advertiser:', currentAdvertiser);
  console.log('Description',currentAdvertiser.description);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAdvertiser>({
    resolver: zodResolver(advertiserSchema),
    defaultValues: {
      email: currentAdvertiser.email,
      username: currentAdvertiser.username,
      websiteLink: currentAdvertiser.websiteLink,
      hotline: currentAdvertiser.hotline,
      company: currentAdvertiser.company,
      founded: currentAdvertiser.founded,
      description: currentAdvertiser.description,
      location: currentAdvertiser.location,
    },
  });

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Save the form
  const onSubmit = async (data: IAdvertiser) => {
    console.log('Saved data:', data);
    data.profilepic = currentAdvertiser.profilepic;
    setUpdate(true);
    if(profilePicture) {
      const firebaseurl = await uploadFileToStorage(profilePicture);
      data.profilepic = firebaseurl;
    }
    const updatedadvertiser = await updateAdvertiser(data, currentAdvertiser.username);
    if(updatedadvertiser !== "error updating advertiser") {
      setCurrentAdvertiser(data);
      setIsEditing(false);
      
    }
    else{
      Swal.fire({
        title: "Error",
        text: "Failed to update advertiser",
        icon: "error",
      });
    }
    setUpdate(false);
    
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/');
  };

  const [isPasswordModalOpen,setPasswordModalOpen]=useState(false);
  const handlePasswordChangeSubmit = (data: AddContactLeadFormType) => {
    console.log("Password change data:", data);
    const { oldPassword, newPassword } = data;
    editpassword(currentAdvertiser.username, oldPassword, newPassword)
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
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{
        backgroundImage: `url('/src/assets/mtn.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-8 backdrop-blur-lg bg-opacity-90">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-6">
          {(isEditing ) ? (
      <ProfilePictureEdit
        profilePicture={profilePicture}
        onChange={setProfilePicture} // Directly pass setProfilePicture
        isEditing={isEditing} // Controls the edit overlay visibility
      />) : (
        <img
              src={currentAdvertiser.profilepic }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-purple-500"
            />
      )}
            <div className="text-left">
              <h2 className="text-4xl font-extrabold text-purple-700">
                {currentAdvertiser.username}
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
                  {currentAdvertiser.email}
                </p>
              )}
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            {/* Website Link */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Website Link:
              </label>
              {isEditing ? (
                <Controller
                  name="websiteLink"
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
                  {currentAdvertiser.websiteLink}
                </p>
              )}
              {errors.websiteLink && (
                <p className="text-red-600">{errors.websiteLink.message}</p>
              )}
            </div>

            {/* Hotline */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Hotline:
              </label>
              {isEditing ? (
                <Controller
                  name="hotline"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="text-lg p-3 border border-gray-300 rounded-md"
                    />
                  )}
                />
              ) : (
                <p className="text-gray-800 text-lg overflow-auto w-[404px]">
                  {currentAdvertiser.hotline}
                </p>
              )}
              {errors.hotline && (
                <p className="text-red-600">{errors.hotline.message}</p>
              )}
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Company:
              </label>
              {isEditing ? (
                <Controller
                  name="company"
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
                  {currentAdvertiser.company}
                </p>
              )}
              {errors.company && (
                <p className="text-red-600">{errors.company.message}</p>
              )}
            </div>

            {/* Founded */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Founded:
              </label>
              {isEditing ? (
                <Controller
                name="founded"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="text-lg p-3 border border-gray-300 rounded-md"
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}  // Convert to number
                  />
                )}
              />
              ) : (
                <p className="text-gray-800 text-lg overflow-auto w-[404px]">
                  {currentAdvertiser.founded}
                </p>
              )}
              {errors.founded && (
                <p className="text-red-600">{errors.founded.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Description:
              </label>
              {isEditing ? (
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="text-lg p-3 border border-gray-300 rounded-md"
                    />
                  )}
                />
              ) : (
                <p className="text-gray-800 text-lg overflow-auto w-[404px]">
                  {currentAdvertiser.description}
                </p>
              )}
              {errors.description && (
                <p className="text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Location:
              </label>
              {isEditing ? (
                <Controller
                  name="location"
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
                  {currentAdvertiser.location}
                </p>
              )}
              {errors.location && (
                <p className="text-red-600">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
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
                    reset();
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
              onClick={()=>setPasswordModalOpen(true)}
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
      {isPasswordModalOpen && (<ChangePasswordModal
            username={currentAdvertiser.username}
            onClose={()=>setPasswordModalOpen(false)}
            onFormSubmit={handlePasswordChangeSubmit}>
            </ChangePasswordModal>)}
    </div>
  );
};

export default AdvertiserProfile;
