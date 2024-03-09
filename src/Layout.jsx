import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const isPlaygroundPage = location.pathname === '/playground';

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer hideFooter={isPlaygroundPage} />
    </>
  );
}

export default Layout;
