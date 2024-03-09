import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  let isPlaygroundPage = false
  if(location.pathname === '/playground' || location.pathname.startsWith('/problem/')){
   isPlaygroundPage = true;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer hideFooter={isPlaygroundPage} />
    </>
  );
}

export default Layout;
