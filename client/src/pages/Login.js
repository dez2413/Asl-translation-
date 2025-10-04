import React from "react";
import "./style/Page.css";
import "./style/login.css";
import { Link } from "react-router-dom";


import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

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
            <img src={password_icon} alt=""/>
            <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className= "forgot-password">Lost Password? <span>Click Here!</span></div>
      <Link to="/login">
        <button className="submit">Login</button>
      </Link>
      <div className= "switch">Don't have an account? <Link to="/sign">Sign Up</Link></div>
    </div>
  );
}

export default Login;