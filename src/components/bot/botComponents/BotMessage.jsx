import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";

export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container">
      <div className="bot-message">
        {isLoading ? "..." : <Markdown>{message}</Markdown>}
      </div>
    </div>
  );
}
