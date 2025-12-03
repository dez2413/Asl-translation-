import React from "react";
import "./style/About.css";

import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";



function About() {
  return (    
    <div className="pages">

      {/* --- TITLE --- */}
      <h1 className="about-title">Meet The Team</h1>
      <p className="about-subtitle">
        We created ASL Translate to help people learn American Sign Language through interactive lessons, gestures, and real-time progress tracking.
      </p>

      {/* --- TEAM SECTION --- */}
      <div className="team-section">

        <div className="team-card">
          <img src={team1} alt="Team member 1" className="team-photo" />
          <h3 className="team-name">Teammate 1</h3>
          <p className="team-desc">
            ...
          </p>
        </div>

        <div className="team-card">
          <img src={team2} alt="Team member 2" className="team-photo" />
          <h3 className="team-name">Teammate 2</h3>
          <p className="team-desc">
            ...
          </p>
        </div>

        <div className="team-card">
          <img src={team3} alt="Team member 3" className="team-photo" />
          <h3 className="team-name">Teammate 3</h3>
          <p className="team-desc">
            ...
          </p>
        </div>

      </div>

      {/* --- PROGRESS INFORMATION SECTION --- */}
      <div className="progress-info">
        <h2 className="progress-title">How Progress Works</h2>
        <p className="progress-text">
          Every time you learn a word inside a lesson section, your progress meter increases.
          Progress is stored per user in the database, so even if you log out or use a different
          device, your progress stays saved.
        </p>

        <ul className="progress-list">
          <li> Each MiniSection updates your progress automatically</li>
          <li> Lessons show total completion percentage</li>
          <li> Progress is saved to your account in MongoDB</li>
        </ul>
      </div>

    </div>
  );
}

export default About;
