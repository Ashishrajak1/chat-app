import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Auth from "@/pages/auth";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import { USERINFO_ROUTE } from "@/utils/constants";
import apiClient from "@/lib/api-client";
import { setUserInfo } from "@/features/auth/authSlice";
import { DiSenchatouch } from "react-icons/di";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(USERINFO_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200) {
          dispatch(setUserInfo(response.data.user));
          setProfile(response.data.user.profileSetup);
        } else {
          dispatch(setUserInfo(undefined));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold inline-flex items-center">
          <span className="text-[#d991c2] bounce-delay-0">C</span>
          <span className="text-[#d991c2] bounce-delay-1">O</span>
          <span className="text-[#d991c2] bounce-delay-2">D</span>
          <span className="text-[#d991c2] bounce-delay-0">E</span>
          <span className="text-[#9869b8] bounce-delay-1">
            <DiSenchatouch />
          </span>
          <span className="text-[#6756cc] bounce-delay-2">S</span>
          <span className="text-[#6756cc] bounce-delay-0">Y</span>
          <span className="text-[#6756cc] bounce-delay-1">N</span>
          <span className="text-[#6756cc] bounce-delay-2">C</span>
        </h1>
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/chat"
          element={profile ? <Chat /> : <Navigate to="/Profile" />}
        />
        <Route
          path="/profile"
          element={userInfo ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="*"
          element={<Navigate to={userInfo ? "/chat" : "/auth"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
