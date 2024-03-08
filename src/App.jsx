import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout.jsx'
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login"; // Replace with your Login component path
import Dashboard from "./pages/Dashboard"; // Replace with your Dashboard component path
import Home from "./pages/Home"; // Replace with your Home component path (optional)
import Playground from "./pages/Playground";
import ProblemPlayground from "./pages/ProblemPlayground";
import ChatUI from "./pages/ChatUI";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/problem/:problemID" element={<ProblemPlayground />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
