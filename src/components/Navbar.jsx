import React from 'react'
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NavLink,useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import avatar from '../assets/avatar.png'

function Navbar() {
  const link = useLocation()
  const isHomeRoute = link.pathname === '/' || link.pathname === '/playground' || link.pathname === '/features' || link.pathname === '/how_it_works';
  const isLoggedIn = localStorage.getItem("userData") != null
  return (
    <>
    <div className='shadow-lg'>
      <Grid container spacing={2}>
      {isHomeRoute ? (
          <>
          <Grid item xs={3}> 
            <NavLink to="/">
            <div className='nav-tab nav-tab-1'>
              <img src={logo} alt="logo" />
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
                  <NavLink to="/features">Features</NavLink>
                </li>
                <li>
                  <NavLink to="how_it_works">How it works</NavLink>
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
        ) : (
          <>
          <>
        <Grid item xs={3}> 
          <NavLink to="/dashboard">
          <div className='nav-tab nav-tab-1'>
            <img src={logo} alt="logo" />
            <h1 className='logo-title'>ByteBuddy</h1>
          </div>
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <div className='nav-tab nav-tab-2'>
            <ul>
              <li> 
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Problems</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Solved problems</NavLink>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className='nav-tab nav-tab-3'>
              <NavLink to="/profile">
                <img src={avatar} height="50px" width="50px" alt="profile" />
              </NavLink>
          </div>
        </Grid>
        </>
          </>
        )}
      </Grid> 
    </div>
    </>
  )
}

export default Navbar
