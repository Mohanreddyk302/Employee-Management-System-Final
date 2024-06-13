package com.web.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDate {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private LocalDate empStartDate;
	
	private LocalDate empEndDate;
	
	private boolean status;
	
	private Long projectId;
	
//	@JsonIgnore
//	@ManyToOne
//	@JoinColumn(name = "employee_date")
//	private Project project;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "employee_working")
	private Employee employee;
}
