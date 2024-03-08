import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Alert, Container, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Register = () => {
  const theme = createTheme();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setAlertSeverity("error");
      setAlertMessage("Passwords do not match!");
      return;
    }

    // Simulate API call for registration (replace with your actual logic)
    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullName,
          username: email,
          email,
          password,
          confirmPassword,
          userRole: "user",
        }),
      });

      if (response.ok) {
        setAlertSeverity("success");
        setAlertMessage("Registration successful!");
        navigate("/login"); // Navigate to login page after successful registration
      } else {
        const errorData = await response.json();
        setAlertSeverity("error");
        setAlertMessage(errorData.message || "Registration failed!");
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Registration failed!");
    }
  };

  return (
    <div className="dark:bg-gray-100">
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Grid container spacing={2} mt={3}>
          {alertMessage && (
            <Grid item xs={12}>
              <Alert severity={alertSeverity}>{alertMessage}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <form onSubmit={handleSubmit} sx={{ width: "100%" }}>
              <TextField
                label="Full Name"
                variant="outlined"
                margin="normal"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="dark:bg-white"
                required
              />
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
              <TextField
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="dark:bg-white"
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth mt={2}>
                Register
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login here</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Register;
