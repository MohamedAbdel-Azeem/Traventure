
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

interface ProfilePictureEditProps {
  profilePicture: string | null;
  onChange: (newPicture: string | null) => void;
  isEditing: boolean;
}

const ProfilePictureEdit: React.FC<ProfilePictureEditProps> = ({ profilePicture, onChange, isEditing }) => {
  const handleProfilePictureClick = () => {
    document.getElementById('profilePictureInput')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-32 h-32">
      <img
        src={profilePicture || "/src/assets/defaultavatar.png"} // Default avatar image
        alt="Profile"
        className={`w-full h-full rounded-full object-cover shadow-md border-4 border-purple-500 ${isEditing ? 'opacity-50' : ''}`}
      />
      {isEditing && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-full cursor-pointer"
          onClick={handleProfilePictureClick}
        >
          <FaEdit className="text-purple-700 text-2xl" />
        </div>
      )}
      <input
        type="file"
        id="profilePictureInput"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfilePictureEdit;
