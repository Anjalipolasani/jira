import React from 'react';
// React Router components for routing in a web application.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
// Custom components for different views or functionalities.
import CircleNav from './CircleNav';
import LogDefect from './LogDefect';
import DefectAnalytics from './DefectAnalytics';
import ReadDefects from './ReadDefects';
import UpdateDefect from './UpdateDefect';
import DeleteDefect from './DeleteDefect';
// Stylesheet for the application.
import './App.css'; 

function App() {
  return (
    <Router> {/* The Router component that wraps the navigation part of the application. */}
      <div className="App"> {/* A div with a class of 'App', typically used as the main container. */}
        <div className="main-content"> {/* A container for the main content of the application. */}
          <h2 align='center'>Source Control Management</h2> {/* The application's main title. */}
        <CircleNav /> {/* A component, likely representing a circular navigation menu. */}
        <Routes> {/* Declares where different routes will render in the application. */}
          {/* The following are Route components, each specifying a path for the URL and the component to render when the URL matches the path. */}
          <Route path="/log-defect" element={<LogDefect />} /> {/* Route for logging defects. */}
          <Route path="/read-defects" element={<ReadDefects />} /> {/* Route for reading or listing defects. */}
          <Route path="/update-defect" element={<UpdateDefect />} /> {/* Route for updating defects. */}
          <Route path="/delete-defect" element={<DeleteDefect />} /> {/* Route for deleting defects. */}
          <Route path="/analytics" element={<DefectAnalytics />} /> {/* Route for viewing defect analytics. */}
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App; {/* Exports the App component to potentially be used as the root component in index.js. */}
