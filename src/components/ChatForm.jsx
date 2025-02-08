import { useEffect, useRef } from "react";

const ChatForm = ({ chatHistory, getBotResponse, setChatHistory }) => {
  // Creating ref of DOM Input for getting value
  const inputRef = useRef();

  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current.focus();
  }, []);

  const HandleFormSubmit = (e) => {
    // Preventing form from submit
    e.preventDefault();

    //Getting Value from input
    const userMessage = inputRef.current.value.trim();

    // If input value not there it will return the function
    if (!userMessage) return;
    inputRef.current.value = "";

    // Updates the chathistory with user message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      // Adding Thinking message for bot
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      //Generatting bot response
      getBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={HandleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button className="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
