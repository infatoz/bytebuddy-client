import React, { useState, useRef, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

const ChatUI = ({ data }) => {
  // const [messages, setMessages] = useState([]);
  // const messageInputRef = useRef(null);

  const sendMessage = () => {
    // const message = messageInputRef.current.value.trim(); // Trim leading/trailing spaces
    // if (message) {
    //   setMessages([
    //     ...messages,
    //     { content: message, isSent: true, user: "You" },
    //   ]);
    //   messageInputRef.current.value = "";
    // }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // Simulate receiving messages (replace with actual backend logic)
  //   useEffect(() => {
  //     const timerId = setTimeout(() => {
  //       setMessages([
  //         ...messages,
  //         { content: "This is a received message.", isSent: false, user: "Bot" },
  //       ]);
  //     }, 2000); // Simulate delay

  //     return () => clearTimeout(timerId);
  //   }, [messages]);

  // const messages = [
  //   {
  //     content: "This is a received message.",
  //     isSent: false,
  //     user: "Bot",
  //   },
  // ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "500px" }}>
      <List sx={{ flexGrow: 1, overflowY: "auto" }}>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            style={{
              display: "flex",
              justifyContent: message.isSent ? "flex-end" : "flex-start",
            }}
          >
            <ListItemAvatar>
              <Avatar
                icon={<PersonIcon />}
                sx={{
                  bgcolor: message.isSent ? "primary.main" : "secondary.main",
                }}
              />
            </ListItemAvatar>
            <ListItemText primary={message.content} secondary={message.user} />
          </ListItem>
        ))}
      </List>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <TextField
          //   inputRef={messageInputRef}
          onKeyPress={handleKeyPress}
          label="Message"
          variant="outlined"
          fullWidth
          placeholder="How can i help you?"
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatUI;
