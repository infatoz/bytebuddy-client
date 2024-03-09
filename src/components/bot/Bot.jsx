import React, { useState, useEffect } from "react";
import BotMessage from "./botComponents/BotMessage";
import UserMessage from "./botComponents/UserMessage";
import Messages from "./botComponents/Messages";
import Input from "./botComponents/Input";
import API from "./ChatbotAPI";
import Header from "./botComponents/Header";

export default function Chatbot({ doChat }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await doChat("Hello!")}
        />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async (text) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await doChat(text)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
}
