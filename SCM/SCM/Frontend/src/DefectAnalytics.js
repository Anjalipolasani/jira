import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios, a promise-based HTTP client for making requests to our backend.

// DefectAnalytics component is responsible for displaying analytics about the defects.
const DefectAnalytics = () => {
  // State variables for storing the defects and the count of 'Closed' and 'In Progress' defects.
  const [defects, setDefects] = useState([]);
  const [closedCount, setClosedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);

  // Asynchronous function to fetch defects from the server.
  const fetchDefects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/SCM'); // Making GET request to fetch all defects.
      setDefects(response.data); // Storing the fetched defects in state.
    } catch (error) {
      console.error('Failed to fetch defects:', error); // Logging an error message if the request fails.
    }
  };

  // useEffect hook to fetch defects when the component mounts.
  useEffect(() => {
    fetchDefects(); // Fetching defects from the server.
  }, []); // Empty dependency array means this useEffect runs once when component is mounted.

  // useEffect hook to calculate and set the counts of 'Closed' and 'In Progress' defects whenever the 'defects' state changes.
  useEffect(() => {
    const closed = defects.filter(defect => defect.status === 'Closed').length; // Calculating 'Closed' defects.
    const inProgress = defects.filter(defect => defect.status === 'In Progress').length; // Calculating 'In Progress' defects.
    const open = defects.filter(defect => defect.status === 'Open').length; // Calculating 'Open' defects.

    setClosedCount(closed); // Setting the count of 'Closed' defects.
    setInProgressCount(inProgress); // Setting the count of 'In Progress' defects.
    setOpenCount(open); // Setting the count of 'Open' defects.
  }, [defects]); // This useEffect runs whenever the 'defects' state changes.

  // Rendering the analytics.
  return (
    <div>
      <h2>Defect Analytics</h2> 
      <p>Total "Closed" Defects: {closedCount}</p> 
      <p>Total "In Progress" Defects: {inProgressCount}</p> 
      <p>Total "Open" Defects: {openCount}</p> 
    </div>
  );
};

export default DefectAnalytics; // Exporting the component for use in other parts of your application.
