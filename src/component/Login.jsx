import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import axios from "axios"; // Axios for making HTTP requests
import { login } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (formData) => {
    setError("");

    try {
      // Determine if input is email or username
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.usernameOrEmail
      );

      // Prepare data to send, with key as either "email" or "username"
      const data = isEmail
        ? { email: formData.usernameOrEmail, password: formData.password }
        : { username: formData.usernameOrEmail, password: formData.password };

      // Make a POST request to your backend login endpoint
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data,
        { withCredentials: true }
      );

      const userData = response.data.data.user;
      if (response) {
        dispatch(login(userData));
      }

      // No need to save tokens manually if cookies are being used
      // localStorage.setItem("refreshToken", refreshToken);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-full max-w-[1166px]">
        {/* Logo */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8">
          <Logo width="726px" height="271px" className="shadow-lg" />
        </div>

        {/* Title */}
        <h1 className="text-center text-[96px] font-[Righteous] mt-[350px]">
          Log In
        </h1>

        {/* Form Container */}
        <div className="relative mx-auto mt-[150px] w-[1166px] h-[366px] bg-[#E9E6F3] rounded-lg border border-[#9E8DC9]">
          <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-6">
            <div>
              <Input
                label="Username or Email"
                placeholder="Enter your username or email"
                {...register("usernameOrEmail", {
                  required: "Username or Email is required",
                })}
              />
              {errors.usernameOrEmail && (
                <p className="text-red-600 mt-2">
                  {errors.usernameOrEmail.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-600 mt-2">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded"
            >
              Sign In
            </Button>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
