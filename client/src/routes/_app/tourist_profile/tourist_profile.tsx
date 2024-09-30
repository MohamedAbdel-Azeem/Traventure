import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const TouristProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'MinaAhmed21',
    email: 'mina@gmail.com',
    mobile: '+201186948329',
    nationality: 'American',
    dob: '1990-05-15',
    job: 'Photographer',
    profilePicture: 'src/assets/t2.jpg',
    wallet: '456',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'dob') {
        if (!value) {
            setError('Date of Birth cannot be empty.');
            return;
          }
      const todaysdate = new Date();
      const birthday = new Date(value);
      const monthdiff = todaysdate.getMonth() - birthday.getMonth();
      let age = todaysdate.getFullYear() - birthday.getFullYear();
      if (monthdiff < 0 || (monthdiff === 0 && todaysdate.getDate() < birthday.getDate())) {
        age--;
      }

      if (age < 18) {
        setError('Age must be 18 years or older.');
        return;
      } else {
        setError(null);
      }
    }

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
              <p className="text-lg text-gray-600">{userData.email}</p>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Mobile Number:</label>
            {isEditing ? (
              <input
                type="tel"
                name="mobile"
                value={userData.mobile}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg">{userData.mobile}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Nationality:</label>
            {isEditing ? (
              <input
                type="text"
                name="nationality"
                value={userData.nationality}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg">{userData.nationality}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Date of Birth:</label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg">{userData.dob}</p>
            )}
            {error && <p className="text-red-600 mt-1">{error}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Job:</label>
            {isEditing ? (
              <input
                type="text"
                name="job"
                value={userData.job}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg">{userData.job}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center bg-purple-50 py-3 px-4 rounded-lg shadow-md border border-purple-200 max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <label className="text-xl font-semibold text-purple-700">Wallet Balance:</label>
              <p className="text-4xl font-bold text-purple-900">${userData.wallet}</p>
            </div>
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
          <button  onClick={handleLogout} className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouristProfile;
