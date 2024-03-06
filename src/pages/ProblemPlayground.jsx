import * as React from "react";
import { useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
// import ProblemDetails from "./ProblemDetails"; // Import the ProblemDetails component
// import CodeEditor from "./CodeEditor"; // Import the CodeEditor component
// import CompileButton from "./CompileButton"; // Import the CompileButton component
// import SnackbarAlert from "./SnackbarAlert"; // Import the SnackbarAlert component
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Navbar from "../components/Navbar";

const API_BASE_URL = "your_api_base_url"; // Replace with your actual API base URL

const ProblemDetails = ({ problemData }) => {
  return (
    <Paper sx={{ p: 2, m: 0 }}>
      <Typography variant="h5">{problemData.question_title}</Typography>
      <Typography variant="body1">{problemData.description}</Typography>
      <Typography variant="body2">
        Topics: {problemData.topics.join(", ")}
      </Typography>
      <Typography variant="body2">
        Categories: {problemData.categories.join(", ")}
      </Typography>
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
  const { problemId } = useParams();

  const data = {
    _id: "65e106eb20c41dfd20a54b47",
    question_title: "Example Problem Title",
    description: "Description of the problem goes here.",
    likes: 0,
    topics: ["topic1", "topic2"],
    categories: ["category1", "category2"],
    example_case: [
      {
        sample_input: "Input sample",
        sample_output: "Output sample",
        explanation: "Explanation of example case",
        _id: "65e106eb20c41dfd20a54b48",
      },
    ],
    test_case: [
      {
        input: "Test input 1",
        output: "Expected output 1",
        _id: "65e106eb20c41dfd20a54b49",
      },
      {
        input: "Test input 2",
        output: "Expected output 2",
        _id: "65e106eb20c41dfd20a54b4a",
      },
    ],
    sample_code: [],
    __v: 0,
  };
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ p: 0, m: 0 }}>
        {" "}
        {/* Remove padding and margins from Container */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ p: 0, m: 0 }}>
            {" "}
            {/* Remove padding and margins from Grid items */}
            <ProblemDetails problemData={data} />
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
