// /* eslint-disable no-unused-vars */
// // /* eslint-disable react/prop-types */
// // import {
// //   Card,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// // } from "@mui/material";

// // const EmployeeProfessionalDetails = ({ details }) => {
// //   return (
// //     <div>
// //       <Card sx={{ mt: 1 }} className="border rounded-md border-indigo-200">
// //         <TableContainer component={Paper}>
// //           <Table sx={{ minWidth: 650 }} aria-label="simple table">
// //             <TableHead>
// //               <TableRow sx={{ fontWeight: "bold" }}>
// //                 <TableCell
// //                   align="left"
// //                   sx={{
// //                     fontSize: "1.2rem",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Employee Id
// //                 </TableCell>
// //                 <TableCell
// //                   align="left"
// //                   sx={{
// //                     fontSize: "1.2rem",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Company Name
// //                 </TableCell>
// //                 <TableCell
// //                   align="left"
// //                   sx={{
// //                     fontSize: "1.2rem",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Category
// //                 </TableCell>
// //                 <TableCell
// //                   align="left"
// //                   sx={{
// //                     fontSize: "1.2rem",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Salary
// //                 </TableCell>
// //                 <TableCell
// //                   align="left"
// //                   sx={{
// //                     fontSize: "1.2rem",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Experience
// //                 </TableCell>
// //                 <TableCell
// //                   align="left"
// //                   sx={{
// //                     fontSize: "1.2rem",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Bank Name
// //                 </TableCell>
// //                 <TableCell
// //                   align="left"
// //                   sx={{
// //                     fontSize: "1.2rem",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Account Number
// //                 </TableCell>
// //                 <TableCell
// //                   align="left"
// //                   sx={{
// //                     fontSize: "1.2rem",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   IFSC Code
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {/* {[1].map((item) => ( */}
// //               <TableRow
// //                 // key={item.id}
// //                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
// //               >
// //                 <TableCell component="th" scope="row">
// //                   {details.empId}
// //                 </TableCell>
// //                 <TableCell component="th" scope="row">
// //                   {details.companyName}
// //                 </TableCell>
// //                 <TableCell align="left">{details.category}</TableCell>
// //                 <TableCell align="left">{details.salary}</TableCell>
// //                 <TableCell align="left">
// //                   {details.experience} Year{details.experience > 1 ? "s" : ""}
// //                 </TableCell>
// //                 <TableCell align="left">{details.bankName}</TableCell>
// //                 <TableCell align="left">{details.accountNumber}</TableCell>
// //                 <TableCell align="left">{details.ifscCode}</TableCell>
// //               </TableRow>
// //               {/* ))} */}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default EmployeeProfessionalDetails;

// /* eslint-disable react/prop-types */
// import {
//   Button,
//   Card,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useEffect, useState } from "react";
// import EmployeeProfessionalUpdateForm from "./EmployeeProfessionalUpdateForm";
// import employeeService from "../Utils/employeeService";
// import axios from "axios";

// const EmployeeProfessionalDetails = ({ employeeId }) => {
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
//   const [employee, setEmployee] = useState(null);

//   const handleOpenUpdateEmployee = (id) => {
//     setSelectedEmployeeId(id);
//     setOpenUpdate(true);
//   };

//   const handleCLoseUpdateEmployee = () => {
//     setOpenUpdate(false);
//     // fetchEmployees();
//     setSelectedEmployeeId(null);
//   };
//   const fetchEmployee = async () => {
//     try {
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `http://localhost:9000/api/admin/employees/${employeeId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setEmployee(response.data);
//       console.log("Employee data", response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployee();
//   }, []);

//   return (
//     <div>
//       <Card sx={{ mt: 1 }} className="border rounded-md border-indigo-200">
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow sx={{ fontWeight: "bold" }}>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Employee Id{" "}
//                 </TableCell>

//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Company Name{" "}
//                 </TableCell>

//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Company Email{" "}
//                 </TableCell>

//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Manager Name{" "}
//                 </TableCell>

//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Category{" "}
//                 </TableCell>

//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Salary{" "}
//                 </TableCell>

//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Experience{" "}
//                 </TableCell>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Company Location{" "}
//                 </TableCell>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {" "}
//                   Actions{" "}
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* {employees.map((item) => ( */}
//               <TableRow
//                 // key={item.id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {employee.id}
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                   {employee.companyName}
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                   {employee.companyEmail}
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                   {employee.managerName}
//                 </TableCell>
//                 <TableCell align="left">{employee.category}</TableCell>
//                 <TableCell align="left">{employee.salary}</TableCell>
//                 <TableCell align="left">
//                   {employee.experience} Year
//                   {employee.experience > 1 ? "s" : ""}
//                 </TableCell>
//                 <TableCell align="left">{employee.companyLocation}</TableCell>
//                 <TableCell align="left">
//                   <Button
//                     onClick={() => handleOpenUpdateEmployee(employee.id)}
//                     sx={{ color: "#646cff" }}
//                   >
//                     Update
//                   </Button>
//                 </TableCell>
//               </TableRow>
//               {/* ))} */}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>

//       <Dialog
//         open={openUpdate}
//         onClose={handleCLoseUpdateEmployee}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>
//           <div className="font-semibold text-2xl text-indigo-600">
//             Update Employee Professional Details
//             <IconButton
//               onClick={handleCLoseUpdateEmployee}
//               style={{ float: "right", color: "#646cff" }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </div>
//         </DialogTitle>
//         <DialogContent>
//           <EmployeeProfessionalUpdateForm
//             employeeId={selectedEmployeeId}
//             onClose={handleCLoseUpdateEmployee}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default EmployeeProfessionalDetails;

/* eslint-disable react/prop-types */
import {
  Button,
  Card,
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
import EmployeeProfessionalUpdateForm from "./EmployeeProfessionalUpdateForm";
import axios from "axios";

const EmployeeProfessionalDetails = ({ details }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [employee, setEmployee] = useState(details);

  const handleOpenUpdateEmployee = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdateEmployee = () => {
    setOpenUpdate(false);
    fetchEmployee(); // Refresh the employee data after closing the dialog
  };

  const fetchEmployee = async () => {
    if (!details.id) {
      console.error("Invalid employee ID");
      return;
    }

    try {
      const token = localStorage.getItem("jwt");
      const id = details.id;
      const response = await axios.get(
        `http://localhost:9000/api/admin/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployee(response.data);
      console.log("Employee data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  useEffect(() => {
    if (details.id) {
      fetchEmployee();
    }
  }, [details.id]);

  // if (!employee) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <Card sx={{ mt: 1 }} className="border rounded-md border-indigo-200">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ fontWeight: "bold" }}>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Employee Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Company Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Company Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Office Phone No.
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Manager Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Date Of Joining
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Salary
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Experience
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Company Location
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {employeeId ||
                employee.map((item) => ( */}
              <TableRow
                // key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.empId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employee.companyName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employee.companyEmail}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employee.officePhone}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employee.managerName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employee.dateOfJoining}
                </TableCell>
                <TableCell align="left">{employee.category}</TableCell>
                <TableCell align="left">{employee.salary}</TableCell>
                <TableCell align="left">
                  {employee.experience} Year
                  {employee.experience > 1 ? "s" : ""}
                </TableCell>
                <TableCell align="left">{employee.companyLocation}</TableCell>
                <TableCell align="left">
                  <Button
                    onClick={handleOpenUpdateEmployee}
                    sx={{ color: "#646cff" }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdateEmployee}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Update Employee Professional Details
            <IconButton
              onClick={handleCloseUpdateEmployee}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {details.id && (
            <EmployeeProfessionalUpdateForm
              employeeId={details.id}
              onClose={handleCloseUpdateEmployee}
              setEmployee={setEmployee}
              // onUpdate={() => {
              //   fetchEmployee();
              //   setOpenUpdate(false);
              // }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeProfessionalDetails;
