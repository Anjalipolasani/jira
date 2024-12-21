import React, { useState } from 'react';
import axios from 'axios'; 
import './App.css';

// The LogDefect function is a React component used for logging software defects.
function LogDefect() {
  // State hooks for managing form input, submitted defects, and other UI states.
  const [defects, setDefects] = useState([]); // A list of logged defects.
  const [inputType, setInputType] = useState('text'); // For toggling the date input type.
  const [message, setMessage] = useState(''); // Message to display to the user.
  const [form, setForm] = useState({ // Form input states.
    assignedTo: '',
    status: '',
    severity: '',
    priority: '',
    prLink: '',
    estFixDate: '',
    buildNo: '',
    fixedBuildNo: '',
  });


  // Function to handle changes in form input fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding form state.
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  
  // Asynchronous function to handle form submission.
  const handleSubmit = async () => {
    // Validation: Ensure all form fields are filled.
    for (let key in form) {
        if (form[key] === '') {
            alert('Please fill in all fields.');
            return;
        }
    }

    // Placeholder for the response data.
    let responseData;
  
  
    // Try to send data with Fetch API
    try {
        const response = await fetch("http://localhost:8080/SCM", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([form])  // sending array containing the form data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.headers.get("content-type").includes("application/json")) {
          responseData = await response.json();
          console.log(responseData);
        } else {
          const text = await response.text();
          console.log(text);
          throw new Error("Received non-JSON response from the server.");
        }

        setDefects((prevDefects) => [...prevDefects, responseData]);

        // Clear the form
        setForm({
            assignedTo: '',
            status: '',
            severity: '',
            priority: '',
            prLink: '',
            estFixDate: '',
            buildNo: '',
            fixedBuildNo: '',
        });

        // Set message indicating successful submission
        setMessage("Saved successfully.");

        // Hide confirmation message after 3 seconds
        setTimeout(() => {
            setMessage(''); // Clearing the message
        }, 3000);

    } catch (error) {// Log and display any errors that occur during submission.
      console.error("There was an error sending data", error);
      setMessage(`An error occurred while saving. Please try again. ${error}`); 
    }    
  };

  return (
    <div className="LogDefect">
      <h1>Defect Logger</h1>
      <form id="defectForm" onSubmit={(e) => e.preventDefault()}> {/* Prevent form submit default behaviour */}
        <div className="row"> {/* Input fields for the various properties of a defect. */}
          <div className="cell">
            <input
              type="text"
              name="assignedTo"
              placeholder="Assigned To"
              value={form.assignedTo}
              onChange={handleChange}
            />
          </div>
          <div className="cell">
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={form.status}
              onChange={handleChange}
            />
          </div>
          <div className="cell">
            <input
              type="text"
              name="severity"
              placeholder="Severity"
              value={form.severity}
              onChange={handleChange}
            />
          </div>
          <div className="cell">
            <input
              type="text"
              name="priority"
              placeholder="Priority"
              value={form.priority}
              onChange={handleChange}
            />
          </div>
          <div className="cell">
            <input
              type="text"
              name="prLink"
              placeholder="PR Link"
              value={form.prLink}
              onChange={handleChange}
            />
          </div>
          <div className="cell">
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
          </div>
          <div className="cell">
            <input
              type="text"
              name="buildNo"
              placeholder="Build No"
              value={form.buildNo}
              onChange={handleChange}
            />
          </div>
          <div className="cell">
            <input
              type="text"
              name="fixedBuildNo"
              placeholder="Fixed Build No"
              value={form.fixedBuildNo}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>{/* Button to trigger the form submission function. */}
        <button type="button" onClick={handleSubmit}>
          Log Defect
        </button>
      </div>
      {message && <p className="confirmation-msg">{message}</p>}

    </div>
  );
}

export default LogDefect;// Export the component for use in other parts of the application.
