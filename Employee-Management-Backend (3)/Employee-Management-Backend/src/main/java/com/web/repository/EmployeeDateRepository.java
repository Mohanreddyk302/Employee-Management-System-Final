package com.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.model.EmployeeDate;

public interface EmployeeDateRepository extends JpaRepository<EmployeeDate, Long>{

	@Query("SELECT ed FROM EmployeeDate ed WHERE ed.projectId = :projectId AND ed.employee.id = :employeeId")
    List<EmployeeDate> findEmployeeDatesByProjectIdAndEmployeeId(@Param("projectId") Long projectId, @Param("employeeId") Long employeeId);
}
