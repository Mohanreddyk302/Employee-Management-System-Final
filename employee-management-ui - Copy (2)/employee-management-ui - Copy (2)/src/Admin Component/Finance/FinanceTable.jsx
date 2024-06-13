/* eslint-disable no-undef */
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import employeeService from "../Utils/employeeService";
import FinanceUpdateForm from "./FinanceUpdateForm";

// const employees = [1, 1, 1, 1, 1, 1];
const FinanceTable = () => {
  const [employees, setEmployees] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleOpenUpdateEmployee = (id) => {
    setSelectedEmployeeId(id);
    setOpenUpdate(true);
  };

  const handleCLoseUpdateEmployee = () => {
    setOpenUpdate(false);
    setSelectedEmployeeId(null);
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const data = await employeeService.getEmployees(token);
      setEmployees(data);
      console.log("Employee data", data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Box>
      <Card
        sx={{ mt: 1, bgcolor: "#0d0e12", color: "white" }}
        className="border rounded-md border-indigo-200"
      >
        <CardHeader title={"Employees Finance Details"} sx={{ pt: 2 }} />
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, bgcolor: "#0d0e12" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ fontWeight: "bold" }}>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Pan No.
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Adhaar No.
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Bank Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Account No.
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  IFSC Code
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Branch Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "white" }}>
                    {item.id}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.panNo}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.adhaar}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.bankName}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.accountNumber}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.ifscCode}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.branchName}
                  </TableCell>

                  <TableCell align="left">
                    <Button
                      onClick={() => handleOpenUpdateEmployee(item.id)}
                      sx={{ color: "#646cff" }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={openUpdate}
        onClose={handleCLoseUpdateEmployee}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Update Employee Finance Details
            <IconButton
              onClick={handleCLoseUpdateEmployee}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <FinanceUpdateForm
            employeeId={selectedEmployeeId}
            onClose={handleCLoseUpdateEmployee}
            setEmployees={setEmployees}
            // onUpdate={() => {
            //   fetchEmployees();
            //   setOpenUpdate(false);
            // }}
            // fetchEmployees={fetchEmployees}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FinanceTable;
