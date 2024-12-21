import React from 'react';
import { Link } from 'react-router-dom';
import './CircleNav.css'; 

// The CircleNav functional component renders a navigation bar with circular buttons.
const CircleNav = () => {
  return (
    <div className="circle-nav-container">
      {/* Each Link component is used for navigation between routes. 
          It's styled as a circular button with different background colors. 
          When clicked, it navigates to a specific route path. */}
      <Link to="/log-defect" className="circle-nav-item" style={{backgroundColor: 'red'}}>Log</Link>
      <Link to="/read-defects" className="circle-nav-item" style={{backgroundColor: 'blue'}}>Read</Link>
      <Link to="/update-defect" className="circle-nav-item" style={{backgroundColor: 'green'}}>Update</Link>
      <Link to="/delete-defect" className="circle-nav-item" style={{backgroundColor: 'purple'}}>Delete</Link>
      <Link to="/analytics" className="circle-nav-item" style={{backgroundColor: 'orange'}}>Analytics</Link>
    </div>
  );
};

export default CircleNav;
