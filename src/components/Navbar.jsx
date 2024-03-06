import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";

const Logo = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginRight: "10px",
});

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic here
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f0f0f0", elevation: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Logo>
            {/* Replace with your logo image */}
            <img src={logo} alt="ByteBuddy" width="30px" height="30px" />
            <Typography variant="h6" noWrap component="div" color="primary">
              ByteBuddy
            </Typography>
          </Logo>
        </Link>
        <div>
          <Link
            to="/playground"
            style={{ textDecoration: "none", color: "black" }}
          >
            <IconButton>
              <ListItemIcon>
                <PlayCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Playground" />
            </IconButton>
          </Link>
          <Link
            to="/solved_problems"
            style={{ textDecoration: "none", color: "black" }}
          >
            <IconButton>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Solved Problems" />
            </IconButton>
          </Link>
        </div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <Avatar src="/avatar.png" />{" "}
          {/* Replace with your avatar image URL */}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
