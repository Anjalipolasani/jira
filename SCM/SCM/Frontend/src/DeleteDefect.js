import React, { useState } from 'react';
import axios from 'axios'; // Importing axios for HTTP requests

// DeleteDefect component allows users to delete a defect by its ID
const DeleteDefect = () => {
  const [id, setId] = useState(''); // State to store the defect ID
  const [message, setMessage] = useState(''); // State to store the status message

  // handleDelete function will be called when user clicks the delete button
  const handleDelete = async () => {
    // If no ID is entered, display a message and return early
    if (!id.trim()) { // Checking if the ID is not empty
      setMessage('Please enter a Defect ID.');
      return;
    }

    try {
      // Send a DELETE request to the specified URL
      const response = await axios.delete(`http://localhost:8080/SCM/${id}`);

      // If the request is successful, display a success message
      if (response.status === 200) {
        console.log(`Delete request sent for ID: ${id}`);
        setMessage(`Defect with ID ${id} deleted successfully.`);
      } else {
        // If the request is unsuccessful, display an error message
        setMessage('Error deleting defect. Please try again.');
      }
    } catch (error) {
      console.error('Failed to delete defect:', error);

      // Display specific error messages based on the error type
      if (error.response && error.response.status === 404) {
        setMessage('Ticket ID not found.');
      } else {
        setMessage('Error deleting defect. Please try again.');
      }
    }
  };

  // Rendering the input field, delete button, and message
  return (
    <div>
      <h2>Delete Defect</h2>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)} // Updating ID in the state when input changes
        placeholder="Enter Defect ID"
      />
      <button onClick={handleDelete}>Delete Defect</button> 
      {message && <p>{message}</p>} 
    </div>
  );
};

export default DeleteDefect; // Exporting the component for use in other parts of your application
