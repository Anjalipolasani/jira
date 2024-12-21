package com.Project;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents counts of SCM tickets based on their status.
 * This class is used for gathering analytics and statistics on ticket statuses.
 */
@Getter
@Setter
@NoArgsConstructor  
@EqualsAndHashCode 
public class SCMTicketCounts {

    /**
     * Number of SCM tickets with status "Open".
     */
    private Long openTicketsCount;

    /**
     * Number of SCM tickets with status "Closed".
     */
    private Long closedTicketsCount;

    /**
     * Number of SCM tickets with status "In Progress".
     */
    private Long inProgressTicketsCount;
}
