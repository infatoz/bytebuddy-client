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
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Navbar from "../components/Navbar";

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

  const [currentcode, setCurrentcode] = useState("");

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

  const handleCompile = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      {JSON.stringify(currentcode)}
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
              <Editor
                height="90vh"
                defaultLanguage="java"
                defaultValue={currentcode}
                onChange={handleEditorChange}
              />
            </Paper>
            <Button onClick={(e) => handleCompile}>Run</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProblemPlayground;
