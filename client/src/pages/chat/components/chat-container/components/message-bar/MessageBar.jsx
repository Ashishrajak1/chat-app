import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";

function MessageBar() {
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiRef = useRef();
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message Sent:", message);
      setMessage(""); // Clear input after sending
    }
  };

  const handleAttachFile = () => {
    console.log("Attachment Clicked");
  };

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex items-center px-3 py-2 sm:px-6 md:px-8 mb-6 gap-3 sm:gap-6">
      {/* Input + Icons Container */}
      <div className="flex-1 flex items-center bg-[#fefefe] rounded-md px-3 sm:px-4 h-full">
        <input
          aria-label="Message"
          placeholder="Enter your Message..."
          className="flex-1 text-sm sm:text-base  bg-transparent focus:bg-transparent focus:outline-none text-neutral-500 placeholder-neutral-500 h-full px-3"
          name="message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        {/* Attachment Button */}
        <button
          className="text-neutral-500 cursor-pointer hover:text-white transition-all px-2"
          onClick={handleAttachFile}>
          <GrAttachment className="text-xl sm:text-2xl" />
        </button>
        {/* Emoji Button */}
        <button
          className="relative text-neutral-500 cursor-pointer hover:text-white transition-all px-2"
          onClick={() => setEmojiPickerOpen(true)}>
          <RiEmojiStickerLine className="text-xl sm:text-2xl" />
        </button>
        <div className="absolute bottom-16 right-0" ref={emojiRef}>
          <EmojiPicker
            open={emojiPickerOpen}
            onEmojiClick={handleAddEmoji}
            Theme="light"
            emojiStyle="apple"
          />
        </div>
      </div>

      {/* Send Button */}
      <button
        className="bg-[#8417ff] cursor-pointer rounded-md flex items-center justify-center h-full px-3 sm:p-4 hover:bg-[#741bda] transition-all"
        onClick={handleSendMessage}>
        <IoSend className="text-xl sm:text-2xl text-white" />
      </button>
    </div>
  );
}

export default MessageBar;
