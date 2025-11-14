import React, { useContext } from "react";             // Importing React library
import "./style/Page.css";             // General page styling
import "./style/Home.css";             // Home page specific styling
import { Link } from "react-router-dom"; // For internal navigation links
import { AuthContext } from "../context/AuthContext"; // For auth user 

import arrow_icon from "../assets/arrow.png";

function Home() {
  const { user } = useContext(AuthContext); // ⬅️ get logged in user

  return (
    <div className="home-container">

      <div className="home-left">
        <div className="hashtag">#ASL Translate</div>

        <h1 className="home-title">ASL Translate Goal's</h1>
        <p className="home-info">
           This project helps people learn ASL through video lessons, 
           quizzes, and camera-based gesture tracking, guiding them 
           from basic words to full sentences with the option of 
           one-on-one practice with an instructor.
        </p>

        {/* 👇 CONDITIONAL BUTTON BASED ON LOGIN */}
        {user ? (
          <Link to="/lessons">
            <button className="home-button">
              Go to Lessons
              <div className="arrow-circle">
                <img src={arrow_icon} className="arrow-icon" />
              </div>
            </button>
          </Link>
        ) : (
          <Link to="/sign">
            <button className="home-button">
              Get Started
              <div className="arrow-circle">
                <img src={arrow_icon} className="arrow-icon" />
              </div>
            </button>
          </Link>
        )}
      </div>

      <div className="home-right"></div>
        {/* Placeholder for future image or content */}
        {/* <img src={home_image} alt="Home" className="home-image" /> */}
    </div>
  );
}

export default Home;
