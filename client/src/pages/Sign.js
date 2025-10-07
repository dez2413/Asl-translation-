import React, {useEffect, useState} from "react";
import "./style/Page.css";
import "./style/login.css";
import {useNavigate, Link } from "react-router-dom";
import axios from "axios";

import user_icon from "../assets/user.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

function Sign() {

  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[name,setName] = useState("")


  async function submit(e){
    e.preventDefaulf()

    try{

      await axios.post("http://localhost:5000/signUp", {
        name,email,paswword
      })
    }
    catch(e){

      console.log(e);

    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className ="text"> Sign Up</div>
        <div className="Underline"></div>
      </div>
      <div className = "inputs">
        <div className = "input">
            <img src={user_icon} alt=""/>
            <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Name" />
        </div>
        <div className = "input">
            <img src={email_icon} alt=""/>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
        </div>
        <div className = "input">
            <img src={password_icon} alt=""/>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
        </div>
      </div>
        <input type= "submit" on click = {submit} className="submit"/> <Link to="/sign">
        <button className="submit">Sign Up</button>
      </Link>
      <div className= "switch">Do have an account? <Link to="/login">Login</Link></div>
    </div>
  );
}

export default Sign;
