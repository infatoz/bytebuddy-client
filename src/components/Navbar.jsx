import React from 'react'
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <>
     <Grid container spacing={2}>
      <Grid item xs={3}> 
        <div className='nav-tab nav-tab-1'>
          <img src="logo.png" alt="logo" />
          <h1 className='logo-title'>ByteBuddy</h1>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className='nav-tab nav-tab-2'>
          <ul>
            <li> 
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">Features</NavLink>
            </li>
            <li>
              <NavLink to="/">How it works</NavLink>
            </li>
            <li>
              <NavLink to="/">Playground</NavLink>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div className='nav-tab nav-tab-3'>
          <button>
            <NavLink to="/dashboard">
              Get Started <ArrowForwardIosIcon />
            </NavLink>
          </button>
        </div>
      </Grid>
    </Grid> 
    </>
  )
}

export default Navbar
