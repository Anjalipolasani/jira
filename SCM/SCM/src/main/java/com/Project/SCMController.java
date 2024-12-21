package com.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This controller provides RESTful API endpoints for managing SCM (Software Configuration Management) entities.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("SCM")
public class SCMController {

    @Autowired
    private SCMService scmService;  

    /**
     * Retrieves a list of all SCM entries.
     * 
     * @return A list of SCM entries or a message if no entries are found.
     */
    @GetMapping()
    public ResponseEntity<Object> getAllSCM() {
        List<SCM> scms = scmService.getSCMs();
        
        if (scms == null || scms.isEmpty()) {
            return new ResponseEntity<>("No SCM entries found.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(scms, HttpStatus.OK);
        }
    }
    
    /**
     * Retrieves an SCM entry by ticket ID.
     * 
     * @param ticketId The unique identifier of the SCM entry.
     * @return The SCM entry matching the ticket ID or a not found message.
     */
    @GetMapping("/{ticketId}")
    public ResponseEntity<Object> getSCM(@PathVariable("ticketId") Long ticketId) {
        SCM scm = scmService.getSCMs(ticketId);
        
        if (scm == null) {
            return new ResponseEntity<>("Ticket ID not found.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(scm, HttpStatus.OK);
        }
    }

    /**
     * Searches SCM entries by assigned person's name.
     * 
     * @param assignedTo The name of the person to whom SCM items are assigned.
     * @return A list of SCM entries assigned to the specified person or a message if no entries match.
     */
    @GetMapping("/search/{assignedTo}")
    public ResponseEntity<Object> searchByAssignedTo(@PathVariable("assignedTo") String assignedTo) {
        List<SCM> result = scmService.searchByAssignedTo(assignedTo);
        
        if (result == null || result.isEmpty()) {
            return new ResponseEntity<>("No tickets found for the given assigned person.", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }
    
    /**
     * Retrieves analytics related to SCM entries, specifically counts of tickets by their status.
     * 
     * @return A representation of SCM ticket counts based on their status.
     */
    @GetMapping("/analytics")
    public ResponseEntity<SCMTicketCounts> getAnalytics() {
        return ResponseEntity.ok(scmService.getSCMAnalytics());
    }

    /**
     * Creates new SCM entries.
     * 
     * @param scms The list of SCM entries to be created.
     * @return A success message or an error message if creation failed.
     */
    @PostMapping
    public ResponseEntity<Object> createSCM(@RequestBody List<SCM> scms) {
        List<SCM> savedScms = scmService.createSCM(scms);
        
        Map<String, Object> response = new HashMap<>();
        if (savedScms == null || savedScms.isEmpty()) {
            response.put("message", "Not saved successfully.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } else {
            response.put("message", "Saved successfully.");
            response.put("tickets", savedScms); // Assuming you want to return the created tickets
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
    /**
     * Updates an existing SCM entry by ticket ID.
     * 
     * @param ticketId The unique identifier of the SCM entry to be updated.
     * @param scm The SCM entity with updated details.
     * @return A success message or a not found message if the ticket ID doesn't exist.
     */
    @PutMapping(value = "/{ticketId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> updateSCM(@PathVariable("ticketId") Long ticketId, @RequestBody SCM scm) {
        SCM updatedScm = scmService.updateSCM(ticketId, scm);
        Map<String, String> response = new HashMap<>();

        if (updatedScm == null) {
            response.put("status", "error");
            response.put("message", "Ticket ID not found.");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            response.put("status", "success");
            response.put("message", "Ticket updated successfully.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    /**
     * Deletes an SCM entry by ticket ID.
     * 
     * @param ticketId The unique identifier of the SCM entry to be deleted.
     * @return A success message or a not found message if the ticket ID doesn't exist.
     */
    @DeleteMapping("/{ticketId}")
    public ResponseEntity<String> deleteSCM(@PathVariable Long ticketId) {
        boolean isDeleted = scmService.deleteSCM(ticketId);
        
        if (isDeleted) {
            return new ResponseEntity<>("Deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Ticket ID not found.", HttpStatus.BAD_REQUEST);
        }
    }
}
