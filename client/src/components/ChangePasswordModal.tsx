import { zodResolver } from "@hookform/resolvers/zod";
import { min } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormleadSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    "Password must contain at least one letter and one number"
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

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  username,
  onClose,
  onFormSubmit,
}) => {
  const form = useForm<z.infer<typeof FormleadSchema>>({
   resolver: zodResolver(FormleadSchema),
   defaultValues: {
    oldPassword: "",
    newPassword: "",
   },
 });
 function onSubmit(data: z.infer<typeof FormleadSchema>) {
 onFormSubmit(data); 
 console.log(data);
}
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Old Password</label>
            <input
              {...form.register("oldPassword", { required: "Old password is required" })}
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {form.formState.errors.oldPassword && (
              <p className="text-red-600">{form.formState.errors.oldPassword.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold">New Password</label>
            <input
              {...form.register("newPassword", { required: "New password is required" })}
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {form.formState.errors.newPassword && (
              <p className="text-red-600">{form.formState.errors.newPassword.message}</p>
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
