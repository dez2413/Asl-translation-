import React from "react";
import "./style/Page.css";
import "./style/Home.css";
import { Link } from "react-router-dom";

// import home_image from "../assets/home_image.png";
import arrow_icon from "../assets/arrow.png";

function Home() {
  return (
    <div className="home-container">
      {/* Left Section */}
      <div className="home-left">
        <div className="hashtag">#ASL Translate</div>

        <h1 className="home-title">ASL Translate Goal's</h1>
        <p className="home-info">
         This project helps people learn ASL through video lessons, 
         quizzes, and camera-based gesture tracking, guiding them 
         from basic words to full sentences with the option of 
         one-on-one practice with an instructor.
        </p>

        <Link to="/sign">
          <button className="home-button">Get Started 
            <div className="arrow-circle">
              <img src={arrow_icon} alt="" className="arrow-icon"/>
            </div>
          </button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="home-right">
        <img src="" alt="" className="home-image" />
      </div>
    </div>
  );
}

export default Home;