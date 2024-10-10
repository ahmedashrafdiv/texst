import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewAllCoursesInAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const token = localStorage.getItem("authToken");

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/courses/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setMessage("Deleted Successfully");
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  useEffect(() => {
    if (token) {
      // Fetch courses from the API
      axios
        .get("http://localhost:3000/courses", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCourses(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setErr(error.message);
          setLoading(false);
        });
    }
  }, [token,message]);

  //   console.log(courses);

  return (
    <Box sx={{ marginTop: "40px" }}>
      <Typography variant="h4" color="#fff" mb={2}>
        All Courses
      </Typography>
      {/* {message && (
                <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
                    {message}
                </Alert>
            )}
            {err && (
                <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                    {err}
                </Alert>
            )} */}

      {courses.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                  Course Name
                </TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                  Major
                </TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                  Professor
                </TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                  Duration
                </TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                  Number of Students
                </TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                  Edit
                </TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {course.title}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {course.major}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {course.professor.name}
                    {console.log(course.professor.name)}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {course.duration}h
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {course.students.length}{" "}
                    {/* Display the number of students */}
                  </TableCell>

                  <TableCell sx={{ fontWeight: "bold" }}>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(course._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">No courses available</Alert>
      )}
    </Box>
  );
};

export default ViewAllCoursesInAdmin;
