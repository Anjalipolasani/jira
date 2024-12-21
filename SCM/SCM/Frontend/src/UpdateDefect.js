import React, { useState } from 'react';
import axios from 'axios'; 

/**
 * Component to update defect details.
 */
const UpdateDefect = () => {
  // State to manage the defect ID
  const [id, setId] = useState('');
    // State to manage the form fields
  const [form, setForm] = useState({
    assignedTo: '',
    status: '',
    severity: '',
    priority: '',
    prLink: '',
    estFixDate: '',
    buildNo: '',
    fixedBuildNo: '',
  });
  const [message, setMessage] = useState('');
  const [inputType, setInputType] = useState('text'); 

   /**
   * Handle changes to the input fields.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

   /**
   * Handle the update action. This will send a PUT request to the server.
   */
  const handleUpdate = async () => {
    if (!id.trim()) {
      setMessage('Please enter a Defect ID.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/SCM/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      // Log the entire response to see what's happening
      console.log('Server Response: ', response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Try to parse the response as JSON
      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error('Error parsing response as JSON:', err);
        throw new Error('Invalid JSON in response');
      }
  
      // Log the parsed response data
      console.log('Response Data:', data);
  
      setMessage(`Defect with ID ${id} updated successfully.`);
    } catch (error) {
      console.error('Failed to update defect:', error);
      setMessage('Error updating defect. Please try again.');
    }
  };
  

  return (
    <div>
      <h2>Update Defect</h2>
      {/* Input fields for defect details */}
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter Defect ID"
      />
      <input
        type="text"
        name="assignedTo"
        value={form.assignedTo}
        onChange={handleChange}
        placeholder="Assigned To"
      />
      <input
        type="text"
        name="status"
        value={form.status}
        onChange={handleChange}
        placeholder="Status"
      />
      <input
        type="text"
        name="severity"
        value={form.severity}
        onChange={handleChange}
        placeholder="Severity"
      />
      <input
        type="text"
        name="priority"
        value={form.priority}
        onChange={handleChange}
        placeholder="Priority"
      />
      <input
        type="text"
        name="prLink"
        value={form.prLink}
        onChange={handleChange}
        placeholder="PR Link"
      />
      <input
              type={inputType}
              onFocus={() => setInputType('date')}
              onBlur={(e) => {
                if (!e.target.value) {
                  setInputType('text');
                }
              }}
              placeholder={inputType === 'text' ? 'Estimated Fix Date' : undefined}
              name="estFixDate"
              value={form.estFixDate}
              onChange={handleChange}
              required
            />
      <input
        type="text"
        name="buildNo"
        value={form.buildNo}
        onChange={handleChange}
        placeholder="Build No"
      />
      <input
        type="text"
        name="fixedBuildNo"
        value={form.fixedBuildNo}
        onChange={handleChange}
        placeholder="Fixed Build No"
      />
      {/* Button to trigger the update action */}
      <button onClick={handleUpdate}>Update Defect</button>
      {/* Display the message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateDefect;
