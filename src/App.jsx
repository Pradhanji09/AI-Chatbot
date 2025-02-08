import {  useState } from "react";
import Chaboticon from "./components/Chaboticon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {




  const [chatHistory, setChatHistory] = useState([]);

  const getBotResponse = (history) => {
    console.log(history);
  };
  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header*/}
        <div className="chatbot-header">
          <div className="header-info">
            <Chaboticon />
            <h2 className="logo-text ">Chatbot </h2>
          </div>
          <button className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body*/}
        <div className="chatbot-body">
          <div className="message bot-message">
            <Chaboticon />
            <p className="message-text">
              Hey there <br /> How can I help you today?
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
