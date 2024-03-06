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
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Navbar from "../components/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProblemDetails = ({ problemData }) => {
  return (
    <Paper sx={{ p: 2, m: 0 }}>
      <Typography variant="h5">{problemData.question_title}</Typography>
      <Typography variant="body1">{problemData.description}</Typography>
      <Typography variant="body2">
        Topics: {problemData.topics.join(",")}
      </Typography>
      {/* <Typography variant="body2">
        Categories: {problemData.categories.join(", ")}
      </Typography> */}
      {problemData.example_case && (
        <div>
          <Typography variant="subtitle1">Example Case:</Typography>
          <Typography variant="body2">
            Input: {problemData.example_case[0].sample_input}
          </Typography>
          <Typography variant="body2">
            Output: {problemData.example_case[0].sample_output}
          </Typography>
        </div>
      )}
    </Paper>
  );
};

const CodeEditor = ({ code, handleCodeChange }) => {
  const editorRef = React.createRef();

  useEffect(() => {
    // const editor = AceEditor.edit(editorRef.current);
    // editor.setTheme("ace/theme/github");
    // editor.session.setMode("ace/mode/javascript"); // Change based on language
    // editor.setValue(code, -1); // Set initial code value
    // editor.setOptions({
    //   fontSize: 14,
    //   // Add other editor options as needed
    // });
  }, [code]);

  return (
    <div>
      {/* <AceEditor ref={editorRef} onChange={handleCodeChange} /> */}
      <AceEditor
        mode="java"
        theme="github"
        onChange={handleCodeChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

const CompileButton = ({ handleCompile }) => {
  return (
    <Button variant="contained" onClick={handleCompile}>
      Run
    </Button>
  );
};

const SnackbarAlert = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={message.includes("successful") ? "success" : "error"}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const ProblemPlayground = () => {
  const { problemID } = useParams();

  const navigate = useNavigate();
  const [problems, setProblems] = useState({});

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

  return (
    <>
      <Navbar />
      {/* {JSON.stringify(problems)} */}
      <Container maxWidth="lg" sx={{ p: 0, m: 0 }}>
        {" "}
        {/* Remove padding and margins from Container */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ p: 0, m: 0 }}>
            {" "}
            {/* Remove padding and margins from Grid items */}
            <ProblemDetails problemData={problems} />
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: 0, m: 0 }}>
            {" "}
            {/* Remove padding and margins from Grid items */}
            <Paper sx={{ p: 2, m: 0 }}>
              <CodeEditor
                code=""
                handleCodeChange={(code) => {
                  console.log(code);
                }}
              />
              <CompileButton handleCompile={() => {}} />
            </Paper>
            <SnackbarAlert open={false} message="" onClose={() => {}} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProblemPlayground;
