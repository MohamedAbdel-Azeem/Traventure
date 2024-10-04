import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod schema for validation
const sellerSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

type SellerProfileFormValues = z.infer<typeof sellerSchema>;

type SellerProfileType = {
  username: String,
  email: string,
  password: String,
  name: string,
  description:string,
  isAccepted: boolean
}
interface SellerProfileProps {
  seller: SellerProfileType;
}
const SellerProfile: React.FC<SellerProfileProps>= ({seller}) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // React Hook Form setup with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SellerProfileFormValues>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      email: seller.email,
      name: seller.name,
      description: seller.description,
    },
  });

  // Toggle Edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Save the form
  const onSubmit = (data: SellerProfileFormValues) => {
    console.log('Saved data:', data);
    setIsEditing(false);
    // UPDATE INFO TO DATABASE HERE
  };

  // Handle logout
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-6">
            <img
              src="src/assets/t2.jpg" // Hardcoded profile picture
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-purple-500"
            />
            <div className="text-left">
              <h2 className="text-4xl font-extrabold text-purple-700">Email:</h2>
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
                <p className="text-lg text-gray-600 overflow-auto w-[255px]">{seller.email}</p>
              )}
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">Name:</label>
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
                <p className="text-gray-800 text-lg overflow-auto w-[404px]">{seller.name}</p>
              )}
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">Description:</label>
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
                <p className="text-gray-800 text-lg overflow-auto w-[404px]">{seller.description}</p>
              )}
              {errors.description && <p className="text-red-600">{errors.description.message}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
                >
                  Save
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
              onClick={handleLogout}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;