/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import { Button, TextField, Box } from "@mui/material";
// import axios from "axios";

// const EmployeeUpdateForm = ({ employeeId, onClose, setEmployees }) => {
//   const [employeeData, setEmployeeData] = useState({
//     id: employeeId,
//     name: "",
//     email: "",
//     password: "",
//     mobileNo: "",
//   });

//   useEffect(() => {
//     const fetchEmployeeDetails = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//         const response = await axios.get(`/api/employees/${employeeId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEmployeeData({
//           ...employeeData,
//           name: response.data.name,
//           email: response.data.email,
//           password: response.data.password,
//           mobileNo: response.data.mobileNo,
//         });
//       } catch (error) {
//         console.error("Error fetching employee details:", error);
//       }
//     };

//     if (employeeId) {
//       fetchEmployeeDetails();
//     }
//   }, [employeeId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("jwt");
//       await axios.put(
//         `http://localhost:9000/api/admin/employees/${employeeId}`,
//         employeeData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const response = await axios.get(
//         `http://localhost:9000/api/admin/employees/all`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEmployees({
//         ...employeeData,
//         name: response.data.name,
//         email: response.data.email,
//         password: response.data.password,
//         mobileNo: response.data.mobileNo,
//       });
//       // onUpdate();
//       onClose();
//       console.log("Employee updated successfully.......!", employeeData);
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//       <TextField
//         label="Name"
//         name="name"
//         // defaultValue={employeeData.name}
//         value={employeeData.name}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Email"
//         name="email"
//         // defaultValue={employeeData.email}
//         value={employeeData.email}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Password"
//         name="password"
//         type="password"
//         // defaultValue={employeeData.password}
//         value={employeeData.password}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Mobile No."
//         name="mobileNo"
//         // defaultValue={employeeData.mobileNo}
//         value={employeeData.mobileNo}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//         <Button onClick={onClose} sx={{ mr: 2, color: "#646cff" }}>
//           Cancel
//         </Button>
//         <Button type="submit" variant="contained" sx={{ bgcolor: "#646cff" }}>
//           Update Employee
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EmployeeUpdateForm;

import { useState, useEffect } from "react";
import { Button, TextField, Box, CircularProgress } from "@mui/material";
import axios from "axios";

const EmployeeUpdateForm = ({ employeeId, onClose, setEmployees }) => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    email: "",
    // password: "",
    mobileNo: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (!employeeId) return;

      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`/api/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmployeeData({
          id: employeeId,
          name: response.data.name || "",
          email: response.data.email || "",
          // password: response.data.password || "",
          mobileNo: response.data.mobileNo || "",
          address: response.data.address || "",
          city: response.data.city || "",
          state: response.data.state || "",
          pinCode: response.data.pinCode || "",
        });
      } catch (error) {
        console.error("Error fetching employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchEmployeeDetails();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      await axios.put(
        `http://localhost:9000/api/admin/employees/${employeeId}`,
        employeeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const response = await axios.get(
        `http://localhost:9000/api/admin/employees/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployees(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={employeeData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={employeeData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* <TextField
        label="Password"
        name="password"
        type="password"
        value={employeeData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      /> */}
      <TextField
        label="Mobile No."
        name="mobileNo"
        value={employeeData.mobileNo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={employeeData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={employeeData.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="State"
        name="state"
        value={employeeData.state}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pin Code"
        name="pinCode"
        value={employeeData.pinCode}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button onClick={onClose} sx={{ mr: 2, color: "#646cff" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ bgcolor: "#646cff" }}>
          Update Employee
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeUpdateForm;
