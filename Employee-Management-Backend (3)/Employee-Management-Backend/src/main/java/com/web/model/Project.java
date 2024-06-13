package com.web.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
//    private Set<Long> empId = new HashSet<Long>();

    private String name;

    private String description;
    
    private String coordinator;
    
    private CATEGORY category;

    private List<String> technologies;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDate createdAt;
    
    @Column(name = "projectStatus")
    private String status;
    
//    private USER_ROLE role;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

//    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Employee> employees = new ArrayList<>();
    
//    @JsonIgnore
//    @OneToMany(cascade = CascadeType.ALL)
//    private List<EmployeeDate> dates = new ArrayList<>();
}