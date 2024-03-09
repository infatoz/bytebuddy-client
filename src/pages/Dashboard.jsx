import React, { useEffect } from "react";
import ListProblems from "./ListProblems";
import ListCategories from "./ListCategories";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate()
  // Check if user is not logged in on page load
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUserData = localStorage.getItem("userData");
    if (!storedToken && !storedUserData) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="dark:bg-gray-800">
      <section className="dark:bg-gray-800 dark:text-gray-100 welcome-greet">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-2xl font-bold leadi sm:text-2xl">Welcome back
            <span className="dark:text-violet-400"> Anishkrishna!&#128075;</span> 
          </h1>
        </div>
      </section>
      <div className="dark:bg-gray-100" style={{borderRadius:'50px 50px 0 0'}}>
        <div className="container-custom py-16 ">
          <div className="py-8">
            <ListProblems />
          </div>
          <div className="py-8">
            <ListCategories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
