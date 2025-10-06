import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left side - Logo / Home */}
      <div className="navbar-left">
        <Link to="/" className="logo">ASL Translate</Link>
      </div>

      {/* Center links */}
      <div className="navbar-center">
        <Link to="/lessons">Lessons</Link>
        <Link to="/practice">Practice</Link>
        <Link to="/quiz">Quiz</Link>
      </div>

      {/* Right side - Login / Sign up */}
      <div className="navbar-right">
        <Link to="/login" className="btn-link">Login</Link>
        <Link to="/sign" className="btn-link signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;