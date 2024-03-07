import React from "react";
import Navbar from "../components/Navbar";
import ListProblems from "./ListProblems";
import ListCategories from "./ListCategories";

function Dashboard() {
  return (
    <>
      <Navbar />
      <ListProblems />
      <ListCategories />
    </>
  );
}

export default Dashboard;
