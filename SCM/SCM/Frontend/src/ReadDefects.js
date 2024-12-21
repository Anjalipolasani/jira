import React, { useState } from 'react';
import axios from 'axios'; 
// The ReadDefects component is responsible for fetching and displaying defects from the server.
const ReadDefects = () => {
  // State variable for storing the list of defects.
  const [defects, setDefects] = useState([]);
   // State variables for storing the values from the search input fields.
  const [searchId, setSearchId] = useState('');
  const [searchAssignedTo, setSearchAssignedTo] = useState('');

    // Add a new state variable for tracking loading status
    const [isLoading, setIsLoading] = useState(false);

  // Function to fetch all defects from the server
  const fetchAllDefects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/SCM');
      setDefects(response.data);
    } catch (error) {
      console.error('Error fetching all defects:', error);
    }
  };

  // Function to fetch a defect by ID from the server
  const fetchDefectById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/SCM/${id}`);
      setDefects([response.data]);
    } catch (error) {
      console.error(`Error fetching defect by ID: ${id}`, error);
    }
  };

  // Function to fetch defects by the assigned person from the server
  const fetchDefectsByAssignedTo = async (assignedTo) => {
    try {
      // Correcting the URL to match the backend's expected structure for this endpoint
      const response = await axios.get(`http://localhost:8080/SCM/search/${assignedTo}`);
      setDefects(response.data);
    } catch (error) {
      console.error('Error fetching defects by assigned person:', error);
    }
  };
 // Handler for the "Search by ID" form submission.
  const handleSearchById = (e) => {
    e.preventDefault();
    if (!isLoading && searchId) { // Check if not loading and ID is provided
      fetchDefectById(searchId);
    } else if (isLoading) {
      console.warn("Please wait, request is still processing");
    } else {
      console.warn("ID is required for searching by ID");
    }
  };
// Handler for the "Search by Assigned To" form submission.
    const handleSearchByAssignedTo = (e) => {
      e.preventDefault();
      if (!isLoading && searchAssignedTo) { // Check if not loading and ID is provided
        fetchDefectsByAssignedTo(searchAssignedTo);
      } else if (isLoading) {
        console.warn("Please wait, request is still processing");
      } else {
        console.warn("Assigned person is required for searching by assigned person");
      }
    };
 // Handler for the "Get All Defects" button click.
  const handleGetAllDefects = () => {
    fetchAllDefects();
  };
  // Render the UI elements.
  return (
    <div>
      <h2>Read Defects</h2>
     {/* Button to trigger fetching all defects. */}
      <button onClick={handleGetAllDefects}>Get All Defects</button>
{/* Form for searching defects by ID. */}
      <form onSubmit={handleSearchById}>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)} // Update searchId state when input changes.
        />
        <button type="submit">Search</button>
      </form>
{/* Form for searching defects by the person they are assigned to. */}
      <form onSubmit={handleSearchByAssignedTo}>
        <input
          type="text"
          placeholder="Search by Assigned To"
          value={searchAssignedTo}
          onChange={(e) => setSearchAssignedTo(e.target.value)} // Update searchAssignedTo state when input changes.
        />
        <button type="submit">Search</button>
      </form>
{/* Display all fetched defects. */}   
      <ul>
        {defects.map((defect, index) => (
          <li key={index}>
            <p>ID: {defect.ticketId}</p>
            <p>Assigned To: {defect.assignedTo}</p>
            <p>Status: {defect.status}</p>
            <p>Severity: {defect.severity}</p>
            <p>Priority: {defect.priority}</p>
            <p>PR Link: {defect.prLink}</p>
            <p>Estimated Fix Date: {defect.estFixDate}</p>
            <p>Build No: {defect.buildNo}</p>
            <p>Fixed Build No: {defect.fixedBuildNo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadDefects;
