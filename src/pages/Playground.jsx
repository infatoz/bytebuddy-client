import React, { useState, useEffect, useRef } from 'react';
import Editor from "@monaco-editor/react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputBox from '../components/playground/InputBox';

const options = ["Java", "Python"];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Playground = () => {
  const initialCode = `import java.util.Scanner;\r\n\r\npublic class AdditionExample {\r\n public static void main(String[] args) {\r\n Scanner sc = new Scanner(System.in);\r\n \r\n // Do your code here\r\n\r\n System.out.println(sum);\r\n }\r\n}`;
  const exampleCompileData = {
    stderr: "error: Run your code to see output...",
    exitCode: 1,
  };
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [codeLang, setCodeLang] = useState("java");
  const [compileData, setCompileData] = useState(exampleCompileData);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [editorWidth, setEditorWidth] = useState('100%');
  const editorContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = (entries) => {
      const newWidth = entries[0].contentRect.width + 'px';
      setEditorWidth(newWidth);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    const targetDiv = editorContainerRef.current;

    resizeObserver.observe(targetDiv);

    return () => {
      resizeObserver.disconnect();
    };
  }, [editorWidth]);

  const handleEditorChange = (value) => {
    setCurrentCode(value);
  };

  const handleCompile = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("Missing token");
      }

      const response = await fetch(`${API_BASE_URL}/compiler/compile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          sourceCode: currentCode,
          language: codeLang,
          input: "20",
        }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const responseData = await response.json();
      setCompileData(responseData);
    } catch (error) {
      console.error(error);
      setCompileData(error);
    }
  };

  return (
    <div className="bg-gray-200">
      <Splitter style={{ height: "85vh" }}>
        <SplitterPanel className="p-0" size={75}>
          <div id="editor-container" ref={editorContainerRef} className="container h-full">
            <Editor
              className="p-2"
              theme="vs-dark"
              height="100%"
              width={editorWidth}
              defaultLanguage="java"
              defaultValue={initialCode}
              onChange={handleEditorChange}
            />
          </div>
        </SplitterPanel>
        <SplitterPanel className="p-0" size={25}>
          <div className="mx-0 bg-white h-full p-0 w-full">
            <div className="w-full h-full">
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
                  variant="outlined"
                  color="primary"
                  onClick={handleCompile}
                  className="h-14 w-1/2"
                >
                  Run
                </Button>
              </div>
              <InputBox compileData={compileData} alignment="vertical" />
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
};

export default Playground;
