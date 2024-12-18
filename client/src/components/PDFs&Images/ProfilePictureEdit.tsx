import React from "react";
import { FaEdit } from "react-icons/fa";

interface ProfilePictureEditProps {
  profilePicture: File | null; 
  onChange: (newPicture: File | null) => void; 
  isEditing: boolean; 
  OutsideClassName?: string; 
  size?: string; // Size in responsive units, e.g., "5rem", "10vw"
}

const ProfilePictureEdit: React.FC<ProfilePictureEditProps> = ({
  profilePicture,
  onChange,
  isEditing,
  OutsideClassName,
  size = "5rem" // Default to a responsive size like 5rem
}) => {
  const handleProfilePictureClick = () => {
    document.getElementById("profilePictureInput")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith("image/")) {
      onChange(file); 
    }
  };

  return (
    <div
      className={`relative ${OutsideClassName || ""}`}
      style={{ width: size, height: size }}
    >
      {profilePicture ? (
        <img
          src={URL.createObjectURL(profilePicture)}
          alt="Profile"
          className="w-full h-full rounded-full object-cover shadow-md border-4 border-purple-500"
        />
      ) : (
        <img
          src="/src/assets/defaultavatar.png"
          alt="Default Avatar"
          className="w-full h-full rounded-full object-cover shadow-md border-4 border-purple-500"
        />
      )}
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
