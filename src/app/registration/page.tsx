"use client";
import { useUserRegistrationMutation } from "@/redux/api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  contactNo: Yup.string().required("Contact number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

function Registration() {
  const router = useRouter();
  const [userRegister] = useUserRegistrationMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    // Handle the registration logic here
    console.log(data);
    const res = await userRegister({ ...data }).unwrap();
    if (res?.id) {
      message.success("User registered successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
    console.log(res);
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-1/2">
          <Image
            src={
              "https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg"
            }
            width={500}
            height={500}
            alt="login image"
          />
        </div>
        <div className="w-1/2 bg-white p-8 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="name"
                    className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="email"
                    className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactNo"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <Controller
                name="contactNo"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="contactNo"
                    className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                      errors.contactNo ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {errors.contactNo && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.contactNo.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="password"
                    className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform hover:scale-105 ease-in-out duration-300"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
