import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Alert, Container, Grid, Typography } from "@mui/material";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  // Check if user is already logged in on page load
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUserData = localStorage.getItem("userData");
    if (storedToken && storedUserData) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlertSeverity("error");
      setAlertMessage("Please enter email and password!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;

        // Store token and user data in local storage
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user));

        setAlertSeverity("success");
        setAlertMessage("Login successful!");
        navigate("/dashboard"); // Navigate to dashboard after successful login
      } else {
        const errorData = await response.json();
        setAlertSeverity("error");
        setAlertMessage(errorData.message || "Login failed!");
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Login failed!");
    }
  };

  return (
    <div className="dark:bg-gray-100">
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
       
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {alertMessage && (
              <Alert severity={alertSeverity}>{alertMessage}</Alert>
            )}
             <Typography component="h1" variant="h5" style={{textAlign:"center",marginBottom:"30px"}}>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="dark:bg-white"
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="dark:bg-white"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Link to="/register">Don't have an account? Register here</Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
