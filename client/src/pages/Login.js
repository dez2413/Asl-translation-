import React, { useState} from "react";
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
    e.preventDefault()

    try{

      const res = await axios.post("http://localhost:5000/signUp", {
        email,password
      })

       console.log("Response from backend:", res.data);

      if (res.data === "exist") {
          alert("User logged in successfully!");
          history("/lessons", {state:{id:email}})
       } else if (res.data === "notexist") {
          alert("User have not sign up")
      }
    } catch (e) {
      alert("Something went wrong. Check the console for details.");
      console.error(e);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className ="text"> Login</div>
        <div className="Underline"></div>
      </div>
       <form onSubmit={submit}>
        <div className = "inputs">
          <div className = "input">
              <img src={email_icon} alt=""/>
              <input 
                type="email" 
                onChange={(e)=>{setEmail(e.target.value)}} 
                placeholder="Email" />
          </div>
          <div className = "input">
              <img src={password_icon} alt=""/>
              <input 
                type="password" 
                onChange={(e)=>{setPassword(e.target.value)}} 
                placeholder="Password" />
          </div>
        </div>
        <div className= "forgot-password">Lost Password? <span>Click Here!</span></div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      <div className= "switch">Don't have an account? <Link to="/sign">Sign Up</Link></div>
    </div>
  );
}

export default Login;