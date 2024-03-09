import React, { useState, useEffect } from 'react'

function ListCategories() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [problems, setProblems] = useState([]);
    const [categories, SetCategories] = useState([]);
    
    // fetch problems
    useEffect(() => {
        const fetchCategories = async () => {
          const token = localStorage.getItem("userToken");
    
          if (!token) {
            throw new Error("Missing token");
          }
    
          const response = await fetch(`${API_BASE_URL}/problem`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          const data = await response.json();
          setProblems(data);
        };
        fetchCategories();
      }, []);

      //fetch distinct categories from problems 
      useEffect(() => {
        const uniqueCategories = Array.from(
          new Set(problems.flatMap(problem => problem.categories))
        );
        SetCategories(uniqueCategories);
      }, [problems]);

      const codeCategories = [
        'Array','String','Linked List','Tree','Depth-First Search','Breadth-First Search','Dynamic Programming','Math'];
        

  return (
    <>
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Explore Code Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {codeCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">{category}</h3>
              <p className="text-gray-600 mb-2">Total Questions: 20</p>
              {/* Add additional content as needed */}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ListCategories
