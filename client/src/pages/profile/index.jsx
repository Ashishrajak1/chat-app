import { useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "@/features/auth/authSlice";
import { CiUser } from "react-icons/ci";
import {
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
} from "@/utils/constants";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (firstName.trim().length < 1) {
      newErrors.firstName = "First name required";
    }
    if (lastName.trim().length < 1) {
      newErrors.lastName = "Last name required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Sync state when userInfo changes
  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
    }
    if (userInfo.image) {
      setSelectedImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await apiClient.post(
        UPDATE_PROFILE_ROUTE,
        { firstName, lastName },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMessageType(true);
        setMessage(response.data.message);
        dispatch(setUserInfo(response.data.user));
      }
    } catch (error) {
      setMessageType(false);
      setMessage(error.response.data.message || "Failed to update profile");
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();

      formData.append("image", file);
      if (userInfo.image) {
        if (userInfo.image) {
          formData.append("oldimage", userInfo.image);
        }
      }

      try {
        const response = await apiClient.post(
          ADD_PROFILE_IMAGE_ROUTE,
          formData,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setMessageType(true);
          setMessage(response.data.message);
          dispatch(setUserInfo(response.data.user));
        }
      } catch (error) {
        setMessageType(false);
        setMessage(error.response?.data?.message || "Failed to update profile");
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {message && (
          <div
            className={`px-4 py-3 rounded relative text-center ${
              messageType
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
            role="alert">
            <strong className="font-bold">
              {messageType ? "Success! " : "Error! "}
            </strong>
            <span className="block sm:inline">{message}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
              onClick={() => setMessage(null)}>
              <svg
                className={`fill-current h-6 w-6 ${
                  messageType ? "text-green-500" : "text-red-500"
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
        <div className="flex justify-between items-center  mb-4">
          <div>
            <FaArrowLeftLong
              className="cursor-pointer text-start items-start "
              onClick={() => navigate("/chat")}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold items-center text-center">
              Update Profile
            </h2>
          </div>
          <dir></dir>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 items-start text-start ">
          <div className="py-3 flex items-center justify-center">
            <label htmlFor="fileInput" className="cursor-pointer">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="flex items-center justify-center w-36 h-36 rounded-full border  border-gray-300">
                  <CiUser className="text-gray-400 text-6xl" />
                </div>
              )}
            </label>

            {/* Hidden File Input */}
            <input
              id="fileInput"
              type="file"
              name="image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              className="w-full border border-gray-300 p-2 rounded mt-2 "
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-2"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-2"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 cursor-pointer text-white px-3 py-2 rounded font-semibold hover:bg-indigo-500">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
