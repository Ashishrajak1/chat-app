import React from "react";

function ChatHeader() {
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] bg-[#141718] flex items-center justify-between px-20 text-white">
      <div className="flex gap-5 items-center ">
        <div className="flex gap-3 items-center justify-center ">back</div>
        <div className="flex gap-3 items-center justify-center ">
          ChatHeader
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
