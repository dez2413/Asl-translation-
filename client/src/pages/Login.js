import React from "react";
import "./Page.css";
import "./login.css";
import { Link } from "react-router-dom";

// import user_icon from "../assets/user.png";
import email_icon from "../assets/email.png";
import passwaord_icon from "../assets/password.png";

function Login() {
  return (
    <div className="container">
      <div className="header">
        <div className ="text"> Login</div>
        <div className="Underline"></div>
      </div>
      <div className = "inputs">
        <div className = "input">
            <img src={email_icon} alt=""/>
            <input type="email" placeholder="Email" />
        </div>
        <div className = "input">
            <img src={passwaord_icon} alt=""/>
            <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className= "forgot-password">Lost Password? <span>Click Here!</span></div>
      <div className ="submit-container">
        <Link to="/login" className="submit">Login</Link>
      </div>
      <div className= "switch">Don't have an account? <Link to="/sign">Sign Up</Link></div>
    </div>
  );
}

export default Login;