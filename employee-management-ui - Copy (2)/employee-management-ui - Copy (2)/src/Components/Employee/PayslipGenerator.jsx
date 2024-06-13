/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// import { Button } from "@mui/material";

// const PaySlip = ({ employeeId, close }) => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDownload = async () => {
//     const month = selectedDate
//       .toLocaleString("default", { month: "long" })
//       .toUpperCase();
//     try {
//       const response = await axios.get(`/api/employee/download/${employeeId}`, {
//         params: { month },
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `payslip_${month}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       close();
//     } catch (error) {
//       console.error("Error downloading the payslip", error);
//     }
//   };

//   return (
//     <div className="flex flex-col px-10">
//       <DatePicker
//         className="bg-white text-black border w-[100%] text-xl mb-5 mt-5 rounded-md px-5 p-2 border-black"
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         dateFormat="MM/yyyy"
//         showMonthYearPicker
//         showFullMonthYearPicker
//         placeholderText="Select Month"
//       />
//       <Button
//         // className="float-right"
//         sx={{ backgroundColor: "#646cff", width: "30%", float: "right" }}
//         style={{ float: "right" }}
//         variant="contained"
//         onClick={handleDownload}
//       >
//         Download
//       </Button>
//     </div>
//   );
// };

// export default PaySlip;

// src/PayslipGenerator.js
// import { useState } from "react";
// import { jsPDF } from "jspdf";
// import "tailwindcss/tailwind.css";
// import { Button, MenuItem, TextField } from "@mui/material";

// const months = [
//   { value: "January", label: "January" },
//   { value: "February", label: "February" },
//   { value: "March", label: "March" },
//   { value: "April", label: "April" },
//   { value: "May", label: "May" },
//   { value: "June", label: "June" },
//   { value: "July", label: "July" },
//   { value: "August", label: "August" },
//   { value: "September", label: "September" },
//   { value: "October", label: "October" },
//   { value: "November", label: "November" },
//   { value: "December", label: "December" },
// ];

// function PayslipGenerator() {
//   const [salary, setSalary] = useState("");
//   const [month, setMonth] = useState("");

//   const handleDownload = () => {
//     const doc = new jsPDF();
//     doc.text(`Payslip for ${month}`, 10, 10);
//     doc.text(`Salary: ${salary}`, 10, 20);
//     doc.save(`Payslip_${month}.pdf`);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-6 bg-white rounded shadow-md">
//         <h2 className="mb-4 text-xl font-semibold text-center">
//           Generate Payslip
//         </h2>
//         <form className="space-y-4">
//           <TextField
//             label="Salary"
//             variant="outlined"
//             fullWidth
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//             type="number"
//             className="mt-4"
//           />
//           <TextField
//             label="Month"
//             variant="outlined"
//             fullWidth
//             select
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//             className="mt-4"
//           >
//             {months.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleDownload}
//             className="mt-4"
//           >
//             Download Payslip
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PayslipGenerator;

// src/PayslipGenerator.js
import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import jsPDF from "jspdf";
import "tailwindcss/tailwind.css";

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const years = Array.from(new Array(11), (val, index) =>
  (2014 + index).toString()
);

function PayslipGenerator({ close }) {
  const [salary, setSalary] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDownload = () => {
    if (!salary || !month || !year) {
      alert("Please fill in all fields");
      return;
    }

    const doc = new jsPDF();
    doc.text(`Payslip for ${month} ${year}`, 10, 10);
    doc.text(`Salary: ${salary}`, 10, 20);
    doc.save(`Payslip_${month}_${year}.pdf`);
    close();
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 mb-8">
      <div className="p-6 bg-white rounded shadow-lg shadow-indigo-400">
        <form className="space-y-4">
          <TextField
            label="Salary"
            variant="outlined"
            fullWidth
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            className="mt-4"
          />
          <TextField
            label="Month"
            variant="outlined"
            fullWidth
            select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="mt-4"
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-4"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            fullWidth
            onClick={handleDownload}
            className="mt-4"
            sx={{ backgroundColor: "#535bf2", fontSize: "1.1rem" }}
          >
            Download Payslip
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PayslipGenerator;
