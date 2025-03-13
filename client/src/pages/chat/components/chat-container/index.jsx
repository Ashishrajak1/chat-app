import MessageContainer from "./components/message-container/MessageContainer";
import MessageBar from "./components/message-bar/MessageBar";
import ChatHeader from "./components/chat-header/ChatHeader";
const ChatContainer = () => {
  return (
    <div className="flex top-0 h-[100vh] w-[75vw] bg-[#e2e8f0] flex flex-col md:static md:flex-1">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
};

export default ChatContainer;
