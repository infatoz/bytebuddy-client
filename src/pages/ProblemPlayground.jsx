import * as React from "react";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Draggable from "react-draggable";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import InputBox from "../components/playground/InputBox";
import Chatbot from "../components/bot/Bot";
import ProblemDetails from "../components/playground/ProblemDetails";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProblemPlayground = () => {
  const { problemID } = useParams();
  const navigate = useNavigate();
  const [problems, setProblems] = useState({});
  const initialCode =
    "import java.util.Scanner;\r\n\r\npublic class Solution {\r\n public static void main(String[] args) {\r\n Scanner sc = new Scanner(System.in);\r\n \r\n // Do your code here\r\n\r\n }\r\n}";
  const exampleCompileData = {
    stderr: "error: Run your code to see output...",
    exitCode: 1,
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

  const doChat = (text) => {
    return new Promise(function(resolve, reject) {
      fetch(`${API_BASE_URL}/bot/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemTitle: problems.question_title,
          problemDescription: problems.question_description,
          sampleInput: problems.example_case[0].sample_input,
          sampleOutput: problems.example_case[0].sample_output,
          sourceCode: currentcode,
          userQuery: text,
        }),
      })
        .then((response) => response.text())
        .then((resp) => {
          const data = JSON.parse(resp);
          console.log(data.response);
          resolve(data.response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  const [showbot, setShowbot] = useState(false);
  const toggleChatbot = () => {
    setShowbot(!showbot);
  };

  return (
    <>
      <div className="parent" style={{ height: "88vh" }}>
        <Splitter style={{ height: "100%" }}>
          <SplitterPanel size={30}>
            <Splitter className="" style={{ height: "100%" }} layout="vertical">
              <SplitterPanel size={90} minSize={90}>
                <ProblemDetails problemData={problems} />
              </SplitterPanel>
              <SplitterPanel size={10} minSize={10}>
                <div className="w-full flex justify-center items-center gap-4 p-2">
                  <Autocomplete
                    value={value}
                    onChange={(_, newValue) => setValue(newValue)}
                    inputValue={inputValue}
                    onInputChange={(_, newInputValue) =>
                      setInputValue(newInputValue)
                    }
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: 250 }}
                    disableClearable
                    renderInput={(params) => (
                      <TextField {...params} label="Language" />
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
            </Splitter>
          </SplitterPanel>
          <SplitterPanel minSize={50} size={70}>
            <Splitter className="" style={{ width: "100%" }} layout="vertical">
              <SplitterPanel size={60} minSize={50}>
                <Editor
                  theme={"vs-dark"}
                  height="100%"
                  defaultLanguage="java"
                  defaultValue={currentcode}
                  onChange={handleEditorChange}
                  options={{}}
                />
              </SplitterPanel>
              <SplitterPanel size={40} minSize={10}>
                <InputBox compileData={compileData} alignment="horizontal" />
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
        <div className="buddyIcon" onClick={toggleChatbot}>
          <img src={logo} alt="bot" height={"70px"} width={"70px"} />
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
              <Chatbot doChat={doChat} />
              {/* <div className="chatbot">
                <div style={{ position: "relative", height: "500px" }}>
                  <MainContainer>
                    <ChatContainer>
                      <MessageList>
                        <Message
                          model={{
                            message: "Hello my friend",
                            sentTime: "just now",
                            sender: "Joe",
                          }}
                        />
                      </MessageList>
                      <MessageInput placeholder="Type message here" />
                    </ChatContainer>
                  </MainContainer>
                </div>
              </div> */}
            </div>
          </Draggable>
        </div>
      </div>
    </>
  );
};

export default ProblemPlayground;
