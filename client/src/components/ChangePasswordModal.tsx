import React from "react";
import { useForm, Controller } from "react-hook-form";

interface ChangePasswordModalProps{
username: string;
onClose: () => void;
onSubmit: (data: ChangePasswordData) => void;
}

interface ChangePasswordData{
    oldPassword: string;
    newPassword: string;
}
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
    username,
    onClose,
    onSubmit,
  }) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<ChangePasswordData>();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-lg font-semibold">Old Password</label>
                <Controller
                  name="oldPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.oldPassword && (
                  <p className="text-red-600">{errors.oldPassword.message}</p>
                )}
              </div>
    
              <div className="mb-4">
                <label className="block text-lg font-semibold">New Password</label>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.newPassword && (
                  <p className="text-red-600">{errors.newPassword.message}</p>
                )}
              </div>
    
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 px-4 rounded-md"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

export default ChangePasswordModal;


