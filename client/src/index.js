import React from 'react';            // Importing React library
import ReactDOM from 'react-dom/client';  // Importing ReactDOM for rendering
import './index.css';              // Global styling
import App from './App';             // Main App component
import reportWebVitals from './reportWebVitals';  // For measuring performance
import {BrowserRouter } from 'react-router-dom';  // For routing

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
