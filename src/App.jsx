import { useEffect, useRef, useState } from "react";
import Chaboticon from "./components/Chaboticon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();
  const getBotResponse = async (history) => {
    //Upadting chat history by bot response
    const updatesHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    // Format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    // Formating options for fetch and API call
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: history,
      }),
    };

    try {
      // Making API call
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );

      const data = await response.json();

      // If response status is not ok throwing error
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong");

      //Bot response
      const botResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updatesHistory(botResponseText);
      console.log(chatHistory);
    } catch (error) {
      updatesHistory(error.message, true);
    }
  };

  // On component mount scroll to top on evry chathistory changed
  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        id="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close </span>
      </button>
      <div className="chatbot-popup">
        {/* Chatbot Header*/}
        <div className="chatbot-header">
          <div className="header-info">
            <Chaboticon />
            <h2 className="logo-text ">Chatbot </h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-outlined"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body*/}
        <div ref={chatBodyRef} className="chatbot-body">
          <div className="message bot-message">
            <Chaboticon />
            <p className="message-text">
              Hey 👋 <br /> How can I help you today?
            </p>
          </div>

          {/* Rendering chat message dynamically*/}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot Footer*/}
        <div className="chatbot-footer">
          <ChatForm
            getBotResponse={getBotResponse}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
