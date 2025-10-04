import React from "react";
import "./style/Page.css";
import "./style/login.css";
import { Link } from "react-router-dom";

import user_icon from "../assets/user.png";
import email_icon from "../assets/email.png";
import passwaord_icon from "../assets/password.png";

function Sign() {
  return (
    <div className="container">
      <div className="header">
        <div className ="text"> Sign Up</div>
        <div className="Underline"></div>
      </div>
      <div className = "inputs">
        <div className = "input">
            <img src={user_icon} alt=""/>
            <input type="text" placeholder="Name" />
        </div>
        <div className = "input">
            <img src={email_icon} alt=""/>
            <input type="email" placeholder="Email" />
        </div>
        <div className = "input">
            <img src={passwaord_icon} alt=""/>
            <input type="password" placeholder="Password" />
        </div>
      </div>
      <Link to="/sign">
        <button className="submit">Sign Up</button>
      </Link>
      <div className= "switch">Do have an account? <Link to="/login">Login</Link></div>
    </div>
  );
}

export default Sign;