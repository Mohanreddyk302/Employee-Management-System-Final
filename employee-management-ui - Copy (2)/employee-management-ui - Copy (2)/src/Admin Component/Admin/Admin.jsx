import { Route, Routes } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "../Dashboard/AdminDashboard";
import Employee from "../Employee/Employee";
import Project from "../Project/Project";
import Finance from "../Finance/Finance";

const Admin = () => {
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSidebar />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/finance" element={<Finance />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
