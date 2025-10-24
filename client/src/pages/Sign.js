import React, { useState } from "react"; // React and useState hook for managing form input states
import "./style/Page.css";              // General styling
import "./style/login.css";             // Page-specific styling for the login page
import { useNavigate, Link } from "react-router-dom"; // For navigation and internal routing
import axios from "axios";              // For making HTTP requests to the backend

// Importing assets for icons
import user_icon from "../assets/user.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

function Sign() {
   // Initialize navigation hook for redirecting after login
  const history = useNavigate();

  // State variables for form inputs
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[name,setName] = useState("")

  // Function to handle form submission
  async function submit(e){
    e.preventDefault(); // Prevent page reload on form submission

    try{
      // Send POST request to backend sign-up endpoint
      const res = await axios.post("http://localhost:5000/signUp", {
        name,email,password
      })

      console.log("Response from backend:", res.data);  // Log backend response for debugging

      // Check backend response
      if (res.data === "exist") {
        alert("User already exists");
      } 
      else if (res.data === "notexist") {
        alert("Signed up successfully!");

        // Redirect user to lessons page and pass user email in state
        history("/lessons", { state: { id: email } });
      }
    } 
    // Catch and log any errors that occur during sign-up
    catch (e) {
      alert("Something went wrong. Check the console for details.");
      console.error(e);
    }
  }

  // JSX to render the sign-up page
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className ="text"> Sign Up</div>
        <div className="Underline"></div>
      </div>

      {/* Sign-Up Form */}
      <form onSubmit={submit}>
        <div className="inputs">
          {/* Name Input */}
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>

          {/* Email Input */}
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          {/* Password Input */}
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit">
          Submit
        </button>
      </form>

      {/* Switch to Login */}
      <div className= "switch"> Do have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Sign;
