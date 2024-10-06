import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { Controller } from "react-hook-form";
import useRegisterUser from "../../custom_hooks/useRegisterUser";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { PhoneInput } from "../../components/PhoneInput/phone-input";
import { E164Number } from "libphonenumber-js";
import countryList from "react-select-country-list";
// TODO: Use the Loading and error returning from the hook

const getAge = (dob: string): number => {
  const todaysdate = new Date();
  const birthday = new Date(dob);
  const monthdiff = todaysdate.getMonth() - birthday.getMonth();
  let age = todaysdate.getFullYear() - birthday.getFullYear();
  if (
    monthdiff < 0 ||
    (monthdiff === 0 && todaysdate.getDate() < birthday.getDate())
  ) {
    age--;
  }
  return age;
};

// Zod schema with conditional `job` requirement for tourist role
const schema = z
  .object({
    role: z.enum(["tourist", "tourguide", "advertiser", "seller"]),
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one letter and one number"
      ),
    mobileNumber: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .regex(/^\+?\d+$/, "Mobile number must be numeric"),
    nationality: z
      .string()
      .min(2, "Nationality must be at least 2 characters long"),
    dateOfBirth: z.string(),
    Occupation: z.string(),
  })
  .superRefine((data, ctx) => {
    const { role, dateOfBirth, Occupation } = data;

    // Age validation for non-tourist roles
    if (role === "tourist") {
      const age = getAge(dateOfBirth);
      if (age < 18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["dateOfBirth"],
          message: "You must be above 18 years old to register for this role",
        });
      }
    }

    // Job validation for tourists
    if (role === "tourist" && !Occupation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["Occupation"],
        message: "Job is required for tourists",
      });
    }
    // Mobile number validation for tourists
    if (role === "tourist" && !data.mobileNumber) {
      ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["mobileNumber"],
      message: "Mobile number is required for tourists",
      });
    }

    // Nationality validation for tourists
    if (role === "tourist" && !data.nationality) {
      ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["nationality"],
      message: "Nationality is required for tourists",
      });
    }
  });

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      mobileNumber: "",
      dateOfBirth: new Date().toISOString().split("T")[0],
      nationality: "Egypt",
      Occupation: "",
      role: "tourist",
    },
  });

  const role = watch("role", "tourist"); // Watch the selected role

  const [apiBody, setApiBody] = useState(null);

  const { data, loading, error } = useRegisterUser(apiBody, role);
  const countries = countryList().getData();
  const onSubmit = (data: any) => {
    setApiBody(data);
  };

  useEffect(() => {
    function handleError() {
      if (error !== null) {
        Swal.fire({
          title: "User was not created!",
          text: error,
          icon: "error",
        });
      }
    }
    handleError();
  }, [error]);

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('src/assets/mtn.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-1/2 h-1/2 grid grid-cols-1 overflow-hidden backdrop-blur-md bg-opacity-70 my-8">
        <div className="flex flex-col justify-center items-center p-12 space-y-8">
          <div className="flex flex-col items-center">
            <img
              src="src/assets/logo.png"
              alt="Logo"
              className="w-50 h-50 mb-7 object-contain"
            />
            <h2 className="text-5xl font-extrabold text-purple-600 mb-4 text-center leading-snug">
              Register Account
            </h2>
            <hr className="w-full border-t-2 border-purple-500 mb-6" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-6 pb-8"
          >
            {/* Role Selector */}
            <div>
              <label className="block text-gray-700 font-semibold text-lg mb-2">
                Role
              </label>
              <select
                title="Role"
                {...register("role")}
                className="custom-select w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200  "
              >
                <option value="tourist">Tourist</option>
                <option value="tourguide">Tour Guide</option>
                <option value="advertiser">Advertiser</option>
                <option value="seller">Seller</option>
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Fields for Tourist */}
            {role === "tourist" && (
              <>
                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full custom-select px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    {...register("username")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your username"
                  />
                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Mobile Number
                  </label>
                  <Controller
                    name="mobileNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        defaultCountry="EG"
                        placeholder="Enter a phone number"
                        international={true}
                        value={field.value as unknown as E164Number}
                        onChange={(value) => {
                          if (value !== "") {
                            field.onChange(value);
                          } else {
                            field.onChange(undefined);
                          }
                        }}
                      />
                    )}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500">
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Nationality
                  </label>
                  <Controller
                    name="nationality"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        value={field.value || ""}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                      >
                        <option value="" disabled>
                          Select a country
                        </option>
                        {countries.map((country) => (
                          <option key={country.value} value={country.label}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.nationality && (
                    <p className="text-red-500">{errors.nationality.message}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                {/* Job */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Job
                  </label>
                  <input
                    type="text"
                    {...register("Occupation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your job"
                  />
                  {errors.Occupation && (
                    <p className="text-red-500">{errors.Occupation.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Fields for Other Roles */}
            {role !== "tourist" && (
              <>
                {/* Username */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    {...register("username")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your username"
                  />
                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition duration-300"
              >
                {loading ? (
                  <ClipLoader size={20} color="#ffffff" /> // Show spinner while loading
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
          <div className="text-center ">
            Already have an account?{" "}
            <a
              href="/"
              className="text-purple-700 hover:text-purple-600 underline"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
