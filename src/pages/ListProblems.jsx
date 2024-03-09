import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  TablePagination,
  Typography,
  TableContainer,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

const ListProblems = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchProblems = async () => {
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

    fetchProblems();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 1 when changing rows per page
  };

  const filteredProblems =
    searchQuery && problems.length > 0
      ? problems.filter((problem) =>
          problem.question_title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : problems;

  const displayedProblems = filteredProblems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container mx-auto p-6 rounded-lg">
  <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Coding Enigmas: A Cascade of Puzzling Challenges</h1>
  <input
    type="text"
    placeholder="Search Problems"
    value={searchQuery}
    onChange={handleSearchChange}
    className="w-full p-4 border border-purple-300 rounded-md focus:outline-none focus:ring focus:border-purple-500 mb-8"
  />
  <div className="w-full overflow-x-auto">
    <table className="w-full border-collapse border border-purple-300 bg-white rounded-md shadow-md">
      <thead>
        <tr className="bg-purple-500 text-white">
          <th className="p-4">Title</th>
          <th className="p-4">Description</th>
          <th className="p-4">Likes</th>
        </tr>
      </thead>
      <tbody>
        {displayedProblems.map((problem) => (
          <tr key={problem._id}>
            <td className="p-4">
              <Link to={`/problem/${problem._id}`} className="text-purple-600 hover:underline">
                {problem.question_title}
              </Link>
            </td>
            <td className="p-4">{problem.description.substring(0, 50)}</td>
            <td className="p-4">{problem.likes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="w-full mt-8 flex justify-between items-center">
    <div className="flex items-center">
      <span className="mr-2">Rows per page:</span>
      <select
        value={rowsPerPage}
        onChange={handleChangeRowsPerPage}
        className="p-2 border border-purple-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
      >
        {[5, 10, 25].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    <div className="flex items-center">
      <span className="mr-2">Page:</span>
      <span>{page + 1}</span>
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => handleChangePage(page - 1)}
        disabled={page === 0}
        className={`p-2 border border-purple-300 rounded-md ${page === 0 ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-purple-500 hover:text-white'}`}
      >
        Previous
      </button>
      <button
        onClick={() => handleChangePage(page + 1)}
        disabled={(page + 1) * rowsPerPage >= filteredProblems.length}
        className={`p-2 border border-purple-300 rounded-md ${((page + 1) * rowsPerPage >= filteredProblems.length) ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-purple-500 hover:text-white'}`}
      >
        Next
      </button>
    </div>
  </div>
</div>
  );
};

export default ListProblems;
