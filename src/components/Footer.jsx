import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
const Footer = ({ hideFooter }) => {
    if (hideFooter) {
        return null;
    }
  return (
    <>
     <footer className="px-24 py-2 dark:bg-white dark:text-black">
        <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
            <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400">
                    <img src={logo} alt="logo" />
                </div>
                <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
                    <li>
                        <p>© 2024 Bytebuddy | Developed with ❤️ by Manjunatha, Anishkrishna N & Sai Tejas</p>
                    </li>
                </ul>
            </div> 
            <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                <li>
                    <a rel="noopener noreferrer" href="#"></a>
                </li>
                <li>
                    <a rel="noopener noreferrer" href="#"></a>
                </li>
                <li>
                    <NavLink to="">Home</NavLink>
                </li>
            </ul>
        </div>
    </footer> 
    </>
  )
}

export default Footer
