import React, { useState } from "react"; // React and useState hook for managing form input states
import "./style/Page.css";              // General styling
import "./style/login.css";             // Page-specific styling for the login page
import { useNavigate, Link } from "react-router-dom"; // For navigation and internal routing
import axios from "axios";              // For making HTTP requests to the backend

// Importing assets for icons
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

function Login() {
  // Initialize navigation hook for redirecting after login
  const history = useNavigate();

  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  async function submit(e) {
    e.preventDefault(); // Prevents the page from reloading on form submission

    try {
      // Send POST request to backend login endpoint
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log("Response from backend:", res.data); // Log backend response for debugging

      // Check backend response
      if (res.data === "exist") {
        alert("User logged in successfully!");

        // Redirect user to lessons page and pass user email in state
        history("/lessons", { state: { id: email } });
      } 
      
      else if (res.data === "notexist") {
        alert("User has not signed up yet");
      }
    } 
    // Catch and log any errors that occur during login
    catch (e) {
      alert("Something went wrong. Check the console for details.");
      console.error(e);
    }
  }

  // JSX to render the login page
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="text">Login</div>
        <div className="Underline"></div>
      </div>

      {/* Login Form */}
      <form onSubmit={submit}>
        <div className="inputs">
          {/* Email Input */}
          <div className="input">
            <img src={email_icon} alt="email icon" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input">
            <img src={password_icon} alt="password icon" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
        </div>

        {/* Forgot Password Link (not yet functional) */}
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit">
          Submit
        </button>
      </form>

      {/* Navigation link to Sign Up page */}
      <div className="switch">
        Don't have an account? <Link to="/sign">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
