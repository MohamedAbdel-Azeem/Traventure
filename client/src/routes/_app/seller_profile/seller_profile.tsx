import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const SellerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'Ahmedmina21',
    email: 'minaSeller@gmail.com',
    profilePicture: 'src/assets/t2.jpg',
    name: '',
    description: '',
  
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

  

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (!error) {
      setIsEditing(false);
      console.log('Saved data:', userData);

      // UPDATE INFO TO DATABASE HERE
    } else {
      console.log('Cannot save due to validation error');
    }
  };




  const handleLogout = () => {
    
    navigate('/'); 
  };



  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{
        backgroundImage: `url('src/assets/mtn.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-8 backdrop-blur-lg bg-opacity-90">
        <div className="flex items-center space-x-6">
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-purple-500"
          />
          <div className="text-left">
            <h2 className="text-4xl font-extrabold text-purple-700">{userData.username}</h2>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleEdit}
                className="mt-1 text-lg text-gray-600 p-3 border border-gray-300 rounded-md w-full"
              />
            ) : (
              <p className="text-lg text-gray-600 overflow-auto w-[255px]">{userData.email}</p>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg overflow-auto w-[404px]">{userData.name}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Description:</label>
            {isEditing ? (
              <input
                type="text"
                name="description"
                value={userData.description}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg overflow-auto w-[404px]">{userData.description}</p>
            )}
          </div>
         
        </div>

    

        <div className="mt-8 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                Save
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
          <button onClick={handleLogout} className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
