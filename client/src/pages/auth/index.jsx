import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/lib/api-client";
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/features/auth/authSlice";
import { DiSenchatouch } from "react-icons/di";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (isLogin) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );
        console.log(response.data.user);
        if (response.status === 200 && response.data.user) {
          dispatch(setUserInfo(response.data.user));
          navigate("/chat");
        }
      } else {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );
        console.log(response);

        if (response.data.user.id) {
          if (response.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
      }
    } catch (error) {
      setMessage(error.response?.data || error.message);
      setMessageType("error");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {message && (
        <div
          className={`px-4 py-3 rounded relative text-center ${
            messageType === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
          role="alert">
          <strong className="font-bold">
            {messageType === "success" ? "Success! " : "Error! "}
          </strong>
          <span className="block sm:inline">{message}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setMessage(null)}>
            <svg
              className={`fill-current h-6 w-6 ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center pb-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold inline-flex items-center">
            <span className="text-[#d991c2]"> CODE</span>
            <span className="text-[#9869b8]">
              <DiSenchatouch />
            </span>
            <span className="text-[#6756cc]">SYNC</span>
          </h1>
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center mt-6 pb-2">
          <button
            className={`mr-4 px-4 py-2 font-bold text-gray-900 text-lg ${
              isLogin ? "text-indigo-600 border-b-2 border-indigo-600" : ""
            }`}
            onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button
            className={`px-4 py-2 font-bold text-gray-900 text-lg ${
              !isLogin ? "text-indigo-600 border-b-2 border-indigo-600" : ""
            }`}
            onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2 text-start">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
            {errors.email && (
              <div className="mt-1 text-red-600 text-sm text-start">
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2 text-start">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
            />
            {errors.password && (
              <div className="mt-1 text-red-600 text-sm text-start">
                {errors.password}
              </div>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 text-start">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
              />
              {errors.confirmPassword && (
                <div className="mt-1 text-red-600 text-sm text-start">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-3 py-1.5 rounded-md font-semibold shadow hover:bg-indigo-500">
              {isLogin ? "Sign in" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
