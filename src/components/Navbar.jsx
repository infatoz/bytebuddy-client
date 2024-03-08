import React from 'react'
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NavLink,useLocation } from 'react-router-dom'
function Navbar() {
  const link = useLocation()
  // const isHomeRoute = link.pathname === '/' || link.pathname === '/playground';
  // const isDashboard = link.pathname === '/dashboard'
  const isDashboard = true
  const isHomeRoute = false

  return (
    <>
     <Grid container spacing={2}>
      {isHomeRoute && (
        <>
      <Grid item xs={3}> 
        <NavLink to="/">
        <div className='nav-tab nav-tab-1'>
          <img src="logo.png" alt="logo" />
          <h1 className='logo-title'>ByteBuddy</h1>
        </div>
        </NavLink>
      </Grid>
      <Grid item xs={6}>
        <div className='nav-tab nav-tab-2'>
          <ul>
            <li> 
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How it works</a>
            </li>
            <li>
              <NavLink to="/playground">Playground</NavLink>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div className='nav-tab nav-tab-3'>
          <button>
            <NavLink to="/login">
              Get Started <ArrowForwardIosIcon />
            </NavLink>
          </button>
        </div>
      </Grid>
      </>
      )}
      {isDashboard && (
        <>
      <Grid item xs={3}> 
        <NavLink to="/dashboard">
        <div className='nav-tab nav-tab-1'>
          <img src="logo.png" alt="logo" />
          <h1 className='logo-title'>ByteBuddy</h1>
        </div>
        </NavLink>
      </Grid>
      <Grid item xs={6}>
        <div className='nav-tab nav-tab-2'>
          <ul>
            <li> 
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <a href="#features">Problems</a>
            </li>
            <li>
              <a href="#how-it-works">Solved problems</a>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div className='nav-tab nav-tab-3'>
          <button>
            <NavLink to="/">
              <img src="logo.png" height="30px" width="30px" alt="profile" />
            </NavLink>
          </button>
        </div>
      </Grid>
      </>
      )}
    </Grid> 
    </>
  )
}

export default Navbar
