import React from "react";
import "./Navbar.css";  // Import the CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">ASL Translator</h1>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/lessons">Lessons</a></li>
        <li><a href="/practice">Practice</a></li>
        <li><a href="/quiz">Quiz</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
