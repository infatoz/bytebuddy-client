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
    <div style={{ margin: 20 }}>
      <Typography variant="h4">List of Problems</Typography>
      <TextField
        label="Search Problems"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ margin: "10px 0" }}
        fullWidth
      />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", overflowX: "auto" }}>
          <TableContainer sx={{ padding: "16px" }}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ padding: "16px" }}>Title</TableCell>
                  <TableCell style={{ padding: "16px" }}>Description</TableCell>
                  <TableCell style={{ padding: "16px" }}>Likes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedProblems.map((problem) => (
                  <TableRow key={problem._id}>
                    <TableCell style={{ padding: "16px" }}>
                      <Link to={`/problem/${problem._id}`}>
                        {problem.question_title}
                      </Link>
                    </TableCell>
                    <TableCell style={{ padding: "16px" }}>
                      {problem.description.substring(0, 50)}
                    </TableCell>
                    <TableCell style={{ padding: "16px" }}>
                      {problem.likes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProblems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ListProblems;
