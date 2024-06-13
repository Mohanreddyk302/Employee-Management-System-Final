// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import { Button, TextField, Box } from "@mui/material";
// import axios from "axios";

// const FinanceUpdateForm = ({ employeeId, onClose, onUpdate }) => {
//   const [employeeData, setEmployeeData] = useState({
//     id: "",
//     panNo: "",
//     adhaar: "",
//     bankName: "",
//     accountNumber: "",
//     ifscCode: "",
//   });

//   useEffect(() => {
//     const fetchEmployeeDetails = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//         const response = await axios.get(`/api/employees/${employeeId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEmployeeData(response.data);
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

//   const validateForm = () => {
//     const { panNo, adhaar, bankName, accountNumber, ifscCode } = employeeData;
//     if (!panNo || !adhaar || !bankName || !accountNumber || !ifscCode) {
//       alert("All fields are required!");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const token = localStorage.getItem("jwt");
//       console.log("Submitting payload:", employeeData); // Debugging line
//       await axios.put(
//         `http://localhost:9000/api/admin/employees/finance/${employeeId}`,
//         employeeData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       onUpdate();
//       onClose();
//       console.log("Employee updated successfully.......!", employeeData);
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//       <TextField
//         label="Pan No."
//         name="panNo"
//         value={employeeData.panNo}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Adhaar"
//         name="adhaar"
//         value={employeeData.adhaar} // Correct the value binding
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Bank Name"
//         name="bankName"
//         value={employeeData.bankName}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Account Number"
//         name="accountNumber"
//         value={employeeData.accountNumber}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="IFSC Code"
//         name="ifscCode"
//         value={employeeData.ifscCode}
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

// export default FinanceUpdateForm;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";

const FinanceUpdateForm = ({ employeeId, onClose, setEmployees }) => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    panNo: "",
    adhaar: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
  });

  // const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`/api/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeData(response.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        // setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwt");
      console.log("Submitting payload:", employeeData);
      await axios.put(
        `http://localhost:9000/api/admin/employees/${employeeId}/finance`,
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
      console.log("Employee updated successfully.......!", employeeData);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // if (loading) {
  //   return <CircularProgress />; // Show loading indicator while fetching data
  // }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <div className="errorForm"></div>
      <TextField
        label="Pan No."
        name="panNo"
        value={employeeData.panNo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Adhaar"
        name="adhaar"
        value={employeeData.adhaar}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Bank Name"
        name="bankName"
        value={employeeData.bankName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Account Number"
        name="accountNumber"
        value={employeeData.accountNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="IFSC Code"
        name="ifscCode"
        value={employeeData.ifscCode}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Branch Name"
        name="branchName"
        value={employeeData.branchName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button onClick={onClose} sx={{ mr: 2, color: "#646cff" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ bgcolor: "#646cff" }}>
          Update Finance Details
        </Button>
      </Box>
    </Box>
  );
};

export default FinanceUpdateForm;
