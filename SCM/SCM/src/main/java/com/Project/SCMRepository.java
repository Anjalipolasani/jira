package com.Project;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * Repository interface for handling CRUD operations on SCM entities.
 * This repository extends Spring's CrudRepository, which provides generic CRUD operation methods.
 * Additionally, it has custom methods defined to cater specific query requirements
 * related to SCM entities.
 */

public interface SCMRepository extends CrudRepository<SCM, Long> {

    /**
     * Finds SCM entities based on the assigned person's name or part of it.
     *
     * @param assignedTo The name (or part of it) of the person to whom SCM items are assigned.
     * @return List of SCM entities matching the search criteria.
     */
	
	List<SCM> findByAssignedToContaining(String assignedTo);
	
	 /**
     * Returns the count of SCM entities based on their status.
     *
     * @param status The status of SCM entities to be counted.
     * @return The number of SCM entities with the given status.
     */
	
	@Query("SELECT COUNT(s) FROM SCM s WHERE s.status = ?1")
    Long countByStatus(String status);

    // It will automatically inherit methods like save(), findById(), findAll(), deleteById(), etc.

}
