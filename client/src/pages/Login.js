import React, {useEffect, useState} from "react";
import "./style/Page.css";
import "./style/login.css";
import {useNavigate, Link } from "react-router-dom";
import axios from "axios";


import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

function Login() {

  const history = useNavigate();

  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  async function submit(e){
    e.preventDefaulf()

    try{

      await axios.post("http://localhost:5000/login", {
        email,password
      })
      .then(res=>{
        if(res.data="exist"){
          history("/lesson", {state:{id:email}})
        }
        else if(res.data="notexist"){
          alert("User have not sign up")
        }
      })
      .catch(e=>{
        alert("wrong details")
        console.log(e);
      })
    }
    catch(e){

      console.log(e);

    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className ="text"> Login</div>
        <div className="Underline"></div>
      </div>
      <div className = "inputs">
        <div className = "input">
            <img src={email_icon} alt=""/>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
        </div>
        <div className = "input">
            <img src={password_icon} alt=""/>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
        </div>
      </div>
      <div className= "forgot-password">Lost Password? <span>Click Here!</span></div>

      <input type= "submit" on click = {submit} className="submit"/>
      <div className= "switch">Don't have an account? <Link to="/sign">Sign Up</Link></div>
    </div>
  );
}

export default Login;