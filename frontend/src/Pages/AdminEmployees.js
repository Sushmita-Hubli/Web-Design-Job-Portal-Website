import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from "@mui/material";
import './AdminEmployees.css';
import Navbar1 from "../Components/Navbar1";

const AdminEmployees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users when the component loads
    axios
      .get("http://localhost:4119/user/getAll") // Ensure this matches your backend endpoint
      .then((response) => {
        const employees = response.data;
       
        setUsers(employees); // Assuming the response is an array of user objects
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (

    <div className="admin-container">
    <Navbar1/>
      <Typography className="admin-header" variant="h4" component="h1" align="center" style={{ marginBottom: "20px" }}>
        Employees
      </Typography>
      <TableContainer className="table-container" component={Paper} style={{ width: "100%" }}>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminEmployees;
