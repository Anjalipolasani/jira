package com.Project;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for handling SCM-related operations.
 */
@Service
public class SCMService {
	
    /** Logger for capturing log messages. */
    private final Logger logger = LoggerFactory.getLogger(SCMService.class);

    @Autowired
    private SCMRepository SCMRepository;
    
    @Autowired
    private JavaMailSender mailSender;

    /**
     * Sends an email with the given subject and content.
     *
     * @param subject the subject of the email
     * @param content the content/body of the email
     */
    public void sendEmail(String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("yefafoc703@evusd.com");
        message.setTo("yefafoc703@evusd.com");
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }
    
    /**
     * Searches for SCM entries assigned to the given person.
     *
     * @param assignedTo the person's name
     * @return a list of SCM entries
     */
    public List<SCM> searchByAssignedTo(String assignedTo) {
        return SCMRepository.findByAssignedToContaining(assignedTo);
    }
    
    /**
     * Retrieves analytics related to SCM ticket statuses.
     *
     * @return a representation of ticket counts based on their status
     */
    public SCMTicketCounts getSCMAnalytics() {
        SCMTicketCounts ticketCounts = new SCMTicketCounts();
        ticketCounts.setOpenTicketsCount(SCMRepository.countByStatus("Open"));
        ticketCounts.setClosedTicketsCount(SCMRepository.countByStatus("Closed"));
        ticketCounts.setInProgressTicketsCount(SCMRepository.countByStatus("In Progress"));
        return ticketCounts;
    }

    /**
     * Retrieves all SCM entries.
     *
     * @return a list of SCM entries
     */
    public List<SCM> getSCMs() {
        return (List<SCM>) SCMRepository.findAll();
    }

    /**
     * Retrieves a single SCM entry by its ticket ID.
     *
     * @param ticketId the unique identifier of the SCM entry
     * @return the SCM entry or null if not found
     */
    public SCM getSCMs(Long ticketId) {
        return SCMRepository.findById(ticketId).orElse(null);
    }

    /**
     * Creates new SCM entries.
     *
     * @param scms the list of SCM entries to be created
     * @return a list of created SCM entries
     */
    public List<SCM> createSCM(List<SCM> scms) {
        List<SCM> savedScms = (List<SCM>) SCMRepository.saveAll(scms);
        for (SCM scm : savedScms) {
            logger.info("Notification: New SCM entry created with Ticket ID: {}", scm.getTicketId());
            sendEmail("Notification from SCM", "Notification: New SCM entry created with Ticket ID: " + scm.getTicketId());
        }
        return savedScms;
    }

    /**
     * Updates an existing SCM entry by its ticket ID.
     *
     * @param ticketId the unique identifier of the SCM entry
     * @param scm the SCM entity with updated details
     * @return the updated SCM entry or null if not found
     */
    public SCM updateSCM(Long ticketId, SCM scm) {
        if (SCMRepository.existsById(ticketId)) {
            SCM existingScm = SCMRepository.findById(ticketId).orElse(null);
            
            if (existingScm != null) {
                copyChanges(existingScm, scm);
                SCM updatedScm = SCMRepository.save(existingScm);
                logger.info("Notification: SCM entry updated with Ticket ID: {}", updatedScm.getTicketId());
                sendEmail("Notification from SCM", "Notification: SCM entry updated with Ticket ID: " + updatedScm.getTicketId());
                return updatedScm;
            }
        }
        return null;
    }
    
    /**
     * Helper method to copy SCM properties from a source to a destination.
     *
     * @param existingScm the destination SCM entity
     * @param newScm the source SCM entity
     */
    private void copyChanges(SCM existingScm, SCM newScm) {
        existingScm.setAssignedTo(newScm.getAssignedTo());
        existingScm.setStatus(newScm.getStatus());
        existingScm.setSeverity(newScm.getSeverity());
        existingScm.setPriority(newScm.getPriority());
        existingScm.setPrLink(newScm.getPrLink());
        existingScm.setEstFixDate(newScm.getEstFixDate());
        existingScm.setBuildNo(newScm.getBuildNo());
        existingScm.setFixedBuildNo(newScm.getFixedBuildNo());
    }

    /**
     * Deletes an SCM entry by its ticket ID.
     *
     * @param ticketId the unique identifier of the SCM entry
     * @return true if deleted successfully, false otherwise
     */
    public boolean deleteSCM(Long ticketId) {
        if (SCMRepository.existsById(ticketId)) {
            SCMRepository.deleteById(ticketId);
            logger.info("Notification: SCM entry deleted with Ticket ID: {}", ticketId);
            sendEmail("Notification from SCM", "Notification: SCM entry deleted with Ticket ID: " + ticketId);
            return true;
        }
        return false;
    }
}
