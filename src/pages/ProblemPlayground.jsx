import * as React from "react";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Autocomplete,Typography,Paper,Button,AppBar,Toolbar,AlertTitle,Box,Collapse,IconButton,ButtonGroup,Fab,List,ListItem,ListItemText,Drawer,TextField,ListItemAvatar,Avatar,} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useRef } from "react";
import Markdown from "react-markdown";
import { Splitter, SplitterPanel } from "primereact/splitter";
import InputBox from "../components/playground/InputBox";
import Chatbot from "../components/bot/Bot";
import ProblemDetails from "../components/playground/ProblemDetails";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


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
  const exampleCompileData = {
    stderr: "error: Run your code to see output...",
    exitCode: 1
  };
  const [currentcode, setCurrentcode] = useState(initialCode);
  const [codeLang, setCodeLang] = useState("java");
  const [compileData, setCompileData] = useState(exampleCompileData);
  const [chatData, setChatData] = useState([]);

  const options = ["Java", "Python"];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

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
  const [showbot, setShowbot] = useState(false);
  const toggleChatbot = () => {
    setShowbot(!showbot);
  };

 

  return (
    <>
      <div className="parent">
        <Splitter style={{ height: "85vh" }}>
          <SplitterPanel size={30}>
            <ProblemDetails problemData={problems} />
            <div className="w-full flex justify-center items-center gap-4 p-2">
                <Autocomplete
                  value={value}
                  onChange={(_, newValue) => setValue(newValue)}
                  inputValue={inputValue}
                  onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                  id="controllable-states-demo"
                  options={options}
                  sx={{ width: 250 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField {...params} label="Language"/>
                  )}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleCompile}
                  className="h-14 w-1/2"
                >
                  Run
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  // onClick={handleCompile}
                  className="h-14 w-1/2"
                >
                  Submit
                </Button>
              </div>
          </SplitterPanel>
          <SplitterPanel minSize={40} size={70}>
            <Splitter className="" style={{ width: "100%" }} layout="vertical">
              <SplitterPanel size={70}>
                <Editor
                  theme={"vs-dark"}
                  height="70vh"
                  defaultLanguage="java"
                  defaultValue={currentcode}
                  onChange={handleEditorChange}
                  options={{}}
                />
              </SplitterPanel>
              <SplitterPanel size={30}>
                <InputBox compileData={compileData} alignment="horizontal" />
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
        <div className="buddyIcon">
          <Fab color="primary" aria-label="add" onClick={toggleChatbot}>
            <ChatBubbleIcon />
          </Fab>
        </div>
        <div
          className="showBotToggle"
          style={{ display: showbot ? "block" : "none" }}
        >
          <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            defaultClassNameDragging="draggable-dragging"
            scale={1}
          >
            <div className="handle">
              <Chatbot />
            </div>
          </Draggable>
        </div>
      </div>
    </>
  );
};

export default ProblemPlayground;
