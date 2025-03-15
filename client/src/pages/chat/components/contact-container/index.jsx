import React, { useState } from "react";
import { DiSenchatouch } from "react-icons/di";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { GrChannel } from "react-icons/gr";
import { useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
import { HOST } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import NewDm from "./components/NewDm.jsx";

function ContactContainer() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  let Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative text-gray-300 md:w-[35vw] lg:w-[35vw] xl:w-[30vw] bg-[#141718] border-r-2 border-[#2f303b] w-full h-screen flex flex-col">
      {/* Header */}
      <div className="h-[10vh] flex items-center px-3 py-2 sm:px-6 md:px-8 mb-4 gap-3 sm:gap-6">
        <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold inline-flex items-center">
          <span className="text-[#d991c2]">CODE</span>
          <span className="text-[#9869b8]">
            <DiSenchatouch />
          </span>
          <span className="text-[#6756cc]">SYNC</span>
        </h1>
      </div>

      {/* Chats Section */}
      <div className="h-[10vh] flex items-center px-3 py-2 sm:px-6 md:px-8 mb-4 gap-3 sm:gap-6 cursor-pointer">
        <div className="flex-1 flex items-center gap-5 bg-[#2a2b33] rounded-md px-3 sm:px-4 h-full">
          <BsFillChatLeftTextFill className="text-lg text-blue-500 font-bold" />
          <div className="font-medium">Chats</div>
        </div>
      </div>

      {/* New Chat Section */}
      <NewDm />

      {/* Channel Section */}
      <div className="h-[10vh] flex items-center px-3 py-2 sm:px-6 md:px-8 mb-4 gap-3 sm:gap-6 cursor-pointer">
        <div className="flex-1 flex items-center gap-5 bg-[#2a2b33] rounded-md px-3 sm:px-4 h-full">
          <GrChannel className="text-lg text-green-500 font-bold" />
          <div className="font-medium">Channel</div>
        </div>
      </div>

      {/* User Profile Section (Fixed Width Issue) */}
      <div className="mt-auto w-full">
        <div className="flex items-center px-3 py-2 sm:px-6 md:px-8 gap-3 sm:gap-6 cursor-pointer w-full">
          <div
            onClick={() => Navigate("/profile")}
            className="flex items-center gap-3 bg-[#2a2b33] rounded-md p-3 sm:px-4 h-full shadow-lg w-full">
            {userInfo.image ? (
              <section className="flex justify-center items-center shadow-md hover:cursor-pointer hover:scale-110 duration-300">
                <img
                  src={`${HOST}/${userInfo.image}`}
                  alt="Profile"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                />
              </section>
            ) : (
              <section className="flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
                <CiUser className="text-3xl fill-gray-700" />
              </section>
            )}
            <section>
              <div className="font-medium">
                {userInfo.firstName} {userInfo.lastName}
              </div>
              <div className="text-gray-400 font-semibold text-xs">
                {userInfo.email}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactContainer;
