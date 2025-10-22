import React, { useState} from "react";
import "./style/Page.css";
import "./style/login.css";
import "./style/Account.css";
// import {useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Account() {

  // const history = useNavigate();

  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[name,setName] = useState("")
  const[newEmail,setNewEmail] = useState("")
  const[newPassword,setNewPassword] = useState("")
  const[newName,setNewName] = useState("")

  async function submit(e){
    e.preventDefault()

    try{

      const res = await axios.post("http://localhost:5000/account", {
        name,email,password,newName,newEmail,newPassword
      })

      console.log("Response from backend:", res.data); //findAndModify() should be able to verify and update the account.

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
          <div className="account-text"> User Name</div>
          <div className="input">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="input">
             <input
             type="text"
             onChange={(e) => setNewName(e.target.value)}
             placeholder="New Name"
             />
          </div>
          <div className ="account-text"> Email</div>
          <div className="input">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input">
             <input
             type="text"
             onChange={(e) => setNewEmail(e.target.value)}
             placeholder="New Email"
             />
          </div>
          <div className="account-text"> Password</div>
          <div className="input">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="input">
            <input
              type="text"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
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

export default Account;



