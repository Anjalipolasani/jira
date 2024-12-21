package com.Project;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;      
import lombok.NoArgsConstructor;
import lombok.Setter;  

/**
 * Represents a Software Configuration Management (SCM) entity.
 */

@Entity
@EqualsAndHashCode 
@NoArgsConstructor  
@Table(name = "scm")  
@Getter
@Setter
public class SCM {  

    /**
     * The unique identifier of the SCM item.
     */
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long ticketId;

    /**
     * The name of the employee to whom the SCM item is assigned.
     */
    private String assignedTo;

    /**
     * The current status of the SCM item.
     */
    private String status;  

    /**
     * The severity level associated with the SCM item.
     */
    private String severity;

    /**
     * The priority level of addressing or resolving the SCM item.
     */
    private String priority;

    /**
     * Link to the Pull Request associated with this SCM item.
     */
    private String prLink;

    /**
     * Estimated date on which the SCM item is expected to be resolved or addressed.
     */
    private String estFixDate;

    /**
     * Build number indicating when the SCM item was introduced or identified.
     */
    private String buildNo;

    /**
     * Build number indicating in which the SCM item was resolved or addressed.
     */
    private String fixedBuildNo;

//	public Object getticketId() {
//		return null;
//	}

}


