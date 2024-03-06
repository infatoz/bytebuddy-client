import * as React from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import Error404Icon from "../assets/errorimage.png"; // Replace with your SVG path

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: "600px" }}>
        <img src={Error404Icon} alt="404 Error" width="200" height="200" />
        <Typography variant="h4" sx={{ mt: 2, mb: 3 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1">
          The requested page was not found. It may have been deleted, moved, or
          never existed in the first place.
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} href="/dashboard">
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default ErrorPage;
