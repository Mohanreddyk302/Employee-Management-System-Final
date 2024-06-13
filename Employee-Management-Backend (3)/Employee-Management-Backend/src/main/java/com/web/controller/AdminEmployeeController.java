package com.web.controller;

import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Employee;
import com.web.model.Project;
import com.web.model.User;
import com.web.service.EmployeeService;
import com.web.service.UserService;

@RestController
@RequestMapping("/api/admin/employees")
public class AdminEmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private UserService userService;

	@PostMapping("/employee")
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Employee createEmployee = employeeService.createEmployee(employee, user.getId());
		return new ResponseEntity<>(createEmployee, HttpStatus.CREATED);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Employee>> findAllEmployees(@RequestHeader("Authorization") String jwt)
			throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		List<Employee> getAllEmployees = employeeService.getAllEmployees();
		return new ResponseEntity<>(getAllEmployees, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		employeeService.deleteEmployee(employeeId, user.getId());
		return new ResponseEntity<String>("Employee deleted successfully........!", HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateEmployee(@RequestBody Employee employee, @PathVariable Long id) {
		try {
			Employee updatedEmployee = employeeService.updateEmployee(employee, id);
			return ResponseEntity.ok(updatedEmployee);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", e.getMessage()));
		}
	}

	@PutMapping("/{id}/finance")
	public ResponseEntity<?> updateFinanceDetails(@RequestBody Employee employee, @PathVariable Long id) {
		try {
			Employee updatedEmployee = employeeService.updateFinanceDetails(employee, id);
			return ResponseEntity.ok(updatedEmployee);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", e.getMessage()));
		}
	}

	@PutMapping("/{id}/professional")
	public ResponseEntity<?> updateProfessionalDetails(@RequestBody Employee employee, @PathVariable Long id) {
		try {
			Employee updatedEmployee = employeeService.updateProfessionalDetails(employee, id);
			return ResponseEntity.ok(updatedEmployee);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", e.getMessage()));
		}
	}

	@GetMapping("/email/{email}")
	public ResponseEntity<Employee> findEmployeeByEmail(@PathVariable String email) throws Exception {
		Employee employee = employeeService.findEmployeeByEmail(email);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Employee> findEmployeeById(@PathVariable Long id) throws Exception {
		Employee employee = employeeService.findEmployeeById(id);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

	@GetMapping("/update-employee-status")
	public ResponseEntity<String> updateEmployeeStatus() {
		employeeService.updateEmployeeStatus();
		return ResponseEntity.ok("Employee status updated successfully!");
	}
}
