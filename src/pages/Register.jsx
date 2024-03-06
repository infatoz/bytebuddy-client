import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Alert, Container, Grid } from "@mui/material";

const Register = () => {
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
    <div>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          {alertMessage && (
            <Alert severity={alertSeverity}>{alertMessage}</Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
          <Link to="/login">Already have an account? Login here</Link>
        </Grid>
      </Container>
    </div>
  );
};

export default Register;
