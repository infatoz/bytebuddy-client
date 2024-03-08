import * as React from "react";
import { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Paper,
  Button,
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
  AlertTitle,
  Box,
  Collapse,
  IconButton,
  ButtonGroup,
  Fab,
  List,
  ListItem,
  ListItemText,
  Drawer,
  TextField,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import ChatUI from "./ChatUI";
import { useRef } from "react";
import Markdown from "react-markdown";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProblemDetails = ({ problemData }) => {
  return (
    <Paper sx={{ p: 2, m: 0 }}>
      <Typography variant="h5">{problemData.question_title}</Typography>
      <Typography variant="body1">{problemData.description}</Typography>
      <Typography variant="body2">Topics: {problemData.topics}</Typography>
      {/* <Typography variant="body2">
        Categories: {problemData.categories.join(", ")}
      </Typography> */}
      {problemData.example_case && (
        <div>
          <Typography variant="subtitle1">Example Case:</Typography>
          {/* <Typography variant="code">
            Input: {problemData.example_case[0].sample_input}
          </Typography>
          <Typography variant="code">
            Output: {problemData.example_case[0].sample_output}
          </Typography> */}
          <code>{problemData.example_case[0].sample_input}</code>
          <code>{problemData.example_case[0].sample_output}</code>
        </div>
      )}
    </Paper>
  );
};

// const SnackbarAlert = ({ open, message, onClose }) => {
//   return (
//     <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
//       <Alert severity={message.includes("successful") ? "success" : "error"}>
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// };

const ProblemPlayground = () => {
  const { problemID } = useParams();

  const navigate = useNavigate();
  const [problems, setProblems] = useState({});

  const initialCode =
    "import java.util.Scanner;\r\n\r\npublic class AdditionExample {\r\n public static void main(String[] args) {\r\n Scanner sc = new Scanner(System.in);\r\n \r\n // Do your code here\r\n\r\n System.out.println(sum);\r\n }\r\n}";

  const [currentcode, setCurrentcode] = useState(initialCode);
  const [codeLang, setCodeLang] = useState("java");
  const [compileData, setCompileData] = useState({});
  const [chatData, setChatData] = useState([]);

  // Check if user is not logged in on page load
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUserData = localStorage.getItem("userData");
    if (!storedToken && !storedUserData) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProblem = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("Missing token");
      }

      const response = await fetch(`${API_BASE_URL}/problem/${problemID}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      setProblems(data);
    };

    fetchProblem();
  }, []);

  const handleEditorChange = (value, event) => {
    setCurrentcode(value);
    console.log("here is the current model value:", value);
  };

  const handleCompile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("Missing token");
      }
      const response = await fetch(`${API_BASE_URL}/compiler/compile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          sourceCode: currentcode,
          language: codeLang,
          input: problems.example_case[0].sample_input,
        }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      setCompileData(responseData);
    } catch (error) {
      console.log(error);
      setCompileData(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const messageInputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const msg = messageInputRef.current.value.trim();
    if (msg) {
      // setMessages(message)
      setMsg(msg);
      setMessages([{ content: msg, isSent: true, user: "You" }]);
      messageInputRef.current.value = "";
      doChat();
    }
  };

  const doChat = () => {
    fetch(`${API_BASE_URL}/bot/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemTitle: problems.question_title,
        problemDescription: problems.question_description,
        sampleInput: problems.example_case[0].sample_input,
        sampleOutput: problems.example_case[0].sample_output,
        sourceCode: currentcode,
        userQuery: msg,
      }),
    })
      .then((response) => response.text())
      .then((resp) => {
        const data = JSON.parse(resp);
        console.log(data.response);
        setMessages([{ content: data.response, isSent: false, user: "Bot" }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // try {

  //   if (response.ok) {
  //     console.log(response.text());
  //     // console.log(response);
  //     // setAlertSeverity("success");
  //     // setAlertMessage("Registration successful!");
  //     // navigate("/login"); // Navigate to login page after successful registration
  //   } else {
  //     const errorData = await response.text();
  //     // setAlertSeverity("error");
  //     console.log(errorData.message || "Registration failed!");
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  // };

  const DrawerList = (
    <Box sx={{ width: "70vw" }} role="presentation">
      <Button onClick={toggleDrawer(false)}>
        <CloseIcon />
      </Button>
      <div
        style={{ display: "flex", flexDirection: "column", height: "500px" }}
      >
        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {messages.map((message, index) => (
            <Markdown>{message.content}</Markdown>
          ))}
        </List>
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <TextField
            inputRef={messageInputRef}
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
    </Box>
  );
  return (
    <>
      {/* {JSON.stringify(currentcode)} */}
      <Container maxWidth="lg" sx={{ marginTop: 1 }}>
        {" "}
        {/* Remove padding and margins from Container */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={5} sx={{ p: 0, m: 0 }}>
            {" "}
            {/* Remove padding and margins from Grid items */}
            <ProblemDetails problemData={problems} />
          </Grid>
          <Grid item xs={12} md={7} sx={{ p: 0, m: 0 }}>
            {" "}
            {/* Remove padding and margins from Grid items */}
            <Paper sx={{ p: 2, m: 0 }}>
              <Editor
                theme={"vs-dark"}
                height="70vh"
                defaultLanguage="java"
                defaultValue={currentcode}
                onChange={handleEditorChange}
                options={{}}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Fab color="primary" aria-label="add" onClick={toggleDrawer(true)}>
        <ChatBubbleIcon />
      </Fab>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        hideBackdrop={false}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default ProblemPlayground;
