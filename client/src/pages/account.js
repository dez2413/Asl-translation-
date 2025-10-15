import React, { useState} from "react";
import "./style/Page.css";
import "./style/login.css";
import {useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Account() {

  const history = useNavigate();

  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[name,setName] = useState("")

  async function submit(e){
    e.preventDefault()

    try{

      const res = await axios.post("http://localhost:5000/account", {
        name,email,password
      })

      console.log("Response from backend:", res.data);

      if (res.data === "exist") {
        alert("User name/Email already exists");
      } else if (res.data === "notexist") {
      }
    } catch (e) {
      alert("Something went wrong. Check the console for details.");
      console.error(e);
    }
  }


  return (
    <div className="container">
      <div className="header">
        <div className ="text"> Account</div>
        <div className="Underline"></div>
      </div>
      <form onSubmit={submit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Sign;
