/* eslint-disable react/prop-types */
import {
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/Error";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloseIcon from "@mui/icons-material/Close";
import PayslipGenerator from "./PayslipGenerator";

const getChipColor = (status) => {
  switch (status) {
    case "PENDING":
      return "gray";
    case "IN_PROGRESS":
      return "orange";
    case "COMPLETED":
      return "green";
    default:
      return "red";
  }
};

// const technologies = ["React Js", "Spring Boot", "MySql"];

const EmployeeDashboard = ({ authState, setAuthState }) => {
  const [employeeData, setEmployeeData] = useState(null);
  // const [projects, setProjects] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [previousProjects, setPreviousProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        if (authState && authState.employee && authState.employee.id) {
          const id = authState.employee.id;

          const response = await axios.get(
            `http://localhost:9000/api/employee/${id}`,
            {
              headers: {
                Authorization: `Bearer ${authState.jwt}`,
              },
            }
          );
          setEmployeeData(response.data);

          const projectsResponse = await axios.get(
            `http://localhost:9000/api/employee/${id}/current-projects`,
            {
              headers: {
                Authorization: `Bearer ${authState.jwt}`,
              },
            }
          );

          setCurrentProjects(projectsResponse.data);
          console.log(projectsResponse.data);
          const projectsResponse1 = await axios.get(
            `http://localhost:9000/api/employee/${id}/previous-projects`,
            {
              headers: {
                Authorization: `Bearer ${authState.jwt}`,
              },
            }
          );
          setPreviousProjects(projectsResponse1.data);
        } else {
          setLoading(false); // Set loading to false if employee data is not available
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [authState]);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employeeData) {
    return <div>No employee data available</div>;
  }

  return (
    <div className="px-5 lg:px-20 rounded-lg">
      <Card
        style={{
          backgroundColor: "#0d0e12",
          color: "white",
        }}
        className="border w-full  px-10 pb-0 my-10 "
      >
        <div className="lg:flex gap-28">
          <div className="pb-5">
            <h1
              className="text-2xl font-bold pb-5 pt-5"
              style={{ color: "#535bf2" }}
            >
              Employee Personal Details
            </h1>
            <div className="space-y-5 text-sm">
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">Employee Name: </p>
                <p>{employeeData.name}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">Employee Email: </p>
                <p>{employeeData.email}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">Mobile No: </p>
                <p>{employeeData.mobileNo}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">Gender: </p>
                <p>{employeeData.gender}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">Date of Birth: </p>
                <p>{employeeData.dateOfBirth}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">Age: </p>
                <p>{employeeData.age}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">Address: </p>
                <p>{employeeData.address}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">City: </p>
                <p>{employeeData.city}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">State: </p>
                <p>{employeeData.state}</p>
              </div>
              <div className="flex text-base gap-6">
                <p className="w-36 font-semibold">Pin Code: </p>
                <p>{employeeData.pinCode}</p>
              </div>
            </div>
          </div>
          <div className="pb-5">
            <h1
              className="text-2xl font-bold pb-5 pt-5"
              style={{ color: "#535bf2" }}
            >
              Employee Professional Details
            </h1>
            <div className="space-y-5 text-sm">
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Employee Id: </p>
                <p>{employeeData.empId}</p>
              </div>
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Company Name: </p>
                <p>{employeeData.companyName}</p>
              </div>
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Company Email: </p>
                <p>{employeeData.companyEmail}</p>
              </div>
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Manager Name: </p>
                <p>{employeeData.managerName}</p>
              </div>
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Date Of Joining: </p>
                <p>{employeeData.dateOfJoining}</p>
              </div>
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Salary: </p>
                <p>{employeeData.salary}.00</p>
              </div>
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Company Location: </p>
                <p>{employeeData.companyLocation}</p>
              </div>
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Experience: </p>
                <p>
                  {employeeData.experience} Year
                  {employeeData.experience > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex text-base gap-10">
                <p className="w-36 font-semibold">Category: </p>
                <p>{employeeData.category}</p>
              </div>
            </div>
          </div>
          <div className="pb-5">
            <h1
              className="text-2xl font-bold pb-5 pt-5"
              style={{ color: "#535bf2" }}
            >
              Employee Finance Details
            </h1>
            <div className="space-y-5 text-sm">
              <div className="flex text-base ">
                <p className="w-36 font-semibold">Pan No: </p>
                <p>{employeeData.panNo}</p>
              </div>
              <div className="flex text-base ">
                <p className="w-36 font-semibold">Adhaar No: </p>
                <p>{employeeData.adhaar}</p>
              </div>
              <div className="flex text-base ">
                <p className="w-36 font-semibold">Bank Name: </p>
                <p>{employeeData.bankName}</p>
              </div>
              <div className="flex text-base ">
                <p className="w-36 font-semibold">Branch Name: </p>
                <p>{employeeData.branchName}</p>
              </div>
              <div className="flex text-base ">
                <p className="w-36 font-semibold">Account No: </p>
                <p>{employeeData.accountNumber}</p>
              </div>
              <div className="flex text-base ">
                <p className="w-36 font-semibold">IFSC Code: </p>
                <p>{employeeData.ifscCode}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:float-right mt-10 mb-5">
          <IconButton onClick={handleOpen} sx={{ color: "#535bf2" }}>
            <CloudDownloadIcon />
            <span className="ml-2 text-xl">PaySlips</span>
          </IconButton>
        </div>
      </Card>
      <div className="lg:flex w-[100%]">
        <div className="lg:w-[100%]">
          <div className="mt-5 mb-3">
            <h1 className="font-semibold text-2xl" style={{ color: "#535bf2" }}>
              Employee Current Working Projects
            </h1>
          </div>
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <Card
                key={project.id}
                className="p-5 w-full lg:w-[90%] border rounded-md mb-5 shadow-xl shadow-white"
                sx={{ bgcolor: "#0d0e12", color: "white" }}
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-5">
                        <h1 className="cursor-pointer font-bold text-lg text-white">
                          {project.name}
                        </h1>
                        <CircleIcon sx={{ fontSize: ".5rem" }} />
                        <p className="text-sm text-gray-400 font-semibold">
                          {project.category}
                        </p>
                        <CircleIcon sx={{ fontSize: ".5rem" }} />
                        <Chip
                          label={project.status}
                          sx={{
                            bgcolor: getChipColor(project.status),
                            color: "white",
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                    <div className="flex gap-5">
                      <span>Coordinator:</span>
                      <span>{project.coordinator}</span>
                    </div>
                    <div className="flex gap-20">
                      <div className="flex gap-3">
                        <span>Start Date:</span>
                        <span>{project.startDate}</span>
                      </div>
                      <div className="flex gap-3">
                        <span>End Date:</span>
                        <span>{project.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {project.technologies.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{ bgcolor: "#535bf2", color: "white" }}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="flex items-center -ml-2 mb-20">
              <IconButton>
                <ErrorIcon sx={{ color: "white" }} />
              </IconButton>
              <div>Oops! Currently you are not working in any projects</div>
            </div>
          )}
        </div>
        <div className="lg:w-[100%]">
          <div className="mt-5 mb-3">
            <h1 className="font-semibold text-2xl" style={{ color: "#535bf2" }}>
              Employee Previous Projects
            </h1>
          </div>
          {previousProjects.length > 0 ? (
            previousProjects.map((project) => (
              <Card
                key={project.id}
                className="p-5 w-full lg:w-[90%] border rounded-md mb-5 shadow-xl shadow-white"
                sx={{ bgcolor: "#0d0e12", color: "white" }}
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-5">
                        <h1 className="cursor-pointer font-bold text-lg text-white">
                          {project.name}
                        </h1>
                        <CircleIcon sx={{ fontSize: ".5rem" }} />
                        <p className="text-sm text-gray-400 font-semibold">
                          {project.category}
                        </p>
                        <CircleIcon sx={{ fontSize: ".5rem" }} />
                        <Chip
                          label={project.status}
                          sx={{
                            bgcolor: getChipColor(project.status),
                            color: "white",
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                    <div className="flex gap-5">
                      <span>Coordinator:</span>
                      <span>{project.coordinator}</span>
                    </div>
                    <div className="flex gap-20">
                      <div className="flex gap-3">
                        <span>Start Date:</span>
                        <span>{project.startDate}</span>
                      </div>
                      <div className="flex gap-3">
                        <span>End Date:</span>
                        <span>{project.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {project.technologies.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{ bgcolor: "#535bf2", color: "white" }}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="flex items-center -ml-2 mb-20">
              <IconButton>
                <ErrorIcon sx={{ color: "white" }} />
              </IconButton>
              <div>Oops! You do not have any previous projects</div>
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        // maxWidth="md"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Download PaySlips
            <IconButton
              onClick={handleClose}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <PayslipGenerator close={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeDashboard;
