import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import logo_icon from "../assets/logo.png";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left side */}
      <div className="navbar-left">
        <img src={logo_icon} alt="logo" className="logo-icon" />
        <Link to="/" className="logo">ASL Translate</Link>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <Link to="/lessons">Lessons</Link>
        <Link to="/practice">Practice</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Right side changes depending on login */}
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/account" className="btn-link">Account</Link>
            <button onClick={handleLogout} className="btn-link logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-link">Login</Link>
            <Link to="/sign" className="btn-link signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
