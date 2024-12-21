// Importing necessary modules for the application
import React from 'react'; // React is a JavaScript library for building user interfaces.
import ReactDOM from 'react-dom'; // ReactDOM provides DOM-specific methods that can be used at the top level of a web app to enable an efficient way of managing DOM elements.
import './App.css'; // Imports styling for the application from an external CSS file.
import App from './App'; // Imports the main App component from the local file 'App.js' or 'App.jsx'.

// This is the starting point of the React application.
ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root') // Here we specify where our app will 'attach' itself in the HTML file. The 'root' div is typically defined in the public/index.html file, and is the main div where your app is contained.
);
