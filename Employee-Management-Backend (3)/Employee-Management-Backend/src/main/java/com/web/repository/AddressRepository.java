package com.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.ProfessionalDetails;

public interface AddressRepository extends JpaRepository<ProfessionalDetails, Long>{

}
