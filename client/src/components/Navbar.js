import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import logo_icon from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left side - Logo / Home */}
      <div className="navbar-left">
        <img src={logo_icon} alt="" className="logo-icon"/>
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