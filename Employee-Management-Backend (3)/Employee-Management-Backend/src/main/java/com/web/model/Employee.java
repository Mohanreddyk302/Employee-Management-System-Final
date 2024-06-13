package com.web.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String email;

	private String password;
	
	private String mobileNo;
	
	private String gender;
	
	private LocalDate dateOfBirth;
	
	private int age;

	private String adhaar;

	private String panNo;
	
	private String bankName;
	
	private String accountNumber;
	
	private String ifscCode;
	
	private String branchName;
	
	private String address;	
	
	private String city;
	
	private String state;
	
	private String pinCode;
	
	private String empId;

	private String companyName;
	
	private String companyEmail;
	
	private String managerName;
	
	private String dateOfJoining;
	
	private String officePhone;

	private double salary;
	
	private String companyLocation;
	
	private String experience;

	private String category;
	
	private USER_ROLE role;
	
	private boolean status;
	
	private LocalDate startDate;

    private LocalDate endDate;
	
	private String jwt;
	
	private String message;
	
	@OneToMany
    private List<EmployeeDate> dates = new ArrayList<>();

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@JsonIgnore
	@ManyToMany(mappedBy = "employees", fetch = FetchType.LAZY)
	private List<Project> projects = new ArrayList<>();
}