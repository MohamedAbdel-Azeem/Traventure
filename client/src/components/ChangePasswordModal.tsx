import { zodResolver } from "@hookform/resolvers/zod";
import { min } from "date-fns";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const FormleadSchema = z.object({
  oldPassword: z.string().min(8, { message: "Old Password is required" }),
  newPassword: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      { message: "Password must contain at least one letter and one number" }
    ),
});

export type AddContactLeadFormType = z.infer<typeof FormleadSchema>;

interface ChangePasswordModalProps {
  username: string;
  onClose: () => void;
  onFormSubmit: (data: ChangePasswordData) => void;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

function  ChangePasswordModal ({
  username,
  onClose,
  onFormSubmit,
}:ChangePasswordModalProps)  {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormleadSchema>>({
   resolver: zodResolver(FormleadSchema),
   defaultValues: {
    oldPassword: "",
    newPassword: "",
   },
 });
 function onSubmit(data: z.infer<typeof FormleadSchema>) {
 onFormSubmit(data); 
 
}
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form onSubmit={ handleSubmit(onSubmit)}>
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
