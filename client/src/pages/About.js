import React from "react";
import "./style/About.css";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";

function About() {
  // Progress data for the TEAM (from your wiki)
  const progressData = {
    labels: ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"],
    datasets: [
      {
        label: "Sprint Completion",
        data: [100, 100, 100, 90],   // You can change this anytime
        backgroundColor: [
          "rgba(91, 4, 177, 0.7)",
          "rgba(140, 50, 220, 0.7)",
          "rgba(190, 90, 255, 0.7)",
          "rgba(230, 150, 255, 0.7)",
        ],
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="about-page">

      {/* --- TITLE --- */}
      <h1 className="about-title">Meet The Team</h1>
      <p className="about-subtitle">
        Our team created ASL Translate to make learning American Sign Language interactive,
        accessible, and fun using real hand recognition and personalized lessons.
      </p>

      {/* --- TEAM CARDS --- */}
      <div className="team-section">

        <div className="team-card fade-in">
          <img src={team1} alt="Team member 1" className="team-photo" />
          <h3 className="team-name">Desiree</h3>
          <p className="team-desc">
            Frontend developer and designer. Built interactive UI, dictionary, lessons, and
            major components of the camera and gesture interface.
          </p>
        </div>

        <div className="team-card fade-in delay-1">
          <img src={team2} alt="Team member 2" className="team-photo" />
          <h3 className="team-name">Tiare</h3>
          <p className="team-desc">
            Machine learning and gesture model specialist. Developed hand-tracking models, 
            Mediapipe gesture integrations, and ASL detection logic.
          </p>
        </div>

        <div className="team-card fade-in delay-2">
          <img src={team3} alt="Team member 3" className="team-photo" />
          <h3 className="team-name">Thaddeus</h3>
          <p className="team-desc">
            Backend engineer & database developer. Built MongoDB structures, authentication, 
            progress system, and contributed to frontend lessons.
          </p>
        </div>

      </div>

      {/* --- TEAM PROGRESS SECTION --- */}
      <div className="progress-area">
        <h2 className="progress-title">Team Development Progress</h2>
        <p className="progress-text">
          Our project was developed across four major sprints. Below is a visual timeline 
          showing how much of each sprint was completed.
        </p>

        <div className="progress-chart-container">
          <Bar data={progressData} />
        </div>

        <ul className="progress-list">
          <li><strong>Sprint 1:</strong> Database, camera setup, and initial frontend.</li>
          <li><strong>Sprint 2:</strong> Lessons, hand detection, and login system.</li>
          <li><strong>Sprint 3:</strong> Gesture models, dictionary system, UI polish.</li>
          <li><strong>Sprint 4:</strong> Testing, review, professional practice feature.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
