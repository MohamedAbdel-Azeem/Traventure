import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { set } from 'react-hook-form';
import { any } from 'zod';

interface Company {
  _id: string;
  name: string;
  address: string;
  logo: string;
  about: string;
  __v: number;
}

interface PreviousWork {
  company: Company;
  startDate: string;
  endDate: string;
  role: string;
  location: string;
  description: string;
  _id: string;
}

interface UserData {
  username: string;
  email: string;
  mobile: string;
  yox: number;
  prevwork: PreviousWork[];
  profilePicture: string;
}


const TourGuideProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    username: 'MinaAhmed21',
    email: 'mina@tourguide.com',
    mobile: '',
    yox: 0,
    prevwork: [{company: {_id:'2', name: 'Company 1', address: 'Address 1', logo: 'src/assets/c1.jpg', about: 'About 1', __v: 0}, startDate: '2021-01-01', endDate: '2021-12-31', role: 'Role 1', location: 'Location 1', description: 'Description 1', _id: '1'}],
    profilePicture: 'src/assets/t2.jpg',
  });
  const url = `traventure/api/tourGuide/sdnndsnp`;
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;

    if (data.previousWork) {
      const transformedPreviousWork: PreviousWork[] = data.previousWork.map((work: any) => ({
        company: {
          _id: work.company._id, 
          name: work.company.name,
          address: work.company.address ,
          logo: work.company.logo,
          about: work.company.about,
          __v: work.company.__v,
        },
        startDate: work.startDate,
        endDate: work.endDate,
        role: work.role,
        location: work.location,
        description: work.description,
      }));

      setUserData({
        username: data.username,
        email: data.email,
        mobile: data.mobileNumber,
        yox: data.yearsOfExperience,
        prevwork: transformedPreviousWork,
        profilePicture: 'src/assets/t2.jpg',
      });
    }
  } catch (error) {
    console.log('Error fetching data:', error);
  }

}

    useEffect( () => {
      fetchData();
    }, []);
    
  
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

  function handleDelete(_id: any): void {
   // DELETE INFO FROM DATABASE HERE
  }



  function handleAdd(): void {
    // CREATE A MODAL TO ADD INFO AND WHEN SUBMITTING ADD TO DATABASE
  }

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
            <label className="text-lg font-semibold text-gray-700">Mobile Number:</label>
            {isEditing ? (
              <input
                type="number"
                name="mobile"
                value={userData.mobile}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg overflow-auto w-[404px]">{userData.mobile}</p>
            )}
          </div>
          
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Years of work:</label>
            {isEditing ? (
              <input
                type="number"
                name="yox"
                value={userData.yox}
                onChange={handleEdit}
                className="text-lg p-3 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-800 text-lg overflow-auto w-[404px]">{userData.yox}</p>
            )}
            {error && <p className="text-red-600 mt-1">{error}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Previous work experience:</label>
            {isEditing ? (
          <ul className='flex flex-col gap-3 pt-2'>
            {userData.prevwork.map((work, index) => (
              <li key={index} className='flex flex-row bg-white p-4 mb-2 rounded-md justify-around'>
                <div>
                <h3><b>Company</b> : {work.company.name}</h3>
                <p> <b>Role</b> : {work.role}</p>
                <p> <b>Location</b> : {work.location}</p>
                <p> <b>Duration</b> : {new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}</p>
                <p> <b>Description</b> : {work.description}</p>
                </div>
                <button onClick={() => handleDelete(work._id)} className=" size-10 self-center hover:text-red-500">
                <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
            
            <button onClick={()=> handleAdd()}             className="bg-purple-600  text-white w-1/4 self-center py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200 ">Add</button>
            
          </ul>
        ) : (
          <ul className='flex flex-col gap-3 pt-2'>
            {userData.prevwork.map((work, index) => (
             <li key={index} className='flex flex-row bg-white p-4 mb-2 rounded-md'>
             <div>
             <h3><b>Company</b> : {work.company.name}</h3>
             <p> <b>Role</b> : {work.role} at {work.location}</p>
             <p> <b>Duration</b> : {new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}</p>
             <p> <b>Description</b> : {work.description}</p>
             </div>
             <button className=" size-10 self-center">
             </button>
           </li>
            ))}
          </ul>
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
          <button  onClick={handleLogout} className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;
