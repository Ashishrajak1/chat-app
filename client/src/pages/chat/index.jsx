import ChatContainer from "./components/chat-container";
import ContactContainer from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";

function Chat() {
  return (
    <div className="flex h-[100vh] overflow-hidden">
      <ContactContainer />
      <ChatContainer />

      <EmptyChatContainer />
    </div>
  );
}

export default Chat;
