import React from "react";             // Importing React library
import "./style/Page.css";             // General page styling
import "./style/Home.css";             // Home page specific styling
import { Link } from "react-router-dom"; // For internal navigation links

// import home_image from "../assets/home_image.png";
import arrow_icon from "../assets/arrow.png";

function Home() {
  return (
    <div className="home-container">
      {/* Left Section */}
      <div className="home-left">
        {/* Hashtag Section */}
        <div className="hashtag">#ASL Translate</div>

        {/* Title and Description */}
        <h1 className="home-title">ASL Translate Goal's</h1>
        <p className="home-info">
         This project helps people learn ASL through video lessons, 
         quizzes, and camera-based gesture tracking, guiding them 
         from basic words to full sentences with the option of 
         one-on-one practice with an instructor.
        </p>

        {/* Get Started Button */}
        <Link to="/sign">
          <button className="home-button">Get Started 
            <div className="arrow-circle">
              <img src={arrow_icon} alt="" className="arrow-icon" />
            </div>
          </button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="home-right">
        {/* Placeholder for future image or content */}
        {/* <img src={home_image} alt="Home" className="home-image" /> */}
      </div>
    </div>
  );
}

export default Home;