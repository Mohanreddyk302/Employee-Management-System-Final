/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const EmployeeProfessionalUpdateForm = ({
  employeeId,
  onClose,
  setEmployee,
}) => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    companyName: "",
    companyEmail: "",
    officePhone: "",
    managerName: "",
    companyLocation: "",
    salary: "",
    category: "",
    experience: "",
  });

  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`/api/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwt");
      console.log("Submitting payload:", employeeData); // Debugging line
      await axios.put(
        `http://localhost:9000/api/admin/employees/${employeeId}/professional`,
        employeeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const response = await axios.get(`/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(response.data);
      // onUpdate();
      onClose();
      console.log(
        "Employee Professional Details updated successfully.......!",
        employeeData
      );
      // localStorage.setItem("employeeData", JSON.stringify(employeeData));
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  if (loading) {
    return <CircularProgress />; // Show loading indicator while fetching data
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Company Name"
        name="companyName"
        // value={employeeData.companyName}
        defaultValue={employeeData.companyName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Compnay Email"
        name="companyEmail"
        value={employeeData.companyEmail} // Correct the value binding
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Office Phone"
        name="officePhone"
        value={employeeData.officePhone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Manager Name"
        name="managerName"
        value={employeeData.managerName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Salary"
        name="salary"
        value={employeeData.salary}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth>
        <InputLabel id="experience-label">Experience</InputLabel>
        <Select
          labelId="experience-label"
          id="experience"
          name="experience"
          value={employeeData.experience}
          onChange={handleChange}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((year) => (
            <MenuItem key={year} value={year}>
              {year} year{year > 1 ? "s" : ""}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Company Location"
        name="companyLocation"
        value={employeeData.companyLocation}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        name="category"
        value={employeeData.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button onClick={onClose} sx={{ mr: 2, color: "#646cff" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ bgcolor: "#646cff" }}>
          Update Professional Details
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeProfessionalUpdateForm;
