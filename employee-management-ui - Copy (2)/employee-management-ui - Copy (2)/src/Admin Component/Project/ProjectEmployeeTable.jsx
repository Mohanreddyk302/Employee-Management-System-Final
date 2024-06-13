/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import {
//   Button,
//   Card,
//   CardHeader,
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
//   TextField,
// } from "@mui/material";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// const ProjectEmployeeTable = ({ projects, projectId, setProjects }) => {
//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     email: "",
//     startDate: "",
//     endDate: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleAddClose = () => {
//     setOpen(false);
//   };

//   const handleAddEmployee = () => {
//     setOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("jwt");
//       const response = await axios.post(
//         `http://localhost:9000/api/admin/projects/${projectId}/add/${formData.email}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: {
//             startDate: formData.startDate,
//             endDate: formData.endDate,
//           },
//         }
//       );
//       // Fetch the updated project data
//       const updatedProject = await axios.get(
//         `http://localhost:9000/api/admin/projects/${projectId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProjects((prevProjects) =>
//         prevProjects.map((project) =>
//           project.id === projectId ? updatedProject.data : project
//         )
//       );
//       handleAddClose();
//       console.log("Employee added successfully!", response.data);
//     } catch (error) {
//       console.error("Error adding employee:", error);
//       setError(error.response.data.message || "Error adding employee");
//     }
//   };

//   const handleDeleteEmployee = async (employeeId) => {
//     try {
//       const token = localStorage.getItem("jwt");
//       await axios.post(
//         `http://localhost:9000/api/admin/projects/${projectId}/remove/${employeeId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       // Fetch the updated project data
//       const updatedProject = await axios.get(
//         `http://localhost:9000/api/admin/projects/${projectId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProjects((prevProjects) =>
//         prevProjects.map((project) =>
//           project.id === projectId ? updatedProject.data : project
//         )
//       );
//       console.log("Employee removed successfully!");
//     } catch (error) {
//       console.error("Error removing employee:", error);
//     }
//   };

//   return (
//     <div>
//       <Card sx={{ mt: 1 }} className="border rounded-md border-indigo-200">
//         <CardHeader
//           action={
//             <IconButton
//               onClick={handleAddEmployee}
//               aria-label="settings"
//               sx={{ color: "#535bf2", fontSize: "5rem" }}
//             >
//               <PersonAddIcon />
//             </IconButton>
//           }
//           title={"Employees"}
//           sx={{ pt: 2 }}
//         />
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
//                   Employee Id
//                 </TableCell>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Name
//                 </TableCell>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Email
//                 </TableCell>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Experience
//                 </TableCell>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Start Date
//                 </TableCell>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   End Date
//                 </TableCell>
//                 <TableCell
//                   align="left"
//                   sx={{
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {projects.employees.map((item) => (
//                 <TableRow
//                   key={item.empId}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {item.empId}
//                   </TableCell>
//                   <TableCell align="left">{item.name}</TableCell>
//                   <TableCell align="left">{item.email}</TableCell>
//                   <TableCell align="left">{item.experience} Years</TableCell>
//                   <TableCell align="left">{item.startDate}</TableCell>
//                   <TableCell align="left">{item.endDate}</TableCell>
//                   <TableCell align="left">
//                     <Button
//                       onClick={() => handleDeleteEmployee(item.id)}
//                       color="error"
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
//       <Dialog onClose={handleAddClose} open={open}>
//         <DialogTitle>
//           <div className="font-semibold text-2xl text-indigo-600">
//             Add an Employee
//             <IconButton
//               onClick={handleAddClose}
//               style={{ float: "right", color: "#646cff" }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </div>
//         </DialogTitle>
//         <DialogContent>
//           <div className="p-5">
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {error && (
//                 <div style={{ color: "red", marginBottom: "10px" }}>
//                   {error}
//                 </div>
//               )}
//               <TextField
//                 fullWidth
//                 id="email"
//                 name="email"
//                 label="Employee Email"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 value={formData.email}
//               ></TextField>
//               <TextField
//                 fullWidth
//                 id="startDate"
//                 name="startDate"
//                 label="Start Date"
//                 type="date"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 value={formData.startDate}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 id="endDate"
//                 name="endDate"
//                 label="End Date"
//                 type="date"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 value={formData.endDate}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 type="submit"
//                 sx={{ bgcolor: "#646cff" }}
//               >
//                 Add Employee
//               </Button>
//             </form>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ProjectEmployeeTable;

import { useState, useEffect } from "react";
import {
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
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ProjectEmployeeTable = ({ projects, projectId, setProjects }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddClose = () => {
    setOpen(false);
    setError("");
  };

  const handleAddEmployee = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        `http://localhost:9000/api/admin/projects/${projectId}/add/${formData.email}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            startDate: formData.startDate,
            endDate: formData.endDate,
          },
        }
      );
      const updatedProject = await axios.get(
        `http://localhost:9000/api/admin/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? updatedProject.data : project
        )
      );
      handleAddClose();
      console.log("Employee added successfully!", response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
      setError(error.response?.data?.message || "Error adding employee");
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.post(
        `http://localhost:9000/api/admin/projects/${projectId}/remove/${employeeId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedProject = await axios.get(
        `http://localhost:9000/api/admin/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? updatedProject.data : project
        )
      );
      console.log("Employee removed successfully!");
    } catch (error) {
      console.error("Error removing employee:", error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Card sx={{ mt: 1 }} className="border rounded-md border-indigo-200">
        <CardHeader
          action={
            <div>
              <IconButton
                onClick={handleAddEmployee}
                aria-label="settings"
                sx={{ color: "#535bf2", fontSize: "5rem" }}
              >
                <PersonAddIcon />
              </IconButton>
            </div>
          }
          title={"Employees"}
          sx={{ pt: 2 }}
        />
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
                  Name
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
                  Date Of Joining
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
                  Start Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  End Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Status
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
              {!isLoading &&
                projects.employees.map((item) => {
                  const relevantDates = item.dates.filter(
                    (date) => date.projectId === projectId
                  );

                  return (
                    <TableRow
                      key={item.empId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        opacity: relevantDates.some((date) => date.status)
                          ? 1
                          : 0.5,
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.empId}
                      </TableCell>
                      <TableCell align="left">{item.name}</TableCell>
                      <TableCell align="left">{item.companyEmail}</TableCell>
                      <TableCell align="left">{item.dateOfJoining}</TableCell>
                      <TableCell align="left">
                        {item.experience} Years
                      </TableCell>
                      <TableCell align="left">
                        {relevantDates.map((date) => (
                          <div key={date.id}>{date.empStartDate}</div>
                        ))}
                      </TableCell>
                      <TableCell align="left">
                        {relevantDates.map((date) => (
                          <div key={date.id}>{date.empEndDate}</div>
                        ))}
                      </TableCell>
                      <TableCell align="left">
                        {relevantDates.some((date) => date.status) ? (
                          <p className="font-semibold text-green-600">Active</p>
                        ) : (
                          <p className="font-semibold text-red-600">Inactive</p>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => handleDeleteEmployee(item.id)}
                          color="error"
                          disabled={!relevantDates.some((date) => date.status)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog onClose={handleAddClose} open={open}>
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Add an Employee
            <IconButton
              onClick={handleAddClose}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="p-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {error}
                </div>
              )}
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Employee Email"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.email}
              ></TextField>
              <TextField
                fullWidth
                id="startDate"
                name="startDate"
                label="Employee Start Date"
                type="date"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.startDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                id="endDate"
                name="endDate"
                label="Employee End Date"
                type="date"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.endDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ bgcolor: "#646cff" }}
              >
                Add Employee
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectEmployeeTable;
