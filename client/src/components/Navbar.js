import React from "react";
import { Link } from "react-router-dom";   // ✅ Import Link
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">ASL Translator</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/lessons">Lessons</Link></li>
        <li><Link to="/practice">Practice</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/Sign">SignUp</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

