package com.web.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.CATEGORY;
import com.web.model.Employee;
import com.web.model.EmployeeDate;
import com.web.model.PROJECT_STATUS;
import com.web.model.Project;
import com.web.model.USER_ROLE;
import com.web.model.User;
import com.web.repository.EmployeeDateRepository;
import com.web.repository.EmployeeRepository;
import com.web.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private UserService userService;

	@Autowired(required = true)
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private EmployeeDateRepository employeeDateRepository;

//	@Autowired
//	private EmployeeService employeeService;

	@Override
	public Project createProject(Project project, Long userId) throws Exception {
		User user = userService.findUserById(userId);

		Project createProject = new Project();
		createProject.setName(project.getName());
		createProject.setDescription(project.getDescription());
		createProject.setCoordinator(project.getCoordinator());
		createProject.setTechnologies(project.getTechnologies());
		createProject.setStartDate(LocalDate.now());
		createProject.setEndDate(LocalDate.now().plusMonths(4));
		createProject.setCreatedAt(LocalDate.now());
		createProject.setUser(user);
		createProject.setStatus("PENDING");

		createProject.setCategory(project.getCategory());
//		
//		if(createProject.getCategory() == CATEGORY.FULLSTACK) {
//			createProject.setRole(USER_ROLE.ROLE_MANAGER);
//		}
//		if(createProject.getCategory() == CATEGORY.FRONTEND) {
//			createProject.setRole(USER_ROLE.ROLE_MANAGER);
//		}

		Project savedProject = projectRepository.save(createProject);
		return savedProject;
	}

	@Override
	public List<Project> findProjectsByUserId(Long companyId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Project> findAllProjects() {
		List<Project> projects = projectRepository.findAll();
		return projects;
	}

	@Override
	public Project findProjectById(Long id) throws Exception {
		Optional<Project> project = projectRepository.findById(id);
		if (project.isEmpty()) {
			throw new Exception("Project is not found with id " + id);
		}
		return project.get();
	}

	@Override
	public String deleteProject(Long projectId, Long userId) throws Exception {
		User user = userService.findUserById(userId);
		Project project = findProjectById(projectId);
		if (!project.getUser().getId().equals(user.getId())) {
			throw new Exception("You can't delete another user projects........!");
		}
		projectRepository.delete(project);
		return "Project deleted successfully............!";
	}

	@Override
	public Project updateProject(Project project, Long id) throws Exception {
		Optional<Project> optProject = projectRepository.findById(id);
		if (optProject.isEmpty()) {
			throw new Exception("Project not found with id " + id);
		}
		Project updateProject = optProject.get();
		updateProject.setName(project.getName());
		updateProject.setDescription(project.getDescription());
		updateProject.setTechnologies(project.getTechnologies());
		updateProject.setCategory(project.getCategory());
		Project updatedProject = projectRepository.save(updateProject);
		return updatedProject;
	}

	@Override
	public Set<Employee> getAllEMployees(Long projectId) {

		return null;
	}

	@Override
	public Project saveProject(Project project) {
		return projectRepository.save(project);
	}

//	@Override
//	public void addEmployeeToProject(Long projectId, String employeeEmail, LocalDate startDate, LocalDate endDate)
//			throws Exception {
//		Project project = findProjectById(projectId);
//		Employee employee = employeeRepository.findByEmail(employeeEmail);
//		if (employee == null) {
//			throw new Exception("Employee not found with email: " + employeeEmail);
//		}
//		if (project.getStatus().equals("COMPLETED")) {
//			throw new Exception("Cannot add employee to a completed project.");
//		}
//		if (!project.getEmployees().contains(employee)) {
////			employee.setStartDate(startDate);
////			employee.setEndDate(endDate);
//////			if (employee.getEndDate().isBefore(LocalDate.now()) && employee.isStatus()) {
////			if (employee.getEndDate().isBefore(LocalDate.now())) {
////				employee.setStatus(false);
////			} else {
////				employee.setStatus(true);
////			}
////			employeeRepository.save(employee);
//			EmployeeDate employeeDate = new EmployeeDate();
//			employeeDate.setEmpStartDate(startDate);
//			employeeDate.setEmpEndDate(endDate);
//			if(employeeDate.getEmpEndDate().isBefore(LocalDate.now())) {
//				employeeDate.setStatus(false);
//			}else {
//				employeeDate.setStatus(true);
//			}
//			employeeDateRepository.save(employeeDate);
//			project.getEmployees().add(employee);
//			projectRepository.save(project);
//		}
//	}

	@Override
	public Project updateProjectStatus(Long projectId, String projectStatus) throws Exception {
		Project project = findProjectById(projectId);

		if (projectStatus.equals("PENDING") || projectStatus.equals("IN_PROGRESS")
				|| projectStatus.equals("COMPLETED")) {
			project.setStatus(projectStatus);
			return projectRepository.save(project);
		}
		throw new Exception("please select a valid order status");
	}
	
	@Override
	public void addEmployeeToProject(Long projectId, String employeeEmail, LocalDate startDate, LocalDate endDate) throws Exception {
	    Project project = findProjectById(projectId);
	    Employee employee = employeeRepository.findByEmail(employeeEmail);
	    if (employee == null) {
	        throw new Exception("Employee not found with email: " + employeeEmail);
	    }
	    if (project.getStatus().equals("COMPLETED")) {
	        throw new Exception("Cannot add employee to a completed project.");
	    }
	    boolean alreadyInProject = project.getEmployees().stream().anyMatch(e -> e.getId().equals(employee.getId()));
	    if (!alreadyInProject) {
	        
	        EmployeeDate employeeDate = new EmployeeDate();
	        employeeDate.setEmpStartDate(startDate);
	        employeeDate.setEmpEndDate(endDate);
	        employeeDate.setStatus(!endDate.isBefore(LocalDate.now()));
	        employeeDate.setEmployee(employee);
	        employeeDate.setProjectId(projectId);
	        employeeDate = employeeDateRepository.save(employeeDate);

	        employee.getDates().add(employeeDate);
	        project.getEmployees().add(employee);
	        employee.getProjects().add(project);

	        projectRepository.save(project);
	        employeeRepository.save(employee);
	    }
	}
	
	@Override
	public void removeUserFromProject(Long projectId, Long employeeId) throws Exception {
		Project project = findProjectById(projectId);
	    Optional<Employee> optEmployee = employeeRepository.findById(employeeId);
	    if (optEmployee.isEmpty()) {
	        throw new Exception("Employee not found with id: " + employeeId);
	    }
	    Employee employee = optEmployee.get();
	    List<EmployeeDate> employeeDates = employeeDateRepository.findEmployeeDatesByProjectIdAndEmployeeId(projectId, employeeId);

	    if (employeeDates.isEmpty()) {
	        throw new Exception("No EmployeeDate entries found for the given project and employee.");
	    }

	    for (EmployeeDate date : employeeDates) {
	        employee.getDates().remove(date);
	        employeeDateRepository.delete(date);
	    }

	    project.getEmployees().remove(employee);

	    employeeRepository.save(employee);
	    projectRepository.save(project);
	}

}
